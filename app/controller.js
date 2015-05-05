(function (Controller) {
    'use strict';

    var async      = require('async'),
        database   = require('./database'),
        settings   = require('./settings'),
        controller = require('./controller'),
        constants  = require('./constants'),

        nodebb     = require('./nodebb'),
        utils      = nodebb.utils,
        user       = nodebb.user,
        nconf      = nodebb.nconf;

    Controller.deleteUserGrants = function (uid, done) {
        async.waterfall([
            async.apply(database.getGrantIdsByUser, uid),
            function (grantIds, next) {
                async.each(grantIds, function (gid, next) {
                    database.deleteGrant(gid, next);
                }, next);
            }
        ], done);
    };

    Controller.getAllAwards = function (done) {
        async.waterfall([
            async.apply(database.getAllAwards),
            function (awards, next) {
                async.map(awards, function (award, next) {

                    award.picture = nconf.get('upload_url') + constants.UPLOAD_DIR + '/' + award.image;

                    Controller.getAwardRecipients(award.aid, function (error, grants) {
                        if (error) {
                            return next(error);
                        }

                        award.grants = grants;
                        next(null, award);
                    });
                }, function (error, awards) {
                    if (error) {
                        return next(error);
                    }

                    next(null, {
                        awards: awards
                    });
                });
            }
        ], done);
    };

    Controller.getAwardRecipients = function (aid, done) {
        async.waterfall([
            async.apply(database.getGrantIdsByAward, aid),
            function (grantIds, next) {
                grantIds = grantIds || [];
                database.getGrantsByIds(grantIds, next);
            },
            function (grants, next) {
                async.map(grants, function (grant, next) {
                    user.getUserFields(grant.uid, ['username', 'userslug'], function (error, user) {
                        if (error) {
                            return next(error);
                        }
                        grant.user = user;
                        next(null, grant);
                    });
                }, next);
            }
        ], done);
    };

    Controller.getUserAwards = function (uid, done) {
        async.waterfall([
            async.apply(database.getGrantIdsByUser, uid),
            function (grantIds, next) {
                if (!grantIds) {
                    return next(null, []);
                }

                database.getGrantsByIds(grantIds, next);
            },
            function (grants, next) {
                async.map(grants, function (grant, next) {

                    grant.createtimeiso = utils.toISOString(grant.createtime);

                    async.parallel({
                        award: async.apply(database.getAward, grant.aid),
                        user : async.apply(user.getUserFields, grant.fromuid, ['username', 'userslug'])
                    }, function (error, result) {
                        if (error) {
                            return next(error);
                        }

                        var award = result.award, user = result.user;

                        award.picture = nconf.get('upload_url') + constants.UPLOAD_DIR + '/' + award.image;

                        grant.award = award;
                        grant.fromuser = user;
                        next(null, grant);
                    });
                }, next);
            }
        ], done);
    };

})(module.exports);