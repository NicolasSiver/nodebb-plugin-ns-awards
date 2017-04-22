import PropTypes from 'prop-types';
import React from 'react';

import Avatar from './avatar';

export default class Grant extends React.Component {

    render() {
        let {award, createtime, granter, grantee, reason} = this.props.grant;
        let {timeago} = window.$;

        return (
            <div className="grant">
                <div className="grant__header">
                    <div className="grant__preview">
                        <img className="img-responsive grant__image" src={award.url}/>
                    </div>
                    <h5 className="grant__title">{award.name}</h5>
                    <div className="grant__users">
                        <Avatar size="small" user={granter}/>
                        <div className="grant__username">{granter.username}</div>
                        <i className="fa fa-long-arrow-right fa-lg grant__arrow"/>
                        <Avatar size="small" user={grantee}/>
                        <div className="grant__username">{grantee.username}</div>
                    </div>
                </div>
                <div className="grant__reason">
                    {reason}
                    <span className="grant__time">{timeago(createtime)}</span>
                </div>
            </div>
        );
    }

}

Grant.propTypes = {
    grant: PropTypes.object.isRequired
};
