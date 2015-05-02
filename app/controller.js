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

    Controller.getAllAwards = function (done) {
        done(null, null);
    };

    Controller.getUserAwards = function (uid, done) {
        async.waterfall([
            async.apply(database.getGrantIdsByUser, uid),
            function (grantIds, next) {
                if (!grantIds) {
                    done(null, []);
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