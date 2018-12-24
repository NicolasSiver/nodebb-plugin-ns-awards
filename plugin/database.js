(function (Database) {
    'use strict';

    var async  = require('async'),
        uuidV4 = require('uuid/v4');

    var constants = require('./constants'),
        nodebb    = require('./nodebb');

    var db             = nodebb.db,
        namespace      = constants.NAMESPACE,
        nextApiTokenId = constants.GLOBAL_API_TOKEN_COUNTER,
        nextAwardId    = constants.GLOBAL_AWARD_COUNTER,
        nextGrantId    = constants.GLOBAL_GRANT_COUNTER;

    Database.createApiToken = function (name, done) {
        async.waterfall([
            async.apply(db.incrObjectField, 'global', nextApiTokenId),
            function (id, callback) {
                var createTime = Date.now();
                var tokenData = {
                    createtime: createTime,
                    id        : id,
                    name      : name,
                    token     : uuidV4()
                };
                async.parallel({
                    token      : async.apply(db.setObject, namespace + ':apiToken:' + id, tokenData),
                    sortedId   : async.apply(db.sortedSetAdd, namespace + ':apiTokens', createTime, id),
                    sortedValue: async.apply(db.sortedSetAdd, namespace + ':apiTokenValues', id, tokenData.token)
                }, callback);
            }
        ], done);
    };

    Database.createAward = function (name, description, image, done) {
        async.waterfall([
            async.apply(db.incrObjectField, 'global', nextAwardId),
            function (id, next) {
                // Where score as id will work as index position value for sorting
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

    Database.createGrant = function (uid, aid, reason, initiatorUid, token, done) {
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
                    reason    : reason,
                    token     : token
                };

                async.parallel([
                    async.apply(db.sortedSetAdd, namespace + ':award:' + aid, createTime, gid),
                    async.apply(db.sortedSetAdd, namespace + ':user:' + uid, createTime, gid),
                    async.apply(db.sortedSetAdd, namespace + ':grants', createTime, gid),
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

    Database.deleteApiToken = function (tokenData, done) {
        async.parallel([
            async.apply(db.delete, namespace + ':apiToken:' + tokenData.id),
            async.apply(db.sortedSetRemove, namespace + ':apiTokens', tokenData.id),
            async.apply(db.sortedSetRemove, namespace + ':apiTokenValues', tokenData.token)
        ], done);
    };

    Database.deleteAward = function (id, done) {
        async.parallel([
            async.apply(db.delete, namespace + ':' + id),
            async.apply(db.sortedSetRemove, namespace, id)
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
                async.apply(db.sortedSetRemove, namespace + ':user:' + grant.uid, gid),
                async.apply(db.sortedSetRemove, namespace + ':grants', gid)
            ], done);
        });
    };

    Database.editAward = function (id, update, done) {
        async.waterfall([
            async.apply(Database.getAward, id),
            function (award, next) {
                if (!award) {
                    return next(new Error('Award can not be found'));
                }

                db.setObject(namespace + ':' + id, update, function (error) {
                    if (error) {
                        return next(error);
                    }

                    next(null, Object.assign({}, award, update));
                });
            }
        ], done);
    };

    Database.editGrant = function (gid, update, done) {
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

                    next(null, Object.assign({}, grant, update));
                });
            }
        ], done);
    };

    Database.getApiToken = function (id, done) {
        db.getObject(namespace + ':apiToken:' + id, done);
    };

    Database.getAward = function (aid, done) {
        db.getObject(namespace + ':' + aid, done);
    };

    Database.getApiTokens = function (reverse, limit, done) {
        async.waterfall([
            async.apply((reverse ? db.getSortedSetRevRange : db.getSortedSetRange), namespace + ':apiTokens', 0, Database.getLimit(limit)),
            function (ids, next) {
                if (ids.length === 0) {
                    return next(null, []);
                }

                db.getObjects(ids.map(function (id) {
                    return namespace + ':apiToken:' + id;
                }), next);
            }
        ], done);
    };

    Database.getAwards = function (reverse, done) {
        async.waterfall([
            async.apply((reverse ? db.getSortedSetRevRange : db.getSortedSetRange), namespace, 0, -1),
            function (ids, next) {
                if (ids.length === 0) {
                    return next(null, []);
                }
                db.getObjects(ids.map(function (id) {
                    return namespace + ':' + id;
                }), next);
            }
        ], done);
    };

    Database.getGrant = function (gid, done) {
        db.getObject(namespace + ':grant:' + gid, done);
    };

    Database.getGrants = function (reverse, limit, done) {
        async.waterfall([
            async.apply((reverse ? db.getSortedSetRevRange : db.getSortedSetRange), namespace + ':grants', 0, Database.getLimit(limit)),
            function (gids, next) {
                if (gids.length === 0) {
                    return next(null, []);
                }

                db.getObjects(gids.map(function (gid) {
                    return namespace + ':grant:' + gid;
                }), next);
            }
        ], done);
    };

    Database.getGrantIdsByAward = function (aid, done) {
        db.getSortedSetRevRange(namespace + ':award:' + aid, 0, -1, done);
    };

    Database.getGrantIdsByUser = function (uid, limit, done) {
        db.getSortedSetRevRange(namespace + ':user:' + uid, 0, Database.getLimit(limit), done);
    };

    Database.getGrantsByIds = function (ids, done) {
        db.getObjects(ids.map(function (gid, index) {
            return namespace + ':grant:' + gid;
        }), done);
    };

    Database.getLimit = function (limit) {
        var result;

        if (limit === -1) {
            // Prevent limit to be less than -1, otherwise NodeBB will try to reverse the collection with the negative limit
            result = limit;
        } else {
            // NodeBB internal API always has a limit +1, i.e. if limit is 2, it will be 3.
            result = limit - 1;
        }

        return result;
    };

})(module.exports);
