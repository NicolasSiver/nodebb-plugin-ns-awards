var React         = require('react'),
    PromptView    = require('./PromptView.react'),
    Autocomplete  = require('./Autocomplete.react'),
    AwardsStore   = require('../stores/AwardsStore'),
    PanelControls = require('./PanelControls.react'),
    assign        = require('react/lib/Object.assign'),
    Actions       = require('../actions/Actions');

function getAwards() {
    return {
        awards: AwardsStore.getAwards()
    };
}

var UserAwardManager = React.createClass({
    componentDidMount: function () {
        AwardsStore.addChangeListener(this.awardsDidChange);
    },

    componentWillUnmount: function () {
        AwardsStore.removeChangeListener(this.awardsDidChange);
    },

    awardsDidChange: function () {
        this.setState(getAwards());
    },

    getInitialState: function () {
        return assign({
            open: false
        }, getAwards());
    },

    render: function () {
        var panelContent;

        function renderAwardOption(award, index, awards) {
            return <option value={award.aid} key={award.aid} label={award.name}>{award.name}</option>;
        };

        if (this.state.open) {
            panelContent = <div className="grant-award-form">
                <Autocomplete
                    placeholder="Enter username"
                    options={['Test1', 'Test2', 'Sex1', 'Sex2']}/>

                <div className="form-group">
                    <label htmlFor="allAwards">Awards</label>
                    <select className="form-control" defaultValue="0" id="allAwards">
                        <option value="0" disabled>Please select Award</option>
                        {this.state.awards.map(renderAwardOption)}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="awardReason">Reason</label>
                    <textarea className="form-control" rows="4" id="awardReason"
                              placeholder="Enter reason, what accomplishments user have achieved to have such award"></textarea>
                </div>

                <PanelControls
                    labelSuccess="Grant!"
                    cancelDidClick={this._cancel}
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

    _cancel: function () {
        this.replaceState(this.getInitialState());
    },

    _isValid: function () {
        return false;
    },

    _promptViewDidClick: function () {
        this.setState({open: true});
    }
});

module.exports = UserAwardManager;