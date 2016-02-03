var AppDispatcher = require('../dispatcher/AppDispatcher'),
    assign        = require('react/lib/Object.assign'),
    Constants     = require('../Constants'),
    EventEmitter  = require('events').EventEmitter,
    objectAssign  = require('object-assign'),
    socket        = require('socket');

var CHANGE_EVENT     = 'change',
    API              = {
        AWARD_USERS : 'plugins.ns-awards.awardUsers',
        DELETE_GRANT: 'plugins.ns-awards.deleteGrant',
        EDIT_GRANT  : 'plugins.ns-awards.editGrant',
        GET_GRANTS  : 'plugins.ns-awards.getGrantsWithAwards'
    },

    _grants          = [],
    _edits           = [],
    _users           = [],
    _rewardReason    = '',
    _selectedAwardId = 0;

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

    getUserEdit: function (uid) {
        return _edits[uid];
    },

    getRewardReason: function () {
        return _rewardReason;
    },

    getSelectedAwardId: function () {
        return _selectedAwardId;
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
        case Constants.EVENT_REWARD_REASON_DID_CHANGE:
            _rewardReason = action.payload;
            EditUserStore.emitChange();
            break;
        case Constants.EVENT_REWARD_REASON_DID_EDIT:
            _edits = _edits.slice();
            var edit = _edits[action.payload.user.uid];
            edit = objectAssign({}, edit);
            edit.reason = action.payload.text;
            _edits[action.payload.user.uid] = edit;
            EditUserStore.emitChange();
            break;
        case Constants.EVENT_REWARD_WILL_EDIT:
            _edits = _edits.slice();
            _edits[action.payload.user.uid] = objectAssign({}, action.payload.grant);
            EditUserStore.emitChange();
            break;
        case Constants.EVENT_REWARD_EDIT_WILL_CANCEL:
            _edits = _edits.slice();
            _edits[action.payload.user.uid] = undefined;
            EditUserStore.emitChange();
            break;
        case Constants.EVENT_USER_DID_SELECT:
            _users = _users.concat(action.payload.user);
            getAwards(action.payload.user.uid);
            break;
        case Constants.EVENT_AWARD_DID_SELECT:
            _selectedAwardId = action.payload.awardId;
            EditUserStore.emitChange();
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
        case Constants.EVENT_CLEAR_REWARD_DETAILS:
            _selectedAwardId = 0;
            _rewardReason = '';
            EditUserStore.emitChange();
            break;
        case Constants.EVENT_REWARD_USERS:
            socket.emit(API.AWARD_USERS, {
                users : _users,
                award : _selectedAwardId,
                reason: _rewardReason
            }, function (error, award) {
                if (error) {
                    return console.error(error);
                }

                _selectedAwardId = 0;
                _rewardReason = '';
                EditUserStore.emitChange();

                // Update awards for rewarded users
                _users.forEach(function (user) {
                    getAwards(user.uid);
                });
            });
            break;
        case Constants.EVENT_GRANT_WILL_DELETE:
            socket.emit(API.DELETE_GRANT, {
                id: action.payload.grant.gid
            }, function (error) {
                if (error) {
                    return console.error(error);
                }

                _edits = _edits.slice();
                _edits[action.payload.user.uid] = undefined;
                EditUserStore.emitChange();
                getAwards(action.payload.user.uid);
            });
            break;
        case Constants.EVENT_GRANT_WILL_SAVE:
            socket.emit(API.EDIT_GRANT, {
                gid   : action.payload.grant.gid,
                reason: action.payload.grant.reason
            }, function (error) {
                if (error) {
                    return console.error(error);
                }

                _edits = _edits.slice();
                _edits[action.payload.user.uid] = undefined;
                EditUserStore.emitChange();
                getAwards(action.payload.user.uid);
            });
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
