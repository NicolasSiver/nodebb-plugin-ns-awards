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

    editAward: function (aid, name, desc, file) {
        AppDispatcher.dispatch({
            actionType: Constants.EVENT_EDIT_AWARD,
            id        : aid,
            name      : name,
            desc      : desc,
            file      : file
        });
    },

    getAwards: function () {
        AppDispatcher.dispatch({
            actionType: Constants.EVENT_GET_ALL_AWARDS
        });
    },

    getSettings: function () {
        AppDispatcher.dispatch({
            actionType: Constants.EVENT_GET_SETTINGS
        });
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

    saveSettings: function (settings) {
        AppDispatcher.dispatch({
            actionType: Constants.EVENT_SAVE_SETTINGS,
            settings  : settings
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