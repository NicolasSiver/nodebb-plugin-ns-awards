import debounce from 'lodash.debounce';
import React from 'react';
import {connect} from 'react-redux';

import * as Constants from '../../model/constants';

import {
    addUserForGrant,
    highlightUser,
    pickAward,
    resetUsername,
    rewardUsers,
    searchUser,
    setGrantReason,
    setUsername,
    setUserSearchFocus
} from '../../action/actions';
import AwardPicker from '../display/award-picker';
import isAwardGrantValid from '../../model/selector/is-award-grant-valid';
import PanelControls from '../display/panel-controls';
import {
    getAwards,
    getAwardForGrant,
    getGrantReason,
    getUserHighlight,
    getUsername,
    getUsers,
    isUserSearchFocused
} from '../../model/selector/selectors';
import UserSearch from '../display/user-search';
import SectionLoading from '../display/section-loading';
import UserSelectList from './user-select-list';

class GrantingView extends React.Component {
    render() {
        if (this.props.awards === null) {
            return <SectionLoading/>;
        }

        return (
            <div className="granting">
                <div className="granting__awards">
                    <h5>Pick Award:</h5>
                    <AwardPicker
                        awardForGrant={this.props.awardForGrant}
                        awards={this.props.awards}
                        itemDidSelect={award => this.props.selectAward(award)}/>
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
                        disableCancel={true}
                        labelSuccess="Grant"
                        valid={this.props.awardGrantValid}
                        successDidClick={() => this.props.grant()}/>
                </div>
            </div>
        );
    }
}

GrantingView.propTypes = {
    awardForGrant    : React.PropTypes.object,
    awardGrantValid  : React.PropTypes.bool,
    awards           : React.PropTypes.array,
    changeUsername   : React.PropTypes.func,
    grant            : React.PropTypes.func,
    grantReason      : React.PropTypes.string,
    highlight        : React.PropTypes.func,
    resetUsername    : React.PropTypes.func,
    select           : React.PropTypes.func,
    selectAward      : React.PropTypes.func,
    setFocus         : React.PropTypes.func,
    setReason        : React.PropTypes.func,
    userHighlight    : React.PropTypes.object,
    username         : React.PropTypes.string,
    users            : React.PropTypes.array,
    userSearchFocused: React.PropTypes.bool
};

export default connect(
    () => {
        let selectAwardGrantValid = isAwardGrantValid();
        return state => {
            return {
                awardForGrant    : getAwardForGrant(state),
                awardGrantValid  : selectAwardGrantValid(state),
                awards           : getAwards(state),
                grantReason      : getGrantReason(state),
                userHighlight    : getUserHighlight(state),
                username         : getUsername(state),
                users            : getUsers(state),
                userSearchFocused: isUserSearchFocused(state)
            };
        };
    },
    dispatch => {
        let debounceSearch = debounce(() => dispatch(searchUser()), Constants.SEARCH_DEBOUNCE_DELAY);
        return {
            changeUsername: text => {
                dispatch(setUsername(text));
                debounceSearch();
            },
            grant         : () => dispatch(rewardUsers()),
            highlight     : direction => dispatch(highlightUser(direction)),
            resetUsername : () => dispatch(resetUsername()),
            select        : user => dispatch(addUserForGrant(user)),
            selectAward   : award => dispatch(pickAward(award)),
            setFocus      : state => dispatch(setUserSearchFocus(state)),
            setReason     : value => dispatch(setGrantReason(value))
        };
    }
)(GrantingView);
