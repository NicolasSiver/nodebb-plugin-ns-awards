import React from 'react';

export default class RoundButton extends React.Component {
    render() {
        return (
            <div className="round-button fa-stack">
                <i className="round-button__background fa fa-circle fa-stack-2x"></i>
                <i className={`round-button__icon fa ${this.props.icon} fa-stack-1x fa-inverse`}></i>
            </div>
        );
    }
}

RoundButton.PropTypes = {
    icon: React.PropTypes.string.isRequired
};
