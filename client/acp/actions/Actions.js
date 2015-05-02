var AppDispatcher = require('../dispatcher/AppDispatcher'),
    Constants     = require('../Constants');

module.exports = {
    awardUsers: function (users, awardId, reason) {
        AppDispatcher.dispatch({
            actionType: Constants.EVENT_AWARD_USERS,
            users     : users,
            award     : awardId,
            reason    : reason
        });
    },

    createAward: function (name, description, imageFileId) {
        AppDispatcher.dispatch({
            actionType: Constants.EVENT_CREATE_AWARD,
            name      : name,
            desc      : description,
            fileId    : imageFileId
        });
    },

    deleteAward: function (awardEntity) {
        AppDispatcher.dispatch({
            actionType: Constants.EVENT_DELETE_AWARD,
            id        : awardEntity.aid
        });
    },

    getAwards: function () {
        AppDispatcher.dispatch({
            actionType: Constants.EVENT_GET_ALL_AWARDS
        });
    },

    getSettings: function () {

    },

    panelCancel: function (panel) {
        AppDispatcher.dispatch({
            actionType: Constants.EVENT_PANEL_CANCEL,
            panel     : panel
        });
    },

    pickUserFromSearch: function (index, uid) {
        AppDispatcher.dispatch({
            actionType: Constants.EVENT_PICK_USER_FROM_SEARCH,
            index     : index,
            uid       : uid
        });
    },

    searchUser: function (name) {
        AppDispatcher.dispatch({
            actionType: Constants.EVENT_SEARCH_USER,
            request   : name
        });
    },

    unpickUserFromSearch: function (index, uid) {
        AppDispatcher.dispatch({
            actionType: Constants.EVENT_UNPICK_USER_FROM_SEARCH,
            index     : index,
            uid       : uid
        });
    }
};