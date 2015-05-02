(function (Database) {
    'use strict';

    var async       = require('async'),

        nodebb      = require('./nodebb'),
        db          = nodebb.db,
        constants   = require('./constants'),
        namespace   = constants.NAMESPACE,
        nextAwardId = constants.GLOBAL_AWARD_COUNTER,
        nextGrantId = constants.GLOBAL_GRANT_COUNTER;

    Database.createAward = function (name, description, image, done) {
        async.waterfall([
            async.apply(db.incrObjectField, 'global', nextAwardId),
            function (id, next) {
                //Where score as id will work as index position value for sorting
                db.sortedSetAdd(namespace, id, id, function (error) {
                    if (error) {
                        return next(error);
                    }
                    next(null, id);
                });
            }, function (id, next) {
                var awardModel = {
                    aid  : id,
                    name : name,
                    desc : description,
                    image: image
                };
                db.setObject(namespace + ':' + id, awardModel, function (error) {
                    if (error) {
                        return next(error);
                    }

                    next(null, awardModel);
                });
            }
        ], done);
    };

    Database.createGrant = function (uid, aid, reason, initiatorUid, done) {
        async.waterfall([
            async.apply(db.incrObjectField, 'global', nextGrantId),
            function (gid, next) {

                var createTime = Date.now();
                var grant = {
                    uid       : uid,
                    fromuid   : initiatorUid,
                    aid       : aid,
                    gid       : gid,
                    createtime: createTime,
                    reason    : reason
                };

                async.parallel([
                    async.apply(db.sortedSetAdd, namespace + ':award:' + aid, createTime, gid),
                    async.apply(db.sortedSetAdd, namespace + ':user:' + uid, createTime, gid),
                    async.apply(db.setObject, namespace + ':grant:' + gid, grant)
                ], function (error) {
                    if (error) {
                        return next(error);
                    }
                    next(null, grant);
                });
            }
        ], done);
    };

    Database.deleteAward = function (id, done) {
        async.parallel([
            async.apply(db.delete, namespace + ':' + id),
            async.apply(db.sortedSetRemove, namespace, id)
        ], done);
    };

    Database.deleteGrant = function (gid, done) {
        var grantKey = namespace + ':grant:' + gid;

        db.getObject(grantKey, function (error, grant) {
            if (error) {
                return done(error);
            } else if (!grant) {
                return done(new Error('Grant Object can not be found'));
            }

            async.parallel([
                async.apply(db.delete, grantKey),
                async.apply(db.sortedSetRemove, namespace + ':award:' + grant.aid, gid),
                async.apply(db.sortedSetRemove, namespace + ':user:' + grant.uid, gid)
            ], done);
        });
    };

    Database.getAllAwards = function (done) {
        async.waterfall([
            async.apply(db.getSortedSetRange, namespace, 0, -1),
            function (ids, next) {
                if (!ids.length) {
                    return next(null, ids);
                }
                db.getObjects(ids.map(function (id) {
                    return namespace + ':' + id;
                }), next);
            }
        ], done);
    };

    Database.getAward = function (id, done) {
        db.getObject(namespace + ':' + id, done);
    };

    Database.getGrantIdsByAward = function (aid, done) {
        db.getSortedSetRevRange(namespace + ':award:' + aid, 0, -1, done);
    };

    Database.getGrantIdsByUser = function (uid, done) {
        db.getSortedSetRevRange(namespace + ':user:' + uid, 0, -1, done);
    };

    Database.getGrantsByIds = function (ids, done) {
        db.getObjects(ids.map(function (gid, index) {
            return namespace + ':grant:' + gid;
        }), done);
    };

})(module.exports);