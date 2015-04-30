var React          = require('react'),
    ReactPropTypes = React.PropTypes;

var PromptView = React.createClass({
    propTypes: {
        label        : ReactPropTypes.string.isRequired,
        hint         : ReactPropTypes.string.isRequired,
        labelDidClick: ReactPropTypes.func
    },

    render: function () {
        return (
            <div className="media">
                <div className="media-left media-middle">
                    <button
                        className="btn btn-success"
                        onClick={this.props.labelDidClick}
                        type="button">{this.props.label}
                    </button>
                </div>
                <div className="media-body">
                    {this.props.hint}
                </div>
            </div>
        );
    }
});

module.exports = PromptView;