const constants  = require('./constants'),
      controller = require('./controller'),
      nodebb     = require('./nodebb'),
      settings   = require('./settings');

const sockets = nodebb.pluginSockets,
      user    = nodebb.user;

(function (Sockets) {
    Sockets.init = function (callback) {
        sockets[constants.SOCKET_NAMESPACE] = {};

        //Acknowledgements
        sockets[constants.SOCKET_NAMESPACE].awardUsers = Sockets.awardUsers;
        sockets[constants.SOCKET_NAMESPACE].createApiToken = Sockets.createApiToken;
        sockets[constants.SOCKET_NAMESPACE].createAward = Sockets.createAward;
        sockets[constants.SOCKET_NAMESPACE].deleteApiToken = Sockets.deleteApiToken;
        sockets[constants.SOCKET_NAMESPACE].deleteAward = Sockets.deleteAward;
        sockets[constants.SOCKET_NAMESPACE].deleteGrant = Sockets.deleteGrant;
        sockets[constants.SOCKET_NAMESPACE].editAward = Sockets.editAward;
        sockets[constants.SOCKET_NAMESPACE].getApiTokens = Sockets.getApiTokens;
        sockets[constants.SOCKET_NAMESPACE].getAwards = Sockets.getAwards;
        sockets[constants.SOCKET_NAMESPACE].getConfig = Sockets.getConfig;
        sockets[constants.SOCKET_NAMESPACE].getGrants = Sockets.getGrants;
        sockets[constants.SOCKET_NAMESPACE].getSettings = Sockets.getSettings;
        sockets[constants.SOCKET_NAMESPACE].getUserGrants = Sockets.getUserGrants;
        sockets[constants.SOCKET_NAMESPACE].saveSettings = Sockets.saveSettings;
        sockets[constants.SOCKET_NAMESPACE].searchUser = Sockets.searchUser;

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
        controller.awardUsers(awardId, socket.uid, userIds, payload.reason, undefined, callback);
    };

    Sockets.createApiToken = function (socket, payload, callback) {
        controller.createApiToken(payload.name, callback);
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

    Sockets.deleteApiToken = function (socket, payload, callback) {
        controller.deleteApiTokenById(parseInt(payload.id), callback);
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

    Sockets.getApiTokens = function (socket, payload, callback) {
        controller.getApiTokens(callback);
    };

    Sockets.getAwards = function (socket, payload, callback) {
        controller.getAwards(function (error, awards) {
            (error === null) ? callback(null, {awards}) : callback(error);
        });
    };

    Sockets.getGrants = function (socket, payload, callback) {
        controller.getGrants(callback);
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
