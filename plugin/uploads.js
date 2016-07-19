//Utility module, for security, to prevent disposing of file metadata
(function (Uploads) {
    'use strict';
    var path           = require('path'),

        constants     = require('./constants'),
        nodebb        = require('./nodebb'),
        nconf         = nodebb.nconf;
    var counter = 1,
        files   = [];

    Uploads.getFileById = function (id, done) {
        done(null, files[id]);
    };

    /**
     * Bind multer's file object to identifier
     *
     * @param file see - https://github.com/expressjs/multer#multer-file-object
     * @param done
     */
    Uploads.setFile = function (file, done) {
        var id = ++counter;
        files[id] = file;
        done(null, id);
    };

    Uploads.getUploadImagePath = function(fileName) {
        return path.join(nconf.get('base_dir'), nconf.get('upload_path'), constants.UPLOAD_DIR, path.basename(fileName));
    }

    Uploads.getPublicImagePath = function(file) {
        if(file.url){
            return file.url;
        }else if(file.filename){
            return path.join(nconf.get('upload_url'), constants.UPLOAD_DIR, file.filename);
        }
        return null;
    }

    Uploads.isOnFileSystem = function(image){
        if(image){
            return image.indexOf(path.join(nconf.get('upload_url'), constants.UPLOAD_DIR)) == 0;
        }
        return false
    }

})(module.exports);