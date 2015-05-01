var React            = require('react'),
    PromptView       = require('./PromptView.react'),
    Autocomplete     = require('./Autocomplete.react'),
    AwardsStore      = require('../stores/AwardsStore'),
    SearchUsersStore = require('../stores/SearchUsersStore'),
    PanelControls    = require('./PanelControls.react'),
    assign           = require('react/lib/Object.assign'),
    Actions          = require('../actions/Actions');

function getAwards() {
    return {
        awards: AwardsStore.getAwards()
    };
}

function getUsers() {
    return {
        users: SearchUsersStore.getResult()
    };
}

var UserAwardManager = React.createClass({
    componentDidMount: function () {
        AwardsStore.addChangeListener(this.awardsDidChange);
        SearchUsersStore.addChangeListener(this.usersDidFind);
    },

    componentWillUnmount: function () {
        AwardsStore.removeChangeListener(this.awardsDidChange);
        SearchUsersStore.removeChangeListener(this.usersDidFind);
    },

    awardsDidChange: function () {
        this.setState(getAwards());
    },

    usersDidFind: function () {
        this.setState(getUsers());
    },

    getInitialState: function () {
        return assign({
            open: false
        }, getAwards(), getUsers());
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
                    valueDidChange={this._usernameDidChange}
                    optionDidSelect={this._userDidSelect}
                    options={this.state.users.map(function(user){
                        return {label: user.username, value: user.uid};
                    })}/>

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
    },

    _usernameDidChange: function (username) {
        Actions.searchUser(username);
    },

    _userDidSelect: function (userMeta) {
        console.log(userMeta);
    }
});

module.exports = UserAwardManager;