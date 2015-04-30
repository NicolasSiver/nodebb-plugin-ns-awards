var AppDispatcher = require('../dispatcher/AppDispatcher'),
    EventEmitter  = require('events').EventEmitter,
    assign        = require('react/lib/Object.assign'),
    Constants     = require('../Constants'),
    socket        = require('socket'),

    CHANGE_EVENT  = 'change',
    API           = {
        CREATE_AWARD: 'plugins.ns-awards.createAward'
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
            }, function (error, payload) {
                console.log(payload);
                //Optimistic Award Create
                //_awards.push(payload);
                AwardsStore.emitChange();
            });
            break;
        default:
            return true;
    }
});

module.exports = AwardsStore;