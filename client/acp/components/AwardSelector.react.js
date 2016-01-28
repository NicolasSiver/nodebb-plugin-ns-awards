var Actions       = require('../actions/Actions'),
    assign        = require('react/lib/Object.assign'),
    AwardsStore   = require('../stores/AwardsStore'),
    Constants     = require('../Constants'),
    EditUserStore = require('../stores/EditUserStore'),
    React         = require('react');

function getAwards() {
    return {
        awards: AwardsStore.getAwards()
    };
}

function getUsers() {
    return {
        users  : EditUserStore.getUsers(),
        reason : EditUserStore.getRewardReason(),
        awardId: EditUserStore.getSelectedAwardId()
    }
}

var AwardSelector = React.createClass({
    awardsDidChange: function () {
        this.setState(getAwards());
    },

    awardDidSelect: function (e) {
        Actions.selectAward(e.currentTarget.value);
    },

    componentDidMount: function () {
        AwardsStore.addChangeListener(this.awardsDidChange);
        EditUserStore.addChangeListener(this.usersDidChange);
    },

    componentWillUnmount: function () {
        AwardsStore.removeChangeListener(this.awardsDidChange);
        EditUserStore.removeChangeListener(this.usersDidChange);
    },

    getInitialState: function () {
        return assign({}, getAwards(), getUsers());
    },

    isValid: function () {
        return this.state.awardId && this.state.reason && this.state.users.length;
    },

    reasonDidChange: function(e) {
        Actions.setRewardReason(e.target.value);
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
                            onChange={this.awardDidSelect}>
                        <option value="0" disabled>Please select Award</option>
                        {this.state.awards.map(renderAwardOption)}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="awardReason">Reason</label>
                    <textarea className="form-control" rows="4" id="awardReason"
                              placeholder="Enter reason, what accomplishments user(s) have achieved to have such award"
                              onChange={this.reasonDidChange}
                              value={this.state.reason}></textarea>
                </div>

                <div className="pull-right panel-controls">
                    <button
                        className="btn btn-warning"
                        onClick={Actions.clearRewardDetails}
                        type="button">Clear
                    </button>
                    <button
                        className="btn btn-primary"
                        onClick={Actions.rewardUsers}
                        disabled={this.isValid() ? '' : 'disabled'}
                        type="button">Reward User{this.state.users.length > 1 ? 's' : ''}
                    </button>
                </div>
            </div>
        );
    },

    usersDidChange: function () {
        this.setState(getUsers());
    }
});

module.exports = AwardSelector;
