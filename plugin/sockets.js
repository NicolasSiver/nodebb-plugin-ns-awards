(function (Sockets) {
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
        sockets[constants.SOCKETS].getGrants = Sockets.getGrants;
        sockets[constants.SOCKETS].getGrantsWithAwards = Sockets.getGrantsWithAwards;
        sockets[constants.SOCKETS].getConfig = Sockets.getConfig;
        sockets[constants.SOCKETS].getSettings = Sockets.getSettings;
        sockets[constants.SOCKETS].getUserGrants = Sockets.getUserGrants;
        sockets[constants.SOCKETS].saveSettings = Sockets.saveSettings;
        sockets[constants.SOCKETS].searchUser = Sockets.searchUser;

        callback();
    };

    /**
     * Grant Award for multiple users.
     * Registers: reason of the award, date, relationships
     *
     * @param {object} socket Socket.io open connection
     * @param {{awardId: number, reason: string, userIds: array}} payload
     * @param {function} callback
     */
    Sockets.awardUsers = function (socket, payload, callback) {
        var awardId = parseInt(payload.awardId),
            userIds = payload.userIds.map(function (uid) {
                return parseInt(uid);
            });
        controller.awardUsers(awardId, socket.uid, userIds, payload.reason, callback);
    };

    /**
     * Create a new Award
     *
     * @param {object} socket Socket.io open connection
     * @param {object} payload {object} includes 'name' and 'description' fields
     * @param {function} callback
     */
    Sockets.createAward = function (socket, payload, callback) {
        controller.createAward(payload, callback);
    };

    Sockets.deleteAward = function (socket, payload, callback) {
        async.waterfall([
            async.apply(database.getAward, payload.id),
            function (award, next) {
                if (!award) {
                    return callback(new Error('Award with id - ' + payload.id + ' can not be found'));
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

    Sockets.deleteGrant = function (socket, payload, callback) {
        controller.deleteGrantById(payload.id, callback);
    };

    Sockets.editAward = function (socket, payload, callback) {
        controller.editAward(parseInt(payload.id), payload.name, payload.description, callback);
    };

    Sockets.editGrant = function (socket, payload, callback) {
        controller.editGrant(payload.gid, payload.reason, callback);
    };

    Sockets.getAwards = function (socket, callback) {
        controller.getAwards(callback);
    };

    Sockets.getGrants = function (socket, payload, callback) {
        controller.getGrants(callback);
    };

    Sockets.getGrantsWithAwards = function (socket, payload, callback) {
        controller.getUserAwards(payload.uid, -1, callback);
    };

    Sockets.getConfig = function (socket, payload, callback) {
        controller.getConfig(callback);
    };

    Sockets.getSettings = function (socket, payload, callback) {
        settings.get(callback);
    };

    Sockets.getUserGrants = function (socket, payload, callback) {
      controller.getUserGrants(payload.id, -1, callback);
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

    function getUploadImagePath(fileName) {
        return path.join(nconf.get('base_dir'), nconf.get('upload_path'), constants.UPLOAD_DIR, fileName);
    }

})(module.exports);