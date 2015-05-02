(function (Controller) {
    'use strict';

    var async      = require('async'),
        database   = require('./database'),
        settings   = require('./settings'),
        controller = require('./controller'),
        constants  = require('./constants');

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
                    database.getAward(grant.aid, function (error, award) {
                        if (error) {
                            return next(error);
                        }

                        grant.award = award;
                        next(null, grant);
                    });
                }, next);
            }
        ], done);
    };

})(module.exports);