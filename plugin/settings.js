(function (Settings) {
    'use strict';

    var constants = require('./constants'),
        nodebb    = require('./nodebb');

    var meta          = nodebb.meta,

        //Memory cache
        settingsCache = null,

        defaults      = {
            activityLimit       : 80,
            maxRewardsPerPost   : 3,
            maxRewardsPerAccount: -1
        };

    Settings.init = function (done) {
        meta.settings.get(constants.NAMESPACE, function (error, settings) {
            if (error) {
                return done(error);
            }
            settingsCache = Object.assign({}, defaults, settings);
            done(null);
        });
    };

    Settings.filterKnownProperties = function (data, done) {
        var result = {};
        var value;

        for (var knownProperty in defaults) {
            if (defaults.hasOwnProperty(knownProperty) && data.hasOwnProperty(knownProperty)) {

                switch (typeof defaults[knownProperty]) {
                    case 'number':
                        value = parseInt(data[knownProperty]);
                        break;
                    case 'string':
                        value = String(data[knownProperty]);
                        break;
                    case 'boolean':
                        if (typeof data[knownProperty] === 'string') {
                            value = data[knownProperty] === 'true';
                        } else {
                            value = !!data[knownProperty];
                        }
                        break;
                }

                result[knownProperty] = value;
            }
        }

        done(null, result);
    };

    Settings.get = function (done) {
        return done(null, settingsCache);
    };

    Settings.save = function (data, done) {
        settingsCache = Object.assign({}, settingsCache, data);
        meta.settings.set(constants.NAMESPACE, settingsCache, function (error) {
            if (error) {
                return done(error);
            }
            done(null, settingsCache);
        });
    };

    Settings.validate = function (insecureData, done) {
        var corrections = {};

        if (!insecureData.hasOwnProperty('activityLimit')) {
            corrections.activityLimit = defaults.activityLimit;
        } else if (isNaN(insecureData.activityLimit) || insecureData.activityLimit <= 0) {
            return done(new Error('Activity Limit is incorrect.'));
        }

        if (!insecureData.hasOwnProperty('maxRewardsPerPost')) {
            insecureData.maxRewardsPerPost = defaults.maxRewardsPerPost;
        } else if (isNaN(insecureData.maxRewardsPerPost)) {
            return done(new Error('Max Rewards Per Post is incorrect.'));
        }

        if (!insecureData.hasOwnProperty('maxRewardsPerAccount')) {
            insecureData.maxRewardsPerAccount = defaults.maxRewardsPerAccount;
        } else if (isNaN(insecureData.maxRewardsPerAccount)) {
            return done(new Error('Max Rewards Per Account is incorrect.'));
        }

        done(null, Object.assign({}, insecureData, corrections));
    };

})(module.exports);