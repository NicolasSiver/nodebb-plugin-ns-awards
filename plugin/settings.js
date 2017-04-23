(function (Settings) {
    'use strict';

    var constants = require('./constants'),
        nodebb    = require('./nodebb');

    var meta          = nodebb.meta,

        //Memory cache
        settingsCache = null,

        defaults      = {
            activityLimit : 80,
            renderTopic   : true,
            maxAwardsTopic: 3
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
        for (var knownProperty in settingsCache) {
            if (data.hasOwnProperty(knownProperty)) {
                result[knownProperty] = data[knownProperty];
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

        if (!insecureData.activityLimit) {
            corrections.activityLimit = defaults.activityLimit;
        } else if (isNaN(insecureData.activityLimit) || insecureData.activityLimit <= 0) {
            return done(new Error('Activity Limit is incorrect.'));
        }

        done(null, Object.assign({}, insecureData, corrections));
    };

})(module.exports);