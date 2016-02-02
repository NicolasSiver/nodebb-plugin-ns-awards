var Actions          = require('../actions/Actions'),
    assign           = require('react/lib/Object.assign'),
    Autocomplete     = require('./Autocomplete.react'),
    EditUserStore    = require('../stores/EditUserStore'),
    React            = require('react'),
    SearchUsersStore = require('../stores/SearchUsersStore'),
    UserItemView     = require('./UserItemView.react');

function getSearchResult() {
    return {
        searchUsers    : SearchUsersStore.getResult(),
        searchSelection: SearchUsersStore.getSelectIndex()
    };
}

function getUsers() {
    return {
        users: EditUserStore.getUsers().map(function (user) {
            user.awards = EditUserStore.getUserAwards(user.uid);
            user.rewardEdit = EditUserStore.getUserEdit(user.uid);
            return user;
        })
    }
}

var EditUser = React.createClass({
    componentDidMount: function () {
        EditUserStore.addChangeListener(this.usersDidChange);
        SearchUsersStore.addChangeListener(this.searchDidChange);
    },

    componentWillUnmount: function () {
        EditUserStore.removeChangeListener(this.usersDidChange);
        SearchUsersStore.removeChangeListener(this.searchDidChange);
    },

    getInitialState: function () {
        return assign({}, getSearchResult(), getUsers());
    },

    render: function () {
        var prompt;
        if (this.state.users.length == 0) {
            prompt = <div className="no-users">
                Use search box to find users. You can select several users to grant awards and to edit them.
            </div>;
        }
        return (
            <div className="edit-users">
                <Autocomplete
                    placeholder="Enter Username"
                    valueDidChange={Actions.searchUser}
                    optionDidSelect={Actions.pickUserFromSearch}
                    optionWillSelectWithOffset={Actions.offsetUserFromSearchOn}
                    optionWillSelectAt={Actions.pickUserFromSearchAt}
                    optionsShouldClear={Actions.clearUserSearch}
                    optionSelectedIndex={this.state.searchSelection}
                    options={this.state.searchUsers.map(function(user){
                        return {label: user.username, value: user.uid};
                    })}/>

                <div className="users-list">
                    {prompt}
                    {this.state.users.map(function (user) {
                        return <UserItemView
                            key={user.uid}
                            user={user}/>;
                    })}
                </div>
            </div>
        );
    },

    searchDidChange: function () {
        this.setState(getSearchResult());
    },

    usersDidChange: function () {
        this.setState(getUsers());
    }
});

module.exports = EditUser;
