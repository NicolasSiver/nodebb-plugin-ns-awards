import PropTypes from 'prop-types';
import React from 'react';

import Avatar from './avatar';
import RoundButton from './round-button';
import UserDetails from './user-details';

export default class UserSelectListItem extends React.Component {
    render() {
        return (
            <div className="user-select-list-item">
                <Avatar size="big" user={this.props.user}/>
                <div className="user-select-list-item__details">
                    <UserDetails user={this.props.user}/>
                </div>
                <RoundButton
                    icon="fa-times"
                    animate={true}
                    role="danger"
                    clickListener={() => this.props.itemWillDelete()}/>
            </div>
        );
    }
}

UserSelectListItem.propTypes = {
    itemWillDelete: PropTypes.func.isRequired,
    user          : PropTypes.object.isRequired
};
