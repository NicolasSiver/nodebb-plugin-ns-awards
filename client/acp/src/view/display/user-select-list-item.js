import React from 'react';

import Avatar from './avatar';
import RoundButton from './round-button';

export default class UserSelectListItem extends React.Component {
    render() {
        let {username, lastonlineISO, postcount, reputation, joindateISO} = this.props.user;
        let {makeNumberHumanReadable} = window.utils;
        let {timeago} = window.$;

        return (
            <div className="user-select-list-item">
                <Avatar size="big" user={this.props.user}/>
                <div className="user-select-list-item__details">
                    <div>{username}</div>
                    <div className="user-select-list-item__info">posts: {makeNumberHumanReadable(postcount)}</div>
                    <div className="user-select-list-item__info">reputation: {makeNumberHumanReadable(reputation)}</div>
                    <div className="user-select-list-item__info">joined: {timeago(Date.parse(joindateISO))}</div>
                    <div className="user-select-list-item__info">last online: {timeago(Date.parse(lastonlineISO))}</div>
                </div>
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
