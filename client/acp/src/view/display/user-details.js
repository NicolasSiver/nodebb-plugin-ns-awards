import PropTypes from 'prop-types';
import React from 'react';

export default class UserDetails extends React.Component {

    render() {
        let {username, lastonlineISO, postcount, reputation, joindateISO} = this.props.user;
        let {makeNumberHumanReadable} = window.utils;
        let {timeago} = window.$;

        return (
            <div className="user-details">
                <div className="user-details__name">{username}</div>
                <div className="user-details__item">posts: {makeNumberHumanReadable(postcount)}</div>
                <div className="user-details__item">reputation: {makeNumberHumanReadable(reputation)}</div>
                <div className="user-details__item">joined: {timeago(Date.parse(joindateISO))}</div>
                <div className="user-details__item">last online: {timeago(Date.parse(lastonlineISO))}</div>
            </div>
        );
    }

}

UserDetails.propTypes = {
    user: PropTypes.object.isRequired
};
