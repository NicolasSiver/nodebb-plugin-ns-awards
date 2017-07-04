(function (Api) {
    'use strict';

    var async = require('async');

    var controller = require('./controller');

    function authenticate(auth, done) {
        async.waterfall([
            function (next) {
                if (!auth) {
                    next(new Error('Auth Object is not provided.'));
                } else if (!auth.token || auth.token === '') {
                    next(new Error('Token is not provided or empty.'));
                } else {
                    next(null);
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
        async.waterfall([
            async.apply(authenticate, payload.auth),
            function (tokenEntity, next) {
                controller.getAwards(next);
            },
            function (awards, next) {
                next(null, {awards: awards});
            }
        ], callback);
    };

    /**
     * Reward user with an award.
     *
     * @param {object} payload
     * @param {number} payload.awardId
     * @param {number} payload.fromUserId
     * @param {number} payload.toUserId
     * @param {string} payload.reason
     * @param {function} callback
     */
    Api.rewardUser = function (payload, callback) {
        async.waterfall([
            async.apply(authenticate, payload.auth),
            function (tokenEntity, next) {
                controller.awardUsers(
                    payload.awardId,
                    payload.fromUserId,
                    [payload.toUserId],
                    payload.reason,
                    tokenEntity.token,
                    next
                );
            }
        ], callback);
    };

})(module.exports);
