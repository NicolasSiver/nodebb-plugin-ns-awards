var Actions        = require('../actions/Actions'),
    Avatar         = require('./Avatar.react'),
    classNames     = require('classnames'),
    React          = require('react'),
    ReactPropTypes = React.PropTypes;

var UserItemView = React.createClass({
    propTypes: {
        user: ReactPropTypes.object.isRequired
    },

    render: function () {
        return (
            <div className="user">
                <Avatar user={this.props.user}/>
                <div className="details">
                    <h5>{this.props.user.username}</h5>
                    <div className="stats">
                        <div className="metric">
                            <i className="fa fa-file-o"></i> {this.props.user.postcount}
                        </div>
                        <div className="metric">
                            <i className="fa fa-star-o"></i> {this.props.user.reputation}
                        </div>
                        <div className="metric">
                            <i className="fa fa-calendar-o"></i> {new Date(this.props.user.joindate).toDateString()}
                        </div>
                    </div>
                    <div className="awards">

                    </div>
                </div>
            </div>
        );
    }

});

module.exports = UserItemView;
