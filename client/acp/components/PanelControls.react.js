var React          = require('react'),
    ReactPropTypes = React.PropTypes;

var PanelControls = React.createClass({
    propTypes: {
        valid          : ReactPropTypes.func.isRequired,
        cancelDidClick : ReactPropTypes.func,
        successDidClick: ReactPropTypes.func,
        labelCancel    : ReactPropTypes.string,
        labelSuccess   : ReactPropTypes.string
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