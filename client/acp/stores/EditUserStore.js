var AppDispatcher = require('../dispatcher/AppDispatcher'),
    assign        = require('react/lib/Object.assign'),
    Constants     = require('../Constants'),
    EventEmitter  = require('events').EventEmitter,
    socket        = require('socket'),

    CHANGE_EVENT  = 'change',
    API           = {
        DELETE_GRANT: 'plugins.ns-awards.deleteGrant',
        GET_GRANTS  : 'plugins.ns-awards.getGrantsWithAwards'
    },
    _users        = [];

var EditUserStore = assign({}, EventEmitter.prototype, {
    addChangeListener: function (listener) {
        this.on(CHANGE_EVENT, listener);
    },

    emitChange: function () {
        this.emit(CHANGE_EVENT);
    },

    getUsers: function () {
        return _users;
    },

    removeChangeListener: function (listener) {
        this.removeListener(CHANGE_EVENT, listener);
    }
});

AppDispatcher.register(function (action) {
    switch (action.actionType) {
        case Constants.EVENT_USER_DID_SELECT:
            _users = _users.concat(action.payload.user);
            EditUserStore.emitChange();
            break;
        default:
            return true;
    }
});

module.exports = EditUserStore;
