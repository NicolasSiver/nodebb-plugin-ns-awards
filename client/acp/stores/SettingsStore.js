var AppDispatcher = require('../dispatcher/AppDispatcher'),
    EventEmitter  = require('events').EventEmitter,
    assign        = require('react/lib/Object.assign'),
    Constants     = require('../Constants'),
    socket        = require('socket'),

    CHANGE_EVENT  = 'change',
    API           = {
        GET_SETTINGS : 'plugins.ns-awards.getSettings',
        SAVE_SETTINGS: 'plugins.ns-awards.saveSettings'
    },
    _settings     = {};

var SettingsStore = assign({}, EventEmitter.prototype, {
    addChangeListener: function (listener) {
        this.on(CHANGE_EVENT, listener);
    },

    emitChange: function () {
        this.emit(CHANGE_EVENT);
    },

    getSettings: function () {
        return _settings;
    },

    removeChangeListener: function (listener) {
        this.removeListener(CHANGE_EVENT, listener);
    }
});

AppDispatcher.register(function (action) {
    switch (action.actionType) {
        case Constants.EVENT_GET_SETTINGS:
            socket.emit(API.GET_SETTINGS, {}, function (error, settings) {
                if (error) {
                    console.error(error);
                }
                _settings = settings;
                SettingsStore.emitChange();
            });
            break;
        case Constants.EVENT_SAVE_SETTINGS:
            socket.emit(API.SAVE_SETTINGS, {
                settings: action.settings
            }, function (error, settings) {
                if (error) {
                    console.error(error);
                }
                _settings = settings;
                SettingsStore.emitChange();
            });
            break;
        default:
            return true;
    }
});

module.exports = SettingsStore;