var React          = require('react'),
    ReactPropTypes = React.PropTypes,
    SettingsStore  = require('../stores/SettingsStore'),
    Actions        = require('../actions/Actions');

function getSettingsState() {
    return SettingsStore.getSettings();
}

var Settings = React.createClass({
    componentDidMount: function () {
        SettingsStore.addChangeListener(this.settingsDidChange);
        Actions.getSettings();
    },

    componentWillUnmount: function () {
        SettingsStore.removeChangeListener(this.settingsDidChange);
    },

    getInitialState: function () {
        return getSettingsState();
    },

    render: function () {
        //Don't show Settings until we will get something from the NodeBB
        //if (Object.keys(this.state).length == 0) {
        //    return (
        //        <div />
        //    );
        //}
        return (
            <div className="panel panel-default">
                <div className="panel-heading">Settings</div>
                <div className="panel-body">
                    No Settings
                </div>
            </div>
        );
    },

    settingsDidChange: function () {
        this.setState(getSettingsState());
    }
});

module.exports = Settings;