var Actions        = require('../actions/Actions'),
    classNames     = require('classnames'),
    React          = require('react'),
    ReactPropTypes = React.PropTypes;

var UserAwardList = React.createClass({
    propTypes: {
        items: ReactPropTypes.array.isRequired
    },

    render: function () {
        return (
            <div className="awards-granted">
                {this.props.items.map(function (grant, index) {
                    console.log(grant);
                    return (
                        <div key={index} className="award-badge">
                            <img className="img-responsive" src={grant.award.picture} />
                        </div>
                    );
                })}
            </div>
        );
    }

});

module.exports = UserAwardList;
