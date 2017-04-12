import React from 'react';

export default class PanelControls extends React.Component {
    render() {
        return (
            <div className="pull-right panel-controls">
                <button
                    className="btn btn-danger"
                    onClick={this.props.cancelDidClick}
                    type="button">{this.props.labelCancel}
                </button>
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
    labelCancel: 'Cancel',
    labelSuccess: 'OK'
};


PanelControls.PropTypes = {
    valid: React.PropTypes.bool,
    cancelDidClick: React.PropTypes.func,
    successDidClick: React.PropTypes.func,
    labelCancel: React.PropTypes.string,
    labelSuccess: React.PropTypes.string
};
