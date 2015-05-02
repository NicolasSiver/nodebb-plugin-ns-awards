(function (Database) {
    'use strict';

    var async     = require('async'),

        nodebb    = require('./nodebb'),
        db        = nodebb.db,
        constants = require('./constants'),
        namespace = constants.NAMESPACE;

    Database.createAward = function (name, description, image, done) {
        async.waterfall([
            function (next) {
                db.incrObjectField('global', 'nextNsAwardId', next);
            }, function (id, next) {
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
            async.apply(db.incrObjectField, 'global', 'nextNsAwardGrantId'),
            function (gid, next) {

                var grant = {
                    uid       : uid,
                    fromuid   : initiatorUid,
                    aid       : aid,
                    gid       : gid,
                    createtime: Date.now(),
                    reason    : reason
                };

                async.parallel([
                    async.apply(db.sortedSetAdd, namespace + ':award:' + aid, uid, gid),
                    async.apply(db.sortedSetAdd, namespace + ':user:' + uid, aid, gid),
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


})(module.exports);