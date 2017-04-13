import debounce from 'lodash.debounce';
import React from 'react';
import {connect} from 'react-redux';

import {searchUser, setUsername} from '../../action/actions';
import {getUsername} from '../../model/selector/selectors';
import UserSearch from '../display/user-search';

class GrantingView extends React.Component {
    render() {
        return (
            <div className="granting">
                <UserSearch
                    placeholder="Enter Username"
                    value={this.props.username}
                    valueDidChange={text => this.props.changeUsername(text)}/>
            </div>
        );
    }
}

export default connect(
    state => {
        return {
            username: getUsername(state)
        };
    },
    dispatch => {
        let debounceSearch = debounce(() => dispatch(searchUser()), 400);
        return {
            changeUsername: text => {
                dispatch(setUsername(text));
                debounceSearch();
            }
        };
    }
)(GrantingView);
