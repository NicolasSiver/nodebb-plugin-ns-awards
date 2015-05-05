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
        controller.getUserAwards(params.userData.uid, function (error, awards) {
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
     * Hook to render topic thread.
     * 'topicData' will be used as payload in hook handler.
     * @param topicData {object} Payload :{posts: [{user:{uid:postOwnerId}}], uid: topicOwnerId}
     * @param callback {function}
     */
    Filter.topic = function (topicData, callback) {
        //async.map(topicData.posts, function (post, next) {
        //    database.getPoints(post.user.uid, function (error, points) {
        //        if (error) {
        //            return next(error);
        //        }
        //        post.points = points || 0;
        //        next(null, post);
        //    });
        //}, function (error, results) {
        //    if (error) {
        //        return callback(error);
        //    }
        //    topicData.posts = results;
        //    callback(null, topicData);
        //});
        callback(null, topicData);
    };

    Filter.userDelete = function (uid, callback) {
        controller.deleteUserGrants(uid, callback);
    };

})(module.exports);