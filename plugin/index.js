(function (Plugin) {
    'use strict';

    var async      = require('async'),
        multer     = require('multer'),
        path       = require('path'),
        shortId    = require('shortid'),

        controller = require('./controller'),
        sockets    = require('./sockets'),
        filters    = require('./filters'),
        settings   = require('./settings'),
        uploads    = require('./uploads');

    //NodeBB list of Hooks: https://github.com/NodeBB/NodeBB/wiki/Hooks
    Plugin.hooks = {
        filters: filters,
        statics: {
            load      : function (params, callback) {
                var router       = params.router,
                    middleware   = params.middleware,
                    controllers  = params.controllers,
                    pluginUri    = '/admin/plugins/awards',
                    apiUri       = '/api' + pluginUri,

                    renderAdmin  = function (req, res, next) {
                        res.render(
                            'admin/plugins/awards', {}
                        );
                    },

                    renderClient = function (req, res, next) {
                        controller.getAllAwards(function (error, result) {
                            if (error) {
                                return res.status(500).json(error);
                            }
                            res.render(
                                'client/all_awards', result
                            );
                        });
                    },

                    apiImages    = function (req, res, next) {
                        uploads.setFile(req.file, function (error, id) {
                            if (error) {
                                return res.status(500).json(error);
                            }
                            res.json({id: id});
                        });
                    },

                    storage      = multer.diskStorage({
                        destination: path.resolve(__dirname, '../public/uploads/'),
                        filename   : function (req, file, cb) {
                            cb(null, 'award-' + shortId.generate() + path.extname(file.originalname))
                        }
                    });

                router.get(pluginUri, middleware.admin.buildHeader, renderAdmin);
                router.get(apiUri, renderAdmin);

                // Image uploader
                router.post(
                    apiUri + '/images',
                    multer({storage: storage}).single('award'), apiImages);

                //Client page
                router.get('/awards', middleware.buildHeader, renderClient);
                router.get('/api/awards', renderClient);

                async.series([
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
