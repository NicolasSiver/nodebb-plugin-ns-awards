var React         = require('react'),
    PromptView    = require('./PromptView.react'),
    Autocomplete  = require('./Autocomplete.react'),
    PanelControls = require('./PanelControls.react'),
    Actions       = require('../actions/Actions');

var UserAwardManager = React.createClass({

    getInitialState: function () {
        return {
            open: false
        };
    },

    render: function () {
        var panelContent;
        if (this.state.open) {
            panelContent = <div>
                <Autocomplete />

                <PanelControls
                    labelSuccess="Grant!"
                    valid={this._isValid}/>
            </div>;
        } else {
            panelContent = <PromptView
                label="Give Award..."
                hint="Overview user's awards and grant him or her a new one. Don't forget to specify reason."
                labelDidClick={this._promptViewDidClick}/>;
        }

        return (
            <div className="panel panel-default">
                <div className="panel-body">
                    {panelContent}
                </div>
            </div>
        );
    },

    _isValid: function () {
        return false;
    },

    _promptViewDidClick: function () {
        this.setState({open: true});
    }
});

module.exports = UserAwardManager;