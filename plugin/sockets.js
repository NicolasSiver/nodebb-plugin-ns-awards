(function (Sockets) {
    'use strict';

    var async      = require('async'),
        fse        = require('fs-extra'),
        path       = require('path'),
        uuid       = require('uuid'),

        nodebb     = require('./nodebb'),
        sockets    = nodebb.pluginSockets,
        nconf      = nodebb.nconf,
        user       = nodebb.user,
        plugins    = nodebb.plugins,
        controller = require('./controller'),
        settings   = require('./settings'),
        database   = require('./database'),
        constants  = require('./constants'),
        uploads    = require('./uploads');

    Sockets.init = function (callback) {
        sockets[constants.SOCKETS] = {};
        //Acknowledgements
        sockets[constants.SOCKETS].awardUsers = Sockets.awardUsers;
        sockets[constants.SOCKETS].createAward = Sockets.createAward;
        sockets[constants.SOCKETS].deleteAward = Sockets.deleteAward;
        sockets[constants.SOCKETS].deleteGrant = Sockets.deleteGrant;
        sockets[constants.SOCKETS].editAward = Sockets.editAward;
        sockets[constants.SOCKETS].editGrant = Sockets.editGrant;
        sockets[constants.SOCKETS].getAwards = Sockets.getAwards;
        sockets[constants.SOCKETS].getGrantsWithAwards = Sockets.getGrantsWithAwards;
        sockets[constants.SOCKETS].getSettings = Sockets.getSettings;
        sockets[constants.SOCKETS].saveSettings = Sockets.saveSettings;
        sockets[constants.SOCKETS].searchUser = Sockets.searchUser;

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
    Sockets.awardUsers = function (socket, payload, callback) {
        controller.awardUsers(payload, socket.uid, callback);
    };

    /**
     * Create a new Award
     *
     * @param socket Socket.io open connection
     * @param payload {object} Includes 'name', 'desc' and 'fieldId' fields
     * @param callback
     */
    Sockets.createAward = function (socket, payload, callback) {
        async.waterfall([
            async.apply(uploads.getFileById, payload.fileId),
            function (file, next) {
                if (plugins.hasListeners('filter:uploadImage')) {
                    file.name = file.filename;
                    plugins.fireHook('filter:uploadImage', {image: file, uid: uuid.v4()}, next);
                }else {
                    async.series([
                        async.apply(fse.copy, file.path, uploads.getUploadImagePath(file.filename)),
                        async.apply(fse.remove, file.path)
                    ], function (e) {
                        if (e) {
                            return next(e);
                        }
                        next(null, file);
                    });
                }

            },
            function (file, next) {
                    database.createAward(payload.name, payload.desc, uploads.getPublicImagePath(file), next);
            }
        ], callback);
    };

    Sockets.deleteAward = function (socket, payload, callback) {
        async.waterfall([
            async.apply(database.getAward, payload.id),
            function (award, next) {
                if (!award) {
                    return callback(new Error('Award with id - ' + payload.id + 'can not be found'));
                }

                async.parallel([
                    function(next){
                        if(uploads.isOnFileSystem(award.image)){
                            fse.remove(uploads.getUploadImagePath(award.image));
                        }
                        next(null);
                    },
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

    Sockets.deleteGrant = function (socket, payload, callback) {
        controller.deleteGrantById(payload.id, callback);
    };

    Sockets.editAward = function (socket, payload, callback) {
        controller.editAward(payload.id, payload.name, payload.desc, payload.image, callback);
    };

    Sockets.editGrant = function (socket, payload, callback) {
        controller.editGrant(payload.gid, payload.reason, callback);
    };

    Sockets.getAwards = function (socket, callback) {
        database.getAllAwards(callback);
    };

    Sockets.getGrantsWithAwards = function (socket, payload, callback) {
        controller.getUserAwards(payload.uid, -1, callback);
    };

    Sockets.getSettings = function (socket, payload, callback) {
        settings.get(callback);
    };

    Sockets.saveSettings = function (socket, payload, callback) {
        controller.saveValidSettings(payload.settings, callback);
    };

    Sockets.searchUser = function (socket, payload, callback) {
        user.search({
            query     : payload.username,
            searchBy  : ['username'],
            startsWith: false
        }, callback);
    };

})(module.exports);