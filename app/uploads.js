//Utility module, for security, to prevent disposing of file metadata
(function (Uploads) {
    'use strict';

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

})(module.exports);