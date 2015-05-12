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
        var footer;

        if (this.state.dirty) {
            footer = <div>
                <div className="alert alert-warning" role="alert">NodeBB: Restart will be needed</div>
                <div className="pull-right panel-controls">
                    <button
                        className="btn btn-success"
                        onClick={this._saveSettings}
                        type="button">Save Settings
                    </button>
                </div>
            </div>;
        }

        return (
            <div className="panel panel-default">
                <div className="panel-heading">Settings</div>
                <div className="panel-body">
                    <div className="checkbox">
                        <label>
                            <input
                                type="checkbox"
                                checked={this.state.renderTopic}
                                onChange={this._renderTopicDidChange}/> Topic View: render awards
                        </label>
                    </div>
                    <div className="form-group">
                        <label htmlFor="topicLimit">Max awards</label>
                        <input
                            type="text" className="form-control" id="topicLimit" placeholder="Enter count"
                            disabled={this.state.renderTopic ? '' : 'disabled'}
                            value={this.state.maxAwardsTopic}
                            onChange={this._maxAwardsTopicDidChange}/>
                    </div>
                    {footer}
                </div>
            </div>
        );
    },

    settingsDidChange: function () {
        this.replaceState(getSettingsState());
    },

    _maxAwardsTopicDidChange: function (e) {
        this.setState({
            maxAwardsTopic: parseInt(e.currentTarget.value, 10),
            dirty         : true
        });
    },

    _renderTopicDidChange: function (e) {
        this.setState({
            renderTopic: e.currentTarget.checked,
            dirty      : true
        })
    },

    _saveSettings: function (e) {
        Actions.saveSettings(this.state);
    }
});

module.exports = Settings;