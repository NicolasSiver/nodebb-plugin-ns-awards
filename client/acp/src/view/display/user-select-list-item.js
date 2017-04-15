import React from 'react';

import Avatar from './avatar';
import RoundButton from './round-button';

export default class UserSelectListItem extends React.Component {
    render() {
        return (
            <div className="user-select-list-item">
                <Avatar size="big" user={this.props.user}/>
                <RoundButton
                    icon="fa-times"
                    animate={true}
                    role="danger"
                    clickListener={() => undefined}/>
            </div>
        );
    }
}

UserSelectListItem.propTypes = {
    user: React.PropTypes.object.isRequired
};
