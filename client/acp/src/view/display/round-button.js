import classNames from 'classnames';
import React from 'react';

export default class RoundButton extends React.Component {
    render() {
        let backgroundClass = classNames('round-button__background', 'fa', 'fa-circle', 'fa-stack-2x', {
            'round-button__background--active' : this.props.role === 'active',
            'round-button__background--danger' : this.props.role === 'danger',
            'round-button__background--success': this.props.role === 'success'
        });
        return (
            <div className="round-button fa-stack">
                <i className={backgroundClass}></i>
                <i className={`round-button__icon fa ${this.props.icon} fa-stack-1x fa-inverse`}></i>
            </div>
        );
    }
}

RoundButton.PropTypes = {
    icon: React.PropTypes.string.isRequired,
    role: React.PropTypes.string.isRequired
};
