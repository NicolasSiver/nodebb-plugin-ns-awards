import debounce from 'lodash.debounce';
import React from 'react';
import {connect} from 'react-redux';

import {resetUsername, searchUser, highlightUser, setUsername} from '../../action/actions';
import {getUserHighlight, getUsername, getUsers} from '../../model/selector/selectors';
import UserSearch from '../display/user-search';

class GrantingView extends React.Component {
    render() {
        return (
            <div className="granting">
                <UserSearch
                    highlight={this.props.userHighlight}
                    options={this.props.users}
                    placeholder="Enter Username"
                    selectionWillChange={direction => this.props.highlight(direction)}
                    value={this.props.username}
                    valueDidChange={text => this.props.changeUsername(text)}
                    valueWillReset={() => this.props.resetUsername()}/>
            </div>
        );
    }
}

export default connect(
    state => {
        return {
            userHighlight: getUserHighlight(state),
            username     : getUsername(state),
            users        : getUsers(state)
        };
    },
    dispatch => {
        let debounceSearch = debounce(() => dispatch(searchUser()), 400);
        return {
            changeUsername: text => {
                dispatch(setUsername(text));
                debounceSearch();
            },
            resetUsername : () => dispatch(resetUsername()),
            highlight     : direction => dispatch(highlightUser(direction))
        };
    }
)(GrantingView);
