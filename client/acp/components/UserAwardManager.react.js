var React            = require('react'),
    LinkedStateMixin = require('react/lib/LinkedStateMixin'),
    PromptView       = require('./PromptView.react'),
    Autocomplete     = require('./Autocomplete.react'),
    AwardsStore      = require('../stores/AwardsStore'),
    SearchUsersStore = require('../stores/SearchUsersStore'),
    PanelControls    = require('./PanelControls.react'),
    assign           = require('react/lib/Object.assign'),
    Actions          = require('../actions/Actions'),
    Constants        = require('../Constants');

function getAwards() {
    return {
        awards: AwardsStore.getAwards()
    };
}

function getUsers() {
    return {
        searchUsers: SearchUsersStore.getResult(),
        users      : SearchUsersStore.getSelected()
    };
}

var UserAwardManager = React.createClass({
    mixins: [LinkedStateMixin],

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
            open   : false,
            awardId: 0,
            reason : ''
        }, getAwards(), getUsers());
    },

    render: function () {
        var panelContent, selectedUsers, self = this;

        function renderAwardOption(award, index, awards) {
            return <option value={award.aid} key={award.aid} label={award.name}>{award.name}</option>;
        }

        function renderSelectedUser(user, index, users) {
            return (
                <div className="row" key={user.uid}>
                    <div className="col-md-8">
                        <div className="media">
                            <div className="media-left">
                                <img src={user.picture}/>
                            </div>
                            <div className="media-body">
                                <dl>
                                    <dt>{user.username}</dt>
                                    <dd>posts: {user.postcount}, reputation: {user.reputation}</dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="pull-right"><i
                            className="fa fa-times icon-danger icon-control"
                            onClick={self._removeSelectedUser.bind(self, index, user.uid)}></i></div>
                    </div>
                </div>
            );
        }

        if (this.state.open) {

            if (this.state.users.length) {
                selectedUsers = <div className="selected-users">{this.state.users.map(renderSelectedUser)}</div>;
            }

            panelContent = <div className="grant-award-form">
                <Autocomplete
                    placeholder="Enter username"
                    valueDidChange={this._usernameDidChange}
                    optionDidSelect={this._userDidSelect}
                    options={this.state.searchUsers.map(function(user){
                        return {label: user.username, value: user.uid};
                    })}/>

                {selectedUsers}

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

                <PanelControls
                    labelSuccess="Grant!"
                    cancelDidClick={this._cancel}
                    successDidClick={this._save}
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
        return this.state.users.length && this.state.awardId && this.state.reason;
    },

    _promptViewDidClick: function () {
        this.setState({open: true});
    },

    _removeSelectedUser: function (index, uid) {
        Actions.unpickUserFromSearch(index, uid);
    },

    _save: function () {
        Actions.awardUsers(this.state.users.slice(), this.state.awardId, this.state.reason);
        this._cancel();
    },

    _usernameDidChange: function (username) {
        Actions.searchUser(username);
    },

    _userDidSelect: function (userMeta) {
        Actions.pickUserFromSearch(userMeta.index, userMeta.id);
    }
});

module.exports = UserAwardManager;