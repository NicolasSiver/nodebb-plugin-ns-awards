import debounce from 'lodash.debounce';
import React from 'react';
import {connect} from 'react-redux';

import {
    addUserForGrant,
    highlightUser,
    resetUsername,
    searchUser,
    setGrantReason,
    setUsername,
    setUserSearchFocus
} from '../../action/actions';
import AwardPicker from './award-picker';
import PanelControls from '../display/panel-controls';
import {
    getGrantReason,
    getUserHighlight,
    getUsername,
    getUsers,
    isUserSearchFocused
} from '../../model/selector/selectors';
import UserSearch from '../display/user-search';
import UserSelectList from './user-select-list';

class GrantingView extends React.Component {
    render() {
        return (
            <div className="granting">
                <div className="granting__awards">
                    <h5>Pick Award:</h5>
                    <AwardPicker/>
                </div>
                <div className="granting__details">
                    <h5>Select Users:</h5>
                    <UserSearch
                        focus={this.props.userSearchFocused}
                        focusDidChange={state => this.props.setFocus(state)}
                        highlight={this.props.userHighlight}
                        optionDidSelect={option => this.props.select(option)}
                        options={this.props.users}
                        placeholder="Enter Username"
                        selectionWillChange={direction => this.props.highlight(direction)}
                        value={this.props.username}
                        valueDidChange={text => this.props.changeUsername(text)}
                        valueWillReset={() => this.props.resetUsername()}/>
                    <UserSelectList/>
                    <div className="form-group granting__reason">
                        <label htmlFor="grantReason">Reason</label>
                        <textarea
                            className="form-control"
                            rows="4"
                            id="grantReason"
                            placeholder="Enter the reason. Reason text is public and can not be edited."
                            onChange={e => this.props.setReason(e.target.value)}
                            value={this.props.grantReason || ''}/>
                    </div>
                    <PanelControls
                        labelCancel="Clear"
                        labelSuccess="Grant"
                        valid={false}
                        cancelDidClick={() => undefined}
                        successDidClick={() => undefined}/>
                </div>
            </div>
        );
    }
}

GrantingView.propTypes = {
    changeUsername   : React.PropTypes.func,
    grantReason      : React.PropTypes.string,
    highlight        : React.PropTypes.func,
    resetUsername    : React.PropTypes.func,
    select           : React.PropTypes.func,
    setFocus         : React.PropTypes.func,
    setReason        : React.PropTypes.func,
    userHighlight    : React.PropTypes.object,
    username         : React.PropTypes.string,
    users            : React.PropTypes.array,
    userSearchFocused: React.PropTypes.bool
};

export default connect(
    state => {
        return {
            grantReason      : getGrantReason(state),
            userHighlight    : getUserHighlight(state),
            username         : getUsername(state),
            users            : getUsers(state),
            userSearchFocused: isUserSearchFocused(state)
        };
    },
    dispatch => {
        let debounceSearch = debounce(() => dispatch(searchUser()), 400);
        return {
            changeUsername: text => {
                dispatch(setUsername(text));
                debounceSearch();
            },
            highlight     : direction => dispatch(highlightUser(direction)),
            resetUsername : () => dispatch(resetUsername()),
            select        : user => dispatch(addUserForGrant(user)),
            setFocus      : state => dispatch(setUserSearchFocus(state)),
            setReason     : value => dispatch(setGrantReason(value))
        };
    }
)(GrantingView);
