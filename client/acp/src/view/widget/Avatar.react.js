var classNames = require('classnames'),
    React      = require('react');

var UserItemView = React.createClass({
    propTypes: {
        user: React.PropTypes.object.isRequired
    },

    render: function () {
        var content;
        if (this.props.user.picture) {
            content = <img className="img-responsive" src={this.props.user.picture}/>;
        } else {
            content = <div className="aw-icon" style={{backgroundColor: this.props.user['icon:bgColor']}}>
                {this.props.user['icon:text']}
            </div>;
        }
        return (
            <div className="aw-avatar">
                {content}
            </div>
        );
    }

});

module.exports = UserItemView;
