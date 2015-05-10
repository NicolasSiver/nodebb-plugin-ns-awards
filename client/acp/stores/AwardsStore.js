var AppDispatcher = require('../dispatcher/AppDispatcher'),
    EventEmitter  = require('events').EventEmitter,
    assign        = require('react/lib/Object.assign'),
    Constants     = require('../Constants'),
    socket        = require('socket'),

    CHANGE_EVENT  = 'change',
    API           = {
        CREATE_AWARD: 'plugins.ns-awards.createAward',
        DELETE_AWARD: 'plugins.ns-awards.deleteAward',
        EDIT_AWARD  : 'plugins.ns-awards.editAward',
        GET_AWARDS  : 'plugins.ns-awards.getAwards'
    },
    _awards       = [];

var AwardsStore = assign({}, EventEmitter.prototype, {
    addChangeListener: function (listener) {
        this.on(CHANGE_EVENT, listener);
    },

    emitChange: function () {
        this.emit(CHANGE_EVENT);
    },

    getAwards: function () {
        return _awards;
    },

    removeChangeListener: function (listener) {
        this.removeListener(CHANGE_EVENT, listener);
    }
});

AppDispatcher.register(function (action) {
    switch (action.actionType) {
        case Constants.EVENT_CREATE_AWARD:
            socket.emit(API.CREATE_AWARD, {
                name  : action.name,
                desc  : action.desc,
                fileId: action.fileId
            }, function (error, award) {
                //Optimistic Award Create
                _awards.push(award);
                AwardsStore.emitChange();
            });
            break;
        case Constants.EVENT_DELETE_AWARD:
            socket.emit(API.DELETE_AWARD, {
                id: action.id
            }, function (error) {
                //Optimistic Award Delete
                var index = getIndexById(action.id, _awards);
                if (index != -1) {
                    _awards.splice(index, 1);
                    AwardsStore.emitChange();
                }
            });
            break;
        case Constants.EVENT_EDIT_AWARD:
            socket.emit(API.EDIT_AWARD, {
                id   : action.id,
                name : action.name,
                desc : action.desc,
                image: action.file
            }, function (error, award) {
                if (error) {
                    return console.error(error);
                }
                var index = getIndexById(award.aid, _awards);
                if (index != -1) {
                    _awards[index] = award;
                    AwardsStore.emitChange();
                }
            });
            break;
        case Constants.EVENT_GET_ALL_AWARDS:
            socket.emit(API.GET_AWARDS, function (error, awards) {
                _awards = awards;
                AwardsStore.emitChange();
            });
            break;
        default:
            return true;
    }
});

function getIndexById(id, list) {
    var i = 0, len = list.length, item;
    for (i; i < len; ++i) {
        item = list[i];
        if (item.aid === id) {
            return i;
        }
    }
    return -1;
}

module.exports = AwardsStore;