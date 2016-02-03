(function (Database) {
    'use strict';

    var async        = require('async'),
        objectAssign = require('object-assign'),

        nodebb       = require('./nodebb'),
        db           = nodebb.db,
        constants    = require('./constants'),
        namespace    = constants.NAMESPACE,
        nextAwardId  = constants.GLOBAL_AWARD_COUNTER,
        nextGrantId  = constants.GLOBAL_GRANT_COUNTER;

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

    Database.editAward = function (id, update, done) {
        async.waterfall([
            async.apply(Database.getAward, id),
            function (award, next) {
                if (!award) {
                    next(new Error('Award can not be found'));
                }

                db.setObject(namespace + ':' + id, update, function (error) {
                    if (error) {
                        return next(error);
                    }

                    next(null, objectAssign(award, update));
                });
            }
        ], done);
    };

    Database.editGrant = function(gid, update, done) {
        async.waterfall([
            async.apply(Database.getGrant, gid),
            function (grant, next) {
                if (!grant) {
                    next(new Error('Reward can not be found'));
                }

                db.setObject(namespace + ':grant:' + gid, update, function (error) {
                    if (error) {
                        return next(error);
                    }

                    next(null, objectAssign(grant, update));
                });
            }
        ], done);
    };

    Database.deleteGrant = function (gid, done) {
        db.getObject(namespace + ':grant:' + gid, function (error, grant) {
            if (error) {
                return done(error);
            } else if (!grant) {
                return done(new Error('Grant Object can not be found'));
            }

            async.parallel([
                async.apply(db.delete, namespace + ':grant:' + grant.gid),
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

    Database.getAward = function (aid, done) {
        db.getObject(namespace + ':' + aid, done);
    };

    Database.getGrant = function(gid, done) {
        db.getObject(namespace + ':grant:' + gid, done);
    };

    Database.getGrantIdsByAward = function (aid, done) {
        db.getSortedSetRevRange(namespace + ':award:' + aid, 0, -1, done);
    };

    Database.getGrantIdsByUser = function (uid, limit, done) {
        db.getSortedSetRevRange(namespace + ':user:' + uid, 0, limit, done);
    };

    Database.getGrantsByIds = function (ids, done) {
        db.getObjects(ids.map(function (gid, index) {
            return namespace + ':grant:' + gid;
        }), done);
    };

})(module.exports);