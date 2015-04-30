//Utility module, for security, to prevent disposing of file metadata
(function (Uploads) {
    'use strict';

    var counter = 1,
        files   = [];

    Uploads.getFileById = function (id, done) {
        done(null, files[id]);
    };

    Uploads.setFile = function (file, done) {
        var id = counter++;
        files[id] = file;
        done(null, id);
    };

})(module.exports);