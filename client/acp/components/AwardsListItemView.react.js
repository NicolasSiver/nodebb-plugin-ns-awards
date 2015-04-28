var React          = require('react'),
    ReactPropTypes = React.PropTypes,
    Actions        = require('../actions/Actions');

var AwardsListItemView = React.createClass({
    propTypes: {
        award: ReactPropTypes.object.isRequired
    },

    render: function () {
        return (
            <li className="awards-item">
                <div className="row">
                    <div className="col-md-3">{this.props.award.name}</div>
                    <div className="col-md-7">{this.props.award.desc}</div>
                    <div className="col-md-2">
                        <div className="pull-right"><i
                            className="fa fa-times"
                            onClick={this._deleteItem}></i></div>
                    </div>
                </div>
            </li>
        );
    },

    _deleteItem: function () {

    }
});

module.exports = AwardsListItemView;