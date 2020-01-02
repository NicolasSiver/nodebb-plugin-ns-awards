const async = require('async'),
      path  = require('path');

const api        = require('./api'),
      constants  = require('./constants'),
      controller = require('./controller'),
      filters    = require('./filters'),
      nodebb     = require('./nodebb'),
      settings   = require('./settings'),
      sockets    = require('./sockets'),
      uploads    = require('./uploads');

const helpers = nodebb.helpers;

(function (Plugin) {
    // NodeBB list of hooks: https://github.com/NodeBB/NodeBB/wiki/Hooks
    Plugin.hooks = {
        api    : api,
        filters: filters,
        statics: {
            load: function (params, callback) {
                let router      = params.router,
                    middleware  = params.middleware,
                    controllers = params.controllers;

                let renderAdmin = function (req, res, next) {
                    res.render('admin/plugins/awards', {});
                };

                let renderAwardsPage = function (req, res, next) {
                    controller.getAwardsWithGrantees(function (error, awards) {
                        if (error) {
                            return res.status(500).json(error);
                        }

                        res.render('client/awards/overview', {
                            awards     : awards,
                            breadcrumbs: helpers.buildBreadcrumbs([{text: 'Awards'}]),
                            title      : 'Awards'
                        });
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
