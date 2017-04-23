(function (Sockets) {
    'use strict';

    var constants  = require('./constants'),
        controller = require('./controller'),
        nodebb     = require('./nodebb'),
        settings   = require('./settings');

    var sockets = nodebb.pluginSockets,
        user    = nodebb.user;

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
        controller.deleteAwardById(parseInt(payload.id), callback);
    };

    Sockets.deleteGrant = function (socket, payload, callback) {
        controller.deleteGrantById(parseInt(payload.id), callback);
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
        controller.saveSettings(payload.settings, callback);
    };

    Sockets.searchUser = function (socket, payload, callback) {
        user.search({
            query     : payload.username,
            searchBy  : ['username'],
            startsWith: false
        }, callback);
    };

})(module.exports);
