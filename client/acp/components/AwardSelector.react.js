var React            = require('react'),
    LinkedStateMixin = require('react/lib/LinkedStateMixin'),
    AwardsStore      = require('../stores/AwardsStore'),
    assign           = require('react/lib/Object.assign'),
    Actions          = require('../actions/Actions'),
    Constants        = require('../Constants');

function getAwards() {
    return {
        awards: AwardsStore.getAwards()
    };
}

var AwardSelector = React.createClass({
    mixins: [LinkedStateMixin],

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
            awardId: 0,
            reason : ''
        }, getAwards());
    },

    render: function () {
        function renderAwardOption(award, index, awards) {
            return <option value={award.aid} key={award.aid} label={award.name}>{award.name}</option>;
        }

        return (
            <div className="grant-award-form">
                <div className="form-group">
                    <label htmlFor="allAwards">Awards</label>
                    <select className="form-control" value={this.state.awardId} id="allAwards"
                            onChange={this._awardDidSelect}>
                        <option value="0" disabled>Please select Award</option>
                        {this.state.awards.map(renderAwardOption)}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="awardReason">Reason</label>
                    <textarea className="form-control" rows="4" id="awardReason"
                              placeholder="Enter reason, what accomplishments user have achieved to have such award"
                              valueLink={this.linkState('reason')}></textarea>
                </div>

                <div className="pull-right panel-controls">
                    <button
                        className="btn btn-danger"
                        onClick={this.props.cancelDidClick}
                        type="button">Clear
                    </button>
                    <button
                        className="btn btn-primary"
                        onClick={this.props.successDidClick}
                        disabled={false ? '' : 'disabled'}
                        type="button">Award User
                    </button>
                </div>
            </div>
        );
    },

    _awardDidSelect: function (e) {
        this.setState({
            awardId: e.currentTarget.value
        });
    },

    _cancel: function () {
        this.replaceState(this.getInitialState());
        Actions.panelCancel(Constants.PANEL_GRANT_AWARD);
    },

    _isValid: function () {
        return this.state.awardId && this.state.reason;
    },

    _mainButtonDidClick: function () {
        this.setState({open: true});
    },

    _save: function () {
        Actions.awardUsers(this.state.users.slice(), this.state.awardId, this.state.reason);
        this._cancel();
    }
});

module.exports = AwardSelector;
