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

    cancelEditReward: function (user) {
        AppDispatcher.dispatch({
            actionType: Constants.EVENT_REWARD_EDIT_WILL_CANCEL,
            payload   : {
                user: user
            }
        });
    },

    clearRewardDetails: function () {
        AppDispatcher.dispatch({
            actionType: Constants.EVENT_CLEAR_REWARD_DETAILS
        });
    },

    clearUserSearch: function () {
        AppDispatcher.dispatch({
            actionType: Constants.EVENT_CLEAR_SEARCH_RESULT
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

    deleteGrant: function (user, grant) {
        AppDispatcher.dispatch({
            actionType: Constants.EVENT_GRANT_WILL_DELETE,
            payload   : {
                user : user,
                grant: grant
            }
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

    editReward: function (user, grant) {
        AppDispatcher.dispatch({
            actionType: Constants.EVENT_REWARD_WILL_EDIT,
            payload   : {
                user : user,
                grant: grant
            }
        });
    },

    editRewardReason: function (user, reasonText) {
        AppDispatcher.dispatch({
            actionType: Constants.EVENT_REWARD_REASON_DID_EDIT,
            payload   : {
                user: user,
                text: reasonText
            }
        });
    },

    getAwards: function () {
        AppDispatcher.dispatch({
            actionType: Constants.EVENT_GET_ALL_AWARDS
        });
    },

    getUserAwards: function (uid) {
        AppDispatcher.dispatch({
            actionType: Constants.EVENT_GET_USER_AWARDS,
            payload   : {
                uid: uid
            }
        });
    },

    getSettings: function () {
        AppDispatcher.dispatch({
            actionType: Constants.EVENT_GET_SETTINGS
        });
    },

    offsetUserFromSearchOn: function (offset) {
        AppDispatcher.dispatch({
            actionType: Constants.EVENT_OFFSET_USER_FROM_SEARCH_ON,
            offset    : offset
        })
    },

    panelCancel: function (panel) {
        AppDispatcher.dispatch({
            actionType: Constants.EVENT_PANEL_CANCEL,
            panel     : panel
        });
    },

    pickUserFromSearch: function () {
        AppDispatcher.dispatch({
            actionType: Constants.EVENT_PICK_USER_FROM_SEARCH
        });
    },

    pickUserFromSearchAt: function (index) {
        AppDispatcher.dispatch({
            actionType: Constants.EVENT_PICK_USER_FROM_SEARCH_AT,
            index     : index
        });
    },

    rewardUsers: function () {
        AppDispatcher.dispatch({
            actionType: Constants.EVENT_REWARD_USERS
        });
    },

    saveGrant: function (user, grant) {
        AppDispatcher.dispatch({
            actionType: Constants.EVENT_GRANT_WILL_SAVE,
            payload   : {
                user : user,
                grant: grant
            }
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

    selectAward: function (awardId) {
        AppDispatcher.dispatch({
            actionType: Constants.EVENT_AWARD_DID_SELECT,
            payload   : {
                awardId: awardId
            }
        });
    },

    selectUser: function (user) {
        AppDispatcher.dispatch({
            actionType: Constants.EVENT_USER_DID_SELECT,
            payload   : {
                user: user
            }
        });
    },

    setRewardReason: function (text) {
        AppDispatcher.dispatch({
            actionType: Constants.EVENT_REWARD_REASON_DID_CHANGE,
            payload   : text
        });
    },

    setSection: function (sectionId) {
        AppDispatcher.dispatch({
            actionType: Constants.EVENT_SECTION_WILL_SELECT,
            sectionId : sectionId
        });
    },

    unpickUserFromSearch: function (index, uid) {
        AppDispatcher.dispatch({
            actionType: Constants.EVENT_UNPICK_USER_FROM_SEARCH,
            index     : index,
            uid       : uid
        });
    },

    unselectUser: function (user) {
        AppDispatcher.dispatch({
            actionType: Constants.EVENT_USER_DID_UNSELECT,
            payload   : {
                user: user
            }
        });
    }
};
