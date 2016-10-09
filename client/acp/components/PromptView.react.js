var React          = require('react');

var PromptView = React.createClass({
    propTypes: {
        label        : React.PropTypes.string.isRequired,
        hint         : React.PropTypes.string.isRequired,
        labelDidClick: React.PropTypes.func
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