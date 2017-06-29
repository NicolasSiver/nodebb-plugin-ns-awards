(function (Api) {
    'use strict';

    var async = require('async');

    var constants  = require('./constants'),
        controller = require('./controller');

    function authenticate(auth, done) {
        async.waterfall([
            function (next) {
                if (!auth) {
                    next(new Error('Auth Object is not provided.'));
                } else if (!auth.token || auth.token === '') {
                    next(new Error('Token is not provided or empty.'));
                }
            },
            async.apply(controller.getApiTokens),
            function (tokens, next) {
                var i = 0, len = tokens.length, tokenEntity;
                for (i; i < len; ++i) {
                    tokenEntity = tokens[i];
                    if (tokenEntity.token === auth.token) {
                        return next(null, tokenEntity);
                    }
                }
                next(new Error('Token ' + auth.token + ' can not be found.'));
            }
        ], done);
    }

    /**
     * Get all available awards.
     * Return an array of Award objects.
     *
     * @param {object} payload should include only information about authentication
     * @param {function} callback
     */
    Api.getAwards = function (payload, callback) {

    };

    Api.getUserAwards = function (payload, callback) {

    };

    Api.rewardUser = function (payload, callback) {

    };

})(module.exports);
