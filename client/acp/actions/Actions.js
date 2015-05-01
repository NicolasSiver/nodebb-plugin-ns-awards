var AppDispatcher = require('../dispatcher/AppDispatcher'),
    Constants     = require('../Constants');

module.exports = {
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

    searchUser: function (name) {
        AppDispatcher.dispatch({
            actionType: Constants.EVENT_SEARCH_USER,
            request   : name
        });
    }
};