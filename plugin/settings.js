(function (Settings) {
    'use strict';

    var meta          = require('./nodebb').meta,
        constants     = require('./constants'),

        //Memory cache
        settingsCache = null,
        defaults      = {
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

    Settings.save = function (settings, done) {
        settingsCache = Object.assign({}, settingsCache, settings);
        meta.settings.set(constants.NAMESPACE, settingsCache, function (error) {
            done(error, settingsCache);
        });
    };

})(module.exports);