(function (Filter) {
    'use strict';

    var controller = require('./controller');

    /**
     * Hook to render user profile.
     * 'userData' will be used as payload in hook handler.
     * @param params {object} Payload :{userData: userData, uid: callerUID}
     * @param callback {function}
     */
    Filter.account = function (params, callback) {
        //Load all awards
        controller.getUserAwards(params.userData.uid, -1, function (error, awards) {
            if (error) {
                return callback(error);
            }

            params.userData.awards = awards;
            callback(null, params);
        })
    };

    Filter.menuAdmin = function (header, callback) {
        header.plugins.push({
            route: '/plugins/awards',
            icon : 'fa-trophy',
            name : 'Awards'
        });
        callback(null, header);
    };

    Filter.navigation = function (items, callback) {
        items.push({
            route    : "/awards",
            title    : "Awards",
            enabled  : true,
            iconClass: "fa-trophy",
            textClass: "visible-xs-inline",
            text     : "Awards"
        });
        callback(null, items);
    };

    /**
     * Hook to render topic thread
     * @param payload {object} Fields: {posts: posts, uid: uid}
     * @param callback {function}
     */
    Filter.getPosts = function (payload, callback) {
        controller.getAwardsTopic(payload, callback);
    };

})(module.exports);
