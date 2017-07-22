import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

export default class Avatar extends React.Component {

    render() {
        let avatarClass = classNames('aws-avatar', 'aws-avatar--' + this.props.size);
        let iconClass = classNames('aws-avatar__icon', 'aws-avatar__icon--' + this.props.size);
        let content;

        if (this.props.user.picture) {
            content = <img className="aws-avatar__image img-responsive" src={this.props.user.picture}/>;
        } else {
            content = <div className={iconClass} style={{backgroundColor: this.props.user['icon:bgColor']}}>
                {this.props.user['icon:text']}
            </div>;
        }

        return (
            <div className={avatarClass}>
                {content}
            </div>
        );
    }

}

Avatar.defaultProps = {
    size: 'normal'
};

Avatar.propTypes = {
    size: PropTypes.string,
    user: PropTypes.object.isRequired
};
