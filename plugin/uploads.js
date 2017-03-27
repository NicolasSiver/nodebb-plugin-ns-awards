(function (Uploads) {
    'use strict';

    var async      = require('async'),
        fse        = require('fs-extra'),
        multer     = require('multer'),
        path       = require('path'),
        shortId    = require('shortid'),

        constants  = require('./constants'),
        controller = require('./controller'),
        nodebb     = require('./nodebb');


    var files = {},
        nconf = nodebb.nconf;

    // Multer File Object - https://github.com/expressjs/multer#multer-file-object

    Uploads.init = function (router, middleware, done) {
        async.waterfall([
            async.apply(createTemporalStorage),
            function (storage, next) {
                addRoute(storage, router, middleware, next);
            }
        ], done);
    };

    function addRoute(storage, router, middleware, done) {
        var route = path.join(
            constants.API_PATH,
            constants.PLUGIN_PATH,
            constants.IMAGE_SERVICE_PATH
        );
        var fileMiddleware = multer({storage: storage}).single('award');

        router.post(route, [fileMiddleware, middleware.applyCSRF, middleware.authenticate], function (req, res, next) {
            let entityId = req.headers['x-ns-award-entity-id'];

            storeLocal(req.file, function (error, file) {
                if (error) {
                    return res.status(500).json(error);
                }

                files[entityId] = file;

                res.json({
                    entityId: entityId,
                    file    : file,
                    storage : 'local'
                });
            });
        });

        done(null);
    }

    function createTemporalStorage(done) {
        let storage = multer.diskStorage({
            destination: function (req, file, next) {
                next(null, path.resolve(__dirname, '../public/uploads/'));
            },
            filename   : function (req, file, next) {
                next(null, 'award-' + shortId.generate() + path.extname(file.originalname));
            }
        });
        done(null, storage);
    }

    Uploads.getFileById = function (id, done) {
        done(null, files[id]);
    };

    Uploads.getUploadPath = function (fileName) {
        return path.join(nconf.get('base_dir'), nconf.get('upload_path'), constants.UPLOAD_DIR, fileName);
    };

    function storeLocal(file, done) {
        var uploadPath = Uploads.getUploadPath(file.filename);

        async.series([
            async.apply(fse.copy, file.path, uploadPath),
            async.apply(fse.remove, file.path)
        ], function (error) {
            if (error) {
                return done(error);
            }
            done(null, Object.assign({}, file, {path: uploadPath}));
        });
    }

})(module.exports);
