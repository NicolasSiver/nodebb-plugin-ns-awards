var React          = require('react');

var PanelControls = React.createClass({
    propTypes: {
        valid          : React.PropTypes.func.isRequired,
        cancelDidClick : React.PropTypes.func,
        successDidClick: React.PropTypes.func,
        labelCancel    : React.PropTypes.string,
        labelSuccess   : React.PropTypes.string
    },

    getDefaultProps: function () {
        return {
            labelCancel : 'Cancel',
            labelSuccess: 'OK'
        };
    },

    render: function () {
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
                    disabled={this.props.valid() ? '' : 'disabled'}
                    type="button">{this.props.labelSuccess}
                </button>
            </div>
        );
    }
});

module.exports = PanelControls;