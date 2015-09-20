(function (Module) {
    'use strict';

    var async      = require('async'),
        fse        = require('fs-extra'),
        path       = require('path'),

        nodebb     = require('./nodebb'),
        sockets    = nodebb.pluginSockets,
        nconf      = nodebb.nconf,
        user       = nodebb.user,
        controller = require('./controller'),
        settings   = require('./settings'),
        database   = require('./database'),
        constants  = require('./constants'),
        uploads    = require('./uploads');

    Module.init = function (callback) {
        sockets[constants.SOCKETS] = {};
        //Acknowledgements
        sockets[constants.SOCKETS].awardUsers = Module.awardUsers;
        sockets[constants.SOCKETS].createAward = Module.createAward;
        sockets[constants.SOCKETS].deleteAward = Module.deleteAward;
        sockets[constants.SOCKETS].editAward = Module.editAward;
        sockets[constants.SOCKETS].getAwards = Module.getAwards;
        sockets[constants.SOCKETS].getSettings = Module.getSettings;
        sockets[constants.SOCKETS].saveSettings = Module.saveSettings;
        sockets[constants.SOCKETS].searchUser = Module.searchUser;

        callback();
    };

    /**
     * Grant Award for multiple users.
     * Registers: reason of the award, date, relationships
     *
     * @param socket Socket.io open connection
     * @param payload {object} Includes 'users', 'award' and 'reason' fields, where award is Award Id
     * @param callback
     */
    Module.awardUsers = function (socket, payload, callback) {
        controller.awardUsers(payload, socket.uid, callback);
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
                    getUploadImagePath(file.name),
                    next
                );
            },
            function (next) {
                database.createAward(payload.name, payload.desc, awardFile.name, next);
            }
        ], callback);
    };

    Module.deleteAward = function (socket, payload, callback) {
        async.waterfall([
            async.apply(database.getAward, payload.id),
            function (award, next) {
                if (!award) {
                    return callback(new Error('Award with id - ' + payload.id + 'can not be found'));
                }

                async.parallel([
                    async.apply(fse.remove, getUploadImagePath(award.image)),
                    async.apply(database.deleteAward, award.aid),
                    function (next) {
                        //Delete Grants associated with this award
                        database.getGrantIdsByAward(award.aid, function (error, grantIds) {
                            async.each(grantIds, function (gid, next) {
                                database.deleteGrant(gid, next);
                            }, next);
                        });
                    }
                ], next);
            }
        ], callback);
    };

    Module.editAward = function (socket, payload, callback) {
        controller.editAward(payload.id, payload.name, payload.desc, payload.image, callback);
    };

    Module.getAwards = function (socket, callback) {
        database.getAllAwards(callback);
    };

    Module.getSettings = function (socket, payload, callback) {
        settings.get(callback);
    };

    Module.saveSettings = function (socket, payload, callback) {
        controller.saveValidSettings(payload.settings, callback);
    };

    Module.searchUser = function (socket, payload, callback) {
        user.search({
            query     : payload.username,
            searchBy  : ['username'],
            startsWith: false
        }, callback);
    };

    function getUploadImagePath(fileName) {
        return path.join(nconf.get('base_dir'), nconf.get('upload_path'), constants.UPLOAD_DIR, fileName);
    }

})(module.exports);