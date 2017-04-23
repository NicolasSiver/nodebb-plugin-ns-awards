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
        done(null, insecureData);
    };

})(module.exports);