var AppDispatcher = require('../dispatcher/AppDispatcher'),
    EventEmitter  = require('events').EventEmitter,
    assign        = require('react/lib/Object.assign'),
    Constants     = require('../Constants'),

    CHANGE_EVENT  = 'change',
    _data         = {
        current: Constants.SECTION_AWARDS,
        list   : [
            {label: 'Awards', icon: 'fa-trophy', id: Constants.SECTION_AWARDS},
            {label: 'Manage', id: Constants.SECTION_MANAGE},
            {label: 'Settings', id: Constants.SECTION_SETTINGS},
            {label: 'Donate', id: Constants.SECTION_DONATION}
        ]
    };

var NavigationStore = assign({}, EventEmitter.prototype, {
    addChangeListener: function (listener) {
        this.on(CHANGE_EVENT, listener);
    },

    emitChange: function () {
        this.emit(CHANGE_EVENT);
    },

    getSectionsMeta: function () {
        return _data;
    },

    removeChangeListener: function (listener) {
        this.removeListener(CHANGE_EVENT, listener);
    }
});

AppDispatcher.register(function (action) {
    switch (action.actionType) {
        case Constants.EVENT_SECTION_WILL_SELECT:
            _data.current = action.sectionId;
            NavigationStore.emitChange();
            break;
        default:
            return true;
    }
});

module.exports = NavigationStore;