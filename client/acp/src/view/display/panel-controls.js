import PropTypes from 'prop-types';
import React from 'react';

export default class PanelControls extends React.Component {
    render() {
        let cancelButton = this.props.disableCancel ? null : (
            <button
                className="btn btn-danger"
                onClick={this.props.cancelDidClick}
                type="button">{this.props.labelCancel}
            </button>
        );

        return (
            <div className="pull-right panel-controls">
                {cancelButton}
                <button
                    className="btn btn-primary"
                    onClick={this.props.successDidClick}
                    disabled={this.props.valid ? '' : 'disabled'}
                    type="button">{this.props.labelSuccess}
                </button>
            </div>
        );
    }
}

PanelControls.defaultProps = {
    disableCancel: false,
    labelCancel  : 'Cancel',
    labelSuccess : 'OK'
};


PanelControls.propTypes = {
    cancelDidClick : PropTypes.func,
    disableCancel  : PropTypes.bool,
    labelCancel    : PropTypes.string,
    labelSuccess   : PropTypes.string,
    successDidClick: PropTypes.func,
    valid          : PropTypes.bool
};
