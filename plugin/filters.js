(function (Filter) {
    'use strict';

    let constants  = require('./constants'),
        controller = require('./controller');

    /**
     * Hook to render a user profile.
     * 'templateData' will be used as payload in hook handler.
     *
     * @param {object} payload structure { req: req, res: res, templateData: userData}
     * @param {function} callback
     */
    Filter.account = function (payload, callback) {
        controller.getAccountWithRewards(payload.templateData, function (error, templateData) {
            if (error) {
                return callback(error);
            }
            payload.templateData = templateData;
            callback(null, payload);
        });
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
            route    : constants.CLIENT_PAGE_PATH,
            title    : 'Awards',
            enabled  : true,
            iconClass: 'fa-trophy',
            textClass: 'visible-xs-inline',
            text     : 'Awards'
        });
        callback(null, items);
    };

    /**
     * Hook to render a topic thread
     *
     * @param {object} payload fields: {posts: posts, uid: uid}
     * @param {function} callback
     */
    Filter.getPosts = function (payload, callback) {
        // Remove purged posts
        let posts = payload.posts.filter(post => post !== null);

        controller.getPostsWithRewards(posts, function (error, posts) {
            if (error) {
                return callback(error);
            }
            payload.posts = posts;
            callback(null, payload);
        });
    };

})(module.exports);
