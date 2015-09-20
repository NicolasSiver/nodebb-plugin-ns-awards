var AppDispatcher      = require('../dispatcher/AppDispatcher'),
    EventEmitter       = require('events').EventEmitter,
    assign             = require('react/lib/Object.assign'),
    Constants          = require('../Constants'),
    socket             = require('socket'),

    CHANGE_EVENT       = 'change',
    API                = {
        SEARCH_USER: 'plugins.ns-awards.searchUser'
    },
    _result            = [],
    _resultSelectIndex = 0,
    _selected          = [];

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

    getResultSelectIndex: function () {
        return _resultSelectIndex;
    },

    getSelected: function () {
        return _selected;
    },

    removeChangeListener: function (listener) {
        this.removeListener(CHANGE_EVENT, listener);
    }
});

AppDispatcher.register(function (action) {
    switch (action.actionType) {
        case Constants.EVENT_SEARCH_USER:
            socket.emit(API.SEARCH_USER, {
                username: action.request
            }, function (error, searchResult) {
                //Search Result will have signature: {matchCount: 1, pagination: PaginationMeta, pageCount: 1, timing: "0.01", users: Array[N]}
                _result = searchResult.users;
                // Adjust latest selection
                if (_resultSelectIndex >= _result.length) {
                    _resultSelectIndex = _result.length - 1;
                }
                SearchUsersStore.emitChange();
            });
            break;
        case Constants.EVENT_OFFSET_USER_FROM_SEARCH_ON:
            _resultSelectIndex += action.offset;
            if (_resultSelectIndex < 0) {
                if (_result.length > 0) {
                    _resultSelectIndex = _result.length - 1;
                } else {
                    _resultSelectIndex = 0;
                }
            } else if (_resultSelectIndex >= _result.length) {
                _resultSelectIndex = 0;
            }
            SearchUsersStore.emitChange();
            break;
        case Constants.EVENT_PANEL_CANCEL:
            if (action.panel === Constants.PANEL_GRANT_AWARD) {
                clear();
            }
            break;
        case Constants.EVENT_PICK_USER_FROM_SEARCH:
            pickUserAt(_resultSelectIndex);
            break;
        case Constants.EVENT_PICK_USER_FROM_SEARCH_AT:
            pickUserAt(action.index);
            break;
        case Constants.EVENT_UNPICK_USER_FROM_SEARCH:
            _selected.splice(action.index, 1);
            SearchUsersStore.emitChange();
            break;
        case Constants.EVENT_AWARD_USERS:
            clear();
            break;
        default:
            return true;
    }
});

function clear() {
    _result.length = 0;
    _resultSelectIndex = 0;
    _selected.length = 0;
    SearchUsersStore.emitChange();
}

function pickUserAt(index) {
    // Validation
    if (index < 0 || index >= _result.length) {
        console.error('Index for picking User is invalid, something went wrong in the system...');
        return;
    }

    _selected.push(_result[index]);
    _result.length = 0;
    _resultSelectIndex = 0;
    SearchUsersStore.emitChange();
}

module.exports = SearchUsersStore;
