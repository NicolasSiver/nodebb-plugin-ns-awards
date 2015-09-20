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
                <div className="media-body">
                    <p>
                        {this.props.hint}
                    </p>

                    <button
                        className="btn btn-primary"
                        onClick={this.props.labelDidClick}
                        type="button">{this.props.label}
                    </button>
                </div>
            </div>
        );
    }
});

module.exports = PromptView;