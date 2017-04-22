import PropTypes from 'prop-types';
import React from 'react';

export default class PromptView extends React.Component {

    render() {
        return (
            <div className="media">
                <div className="media-body">
                    <p>{this.props.hint}</p>

                    <button
                        className="btn btn-primary"
                        onClick={this.props.labelDidClick}
                        type="button">{this.props.label}
                    </button>
                </div>
            </div>
        );
    }
}

PromptView.propTypes = {
    hint         : PropTypes.string,
    label        : PropTypes.string.isRequired,
    labelDidClick: PropTypes.func.isRequired
};
