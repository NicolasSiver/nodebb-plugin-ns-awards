import React from 'react';

export default class Avatar extends React.Component {

    render() {
        let content;

        if (this.props.user.picture) {
            content = <img className="aws-avatar__image img-responsive" src={this.props.user.picture}/>;
        } else {
            content = <div className="aws-avatar__icon" style={{backgroundColor: this.props.user['icon:bgColor']}}>
                {this.props.user['icon:text']}
            </div>;
        }

        return (
            <div className="aws-avatar">
                {content}
            </div>
        );
    }

}

Avatar.propTypes = {
    user: React.PropTypes.object.isRequired
};
