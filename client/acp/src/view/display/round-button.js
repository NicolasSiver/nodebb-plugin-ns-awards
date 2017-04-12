import classNames from 'classnames';
import React from 'react';

export default class RoundButton extends React.Component {
    render() {
        let buttonClass = classNames('round-button', 'fa-stack', {
            'round-button--animate': this.props.animate
        });
        let backgroundClass = classNames('round-button__background', 'fa', 'fa-circle', 'fa-stack-2x', {
            'round-button__background--active' : this.props.role === 'active',
            'round-button__background--danger' : this.props.role === 'danger',
            'round-button__background--success': this.props.role === 'success'
        });
        return (
            <div className={buttonClass} onClick={() => this.props.clickListener()}>
                <i className={backgroundClass}></i>
                <i className={`round-button__icon fa ${this.props.icon} fa-stack-1x fa-inverse`}></i>
            </div>
        );
    }
}

RoundButton.PropTypes = {
    animate      : React.PropTypes.bool,
    clickListener: React.PropTypes.string.isRequired,
    icon         : React.PropTypes.string.isRequired,
    role         : React.PropTypes.string.isRequired
};
