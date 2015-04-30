(function (Module) {
    'use strict';

    var async     = require('async'),
        fse       = require('fs-extra'),
        path      = require('path'),

        nodebb    = require('./nodebb'),
        sockets   = nodebb.pluginSockets,
        nconf     = nodebb.nconf,
        settings  = require('./settings'),
        database  = require('./database'),
        constants = require('./constants'),
        uploads   = require('./uploads');

    Module.init = function (callback) {
        sockets[constants.SOCKETS] = {};
        //Acknowledgements
        sockets[constants.SOCKETS].createAward = Module.createAward;
        sockets[constants.SOCKETS].getAwards = Module.getAwards;

        callback();
    };

    /**
     * Create a new Award
     *
     * @param socket Socket.io open connection
     * @param payload {object} Includes 'name', 'desc' and 'fieldId' fields
     * @param callback
     */
    Module.createAward = function (socket, payload, callback) {
        var awardFile;

        async.waterfall([
            async.apply(uploads.getFileById, payload.fileId),
            function (file, next) {
                awardFile = file;
                fse.copy(
                    file.path,
                    path.join(nconf.get('base_dir'), nconf.get('upload_path'), constants.UPLOAD_DIR, file.name),
                    next
                );
            },
            function (next) {
                database.createAward(payload.name, payload.desc, awardFile.name, next);
            }
        ], callback);
    };

    Module.getAwards = function (socket, callback) {
        database.getAllAwards(callback);
    };

})(module.exports);