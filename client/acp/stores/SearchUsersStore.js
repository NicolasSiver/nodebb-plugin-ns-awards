var Actions       = require('../actions/Actions'),
    AppDispatcher = require('../dispatcher/AppDispatcher'),
    EventEmitter  = require('events').EventEmitter,
    assign        = require('react/lib/Object.assign'),
    Constants     = require('../Constants'),
    socket        = require('socket'),

    CHANGE_EVENT  = 'change',
    API           = {
        SEARCH_USER: 'plugins.ns-awards.searchUser'
    },
    _result       = [],
    _selectIndex  = 0;

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

    getSelectIndex: function () {
        return _selectIndex;
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
                if (_selectIndex >= _result.length) {
                    _selectIndex = _result.length - 1;
                }
                SearchUsersStore.emitChange();
            });
            break;
        case Constants.EVENT_CLEAR_SEARCH_RESULT:
            clear();
            break;
        case Constants.EVENT_OFFSET_USER_FROM_SEARCH_ON:
            _selectIndex += action.offset;
            if (_selectIndex < 0) {
                if (_result.length > 0) {
                    _selectIndex = _result.length - 1;
                } else {
                    _selectIndex = 0;
                }
            } else if (_selectIndex >= _result.length) {
                _selectIndex = 0;
            }
            SearchUsersStore.emitChange();
            break;
        case Constants.EVENT_PICK_USER_FROM_SEARCH:
            pickUserAt(_selectIndex);
            break;
        case Constants.EVENT_PICK_USER_FROM_SEARCH_AT:
            pickUserAt(action.index);
            break;
        default:
            return true;
    }
});

function clear() {
    _result.length = 0;
    _selectIndex = 0;
    SearchUsersStore.emitChange();
}

function pickUserAt(index) {
    // Validation
    if (index < 0 || index >= _result.length) {
        console.error('Index for picking User is invalid, something went wrong in the system...');
        return;
    }

    // Use delay, to omit waitFor
    setTimeout(Actions.selectUser, 0, _result[index]);
    clear();
}

module.exports = SearchUsersStore;
