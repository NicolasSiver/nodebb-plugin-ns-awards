(function (Plugin) {
    'use strict';

    var async = require('async'),
        path  = require('path');

    var constants  = require('./constants'),
        controller = require('./controller'),
        filters    = require('./filters'),
        settings   = require('./settings'),
        sockets    = require('./sockets'),
        uploads    = require('./uploads');

    //NodeBB list of Hooks: https://github.com/NodeBB/NodeBB/wiki/Hooks
    Plugin.hooks = {
        filters: filters,
        statics: {
            load: function (params, callback) {
                var router      = params.router,
                    middleware  = params.middleware,
                    controllers = params.controllers;

                var renderAdmin = function (req, res, next) {
                    res.render('admin/plugins/awards', {});
                };

                var renderAwardsPage = function (req, res, next) {
                    controller.getAwardsWithGrantees(function (error, awards) {
                        if (error) {
                            return res.status(500).json(error);
                        }
                        res.render('client/awards', {awards: awards});
                    });
                };

                router.get(constants.PLUGIN_PATH, middleware.admin.buildHeader, renderAdmin);
                router.get(path.join(constants.API_PATH, constants.PLUGIN_PATH), renderAdmin);

                // Client Awards page
                router.get(constants.CLIENT_PAGE_PATH, middleware.buildHeader, renderAwardsPage);
                router.get(path.join(constants.API_PATH, constants.CLIENT_PAGE_PATH), renderAwardsPage);

                async.series([
                    async.apply(uploads.init, router, middleware),
                    async.apply(settings.init),
                    async.apply(sockets.init)
                ], callback);
            },

            userDelete: function (params, callback) {
                controller.deleteUserGrants(params.uid, callback);
            }
        }
    };

})(module.exports);
