import React from 'react';
import {connect} from 'react-redux';

import {removeUserForGrant} from '../../action/actions';
import UserSelectListItem from '../display/user-select-list-item';
import {getUsersForGrant} from '../../model/selector/selectors';

class UserSelectList extends React.Component {
    render() {
        let items;

        if (this.props.usersForGrant.length === 0) {
            items = <div className="alert alert-info" role="alert">
                0 users are selected for rewarding
            </div>;
        } else {
            items = this.props.usersForGrant.map(user => {
                return <UserSelectListItem
                    itemWillDelete={() => this.props.deleteUser(user)}
                    key={user.username}
                    user={user}/>;
            });
        }

        return (
            <div className="user-select-list">
                {items}
            </div>
        );
    }
}

UserSelectList.propTypes = {
    deleteUser   : React.PropTypes.func,
    usersForGrant: React.PropTypes.array
};

export default connect(
    state => {
        return {
            usersForGrant: getUsersForGrant(state)
        };
    },
    dispatch => {
        return {
            deleteUser: user => dispatch(removeUserForGrant(user))
        };
    }
)(UserSelectList);
