var AppDispatcher = require('../dispatcher/AppDispatcher'),
    EventEmitter  = require('events').EventEmitter,
    assign        = require('react/lib/Object.assign'),
    Constants     = require('../Constants'),
    socket        = require('socket'),

    CHANGE_EVENT  = 'change',
    API           = {
        SEARCH_USER: 'plugins.ns-awards.searchUser'
    },
    _result       = [];

var SearchUsersStore = assign({}, EventEmitter.prototype, {
    addChangeListener: function (listener) {
        this.on(CHANGE_EVENT, listener);
    },

    emitChange: function () {
        this.emit(CHANGE_EVENT);
    },

    getResult: function () {
        return _result;
    },

    removeChangeListener: function (listener) {
        this.removeListener(CHANGE_EVENT, listener);
    }
});

AppDispatcher.register(function (action) {
    switch (action.actionType) {
        case Constants.EVENT_SEARCH_USER:
            socket.emit(API.SEARCH_USER, {
                name: action.request
            }, function (error, users) {
                _result = users;
                SearchUsersStore.emitChange();
            });
            break;
        default:
            return true;
    }
});

module.exports = SearchUsersStore;