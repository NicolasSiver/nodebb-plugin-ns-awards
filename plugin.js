(function (Plugin) {

    var async      = require('async'),
        multer     = require('multer'),

        controller = require('./app/controller'),
        sockets    = require('./app/sockets'),
        filters    = require('./app/filters'),
        settings   = require('./app/settings'),
        uploads    = require('./app/uploads');

    //NodeBB list of Hooks: https://github.com/NodeBB/NodeBB/wiki/Hooks
    Plugin.hooks = {
        filters: filters,
        statics: {
            load: function (params, callback) {
                var router            = params.router,
                    middleware        = params.middleware,
                    controllers       = params.controllers,
                    pluginUri         = '/admin/plugins/awards',
                    apiUri            = '/api' + pluginUri,

                    renderAdmin       = function (req, res, next) {
                        res.render(
                            'admin/plugins/awards', {}
                        );
                    },

                    renderClient      = function (req, res, next) {
                        controller.getAllAwards(function (error, payload) {
                            if (error) {
                                return res.status(500).json(error);
                            }
                            res.render(
                                'client/all_awards', payload
                            );
                        });
                    },

                    storageMiddleware = multer({
                        onFileUploadComplete: function (file, req, res) {
                            req.awardFile = file;
                        }
                    }),

                    apiImages         = function (req, res, next) {
                        uploads.setFile(req.awardFile, function (error, id) {
                            if (error) {
                                return res.status(500).json(error);
                            }
                            res.json({id: id});
                        });
                    };

                router.get(pluginUri, middleware.admin.buildHeader, renderAdmin);
                router.get(apiUri, renderAdmin);
                router.post(apiUri + '/images', storageMiddleware, apiImages);

                //Client page
                router.get('/awards', middleware.buildHeader, renderClient);
                router.get('/api/awards', renderClient);

                async.series([
                    async.apply(settings.init),
                    async.apply(sockets.init)
                ], callback);
            }
        }
    };

})(module.exports);