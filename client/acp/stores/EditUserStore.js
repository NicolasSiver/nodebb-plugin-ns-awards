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
    _grants       = [],
    _users        = [];

var EditUserStore = assign({}, EventEmitter.prototype, {
    addChangeListener: function (listener) {
        this.on(CHANGE_EVENT, listener);
    },

    emitChange: function () {
        this.emit(CHANGE_EVENT);
    },

    getUserAwards: function (uid) {
        return _grants[uid] || [];
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
            getAwards(action.payload.user.uid);
            break;
        case Constants.EVENT_GET_USER_AWARDS:
            getAwards(action.payload.uid);
            break;
        case Constants.EVENT_USER_DID_UNSELECT:
            _users = _users.filter(function (user) {
                return user.uid !== action.payload.user.uid;
            });
            EditUserStore.emitChange();
            break;
        default:
            return true;
    }
});

function getAwards(uid) {
    socket.emit(API.GET_GRANTS, {
        uid: uid
    }, function (error, result) {
        _grants = _grants.slice();
        _grants[uid] = result;
        EditUserStore.emitChange();
    });
}

module.exports = EditUserStore;
