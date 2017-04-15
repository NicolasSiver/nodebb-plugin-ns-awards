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
    cancelDidClick : React.PropTypes.func,
    disableCancel  : React.PropTypes.bool,
    labelCancel    : React.PropTypes.string,
    labelSuccess   : React.PropTypes.string,
    successDidClick: React.PropTypes.func,
    valid          : React.PropTypes.bool
};
