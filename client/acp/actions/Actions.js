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

    getAwards: function () {
        AppDispatcher.dispatch({
            actionType: Constants.EVENT_GET_ALL_AWARDS
        });
    },

    getSettings: function () {

    }
};