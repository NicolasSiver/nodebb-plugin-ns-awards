var AppDispatcher = require('../dispatcher/AppDispatcher'),
    EventEmitter  = require('events').EventEmitter,
    assign        = require('react/lib/Object.assign'),
    Constants     = require('../Constants'),
    socket        = require('socket'),

    CHANGE_EVENT  = 'change',
    API           = {
        AWARD_USERS: 'plugins.ns-awards.awardUsers'
    },
    _history      = [];

var UsersStore = assign({}, EventEmitter.prototype, {
    addChangeListener: function (listener) {
        this.on(CHANGE_EVENT, listener);
    },

    emitChange: function () {
        this.emit(CHANGE_EVENT);
    },

    getHistory: function () {
        return _history;
    },

    removeChangeListener: function (listener) {
        this.removeListener(CHANGE_EVENT, listener);
    }
});

AppDispatcher.register(function (action) {
    switch (action.actionType) {
        case Constants.EVENT_AWARD_USERS:
            socket.emit(API.AWARD_USERS, {
                users : action.users,
                award : action.award,
                reason: action.reason
            }, function (error, award) {
                if (error) {
                    console.error(error);
                }
                //noop
            });
            break;
        default:
            return true;
    }
});

module.exports = UsersStore;