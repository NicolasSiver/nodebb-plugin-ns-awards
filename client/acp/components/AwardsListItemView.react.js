var React          = require('react'),
    bootbox        = require('bootbox'),
    ReactPropTypes = React.PropTypes,
    Actions        = require('../actions/Actions');


var AwardsListItemView = React.createClass({
    propTypes: {
        award: ReactPropTypes.object.isRequired
    },

    render: function () {
        var imageUrl = "../../uploads/awards/" + this.props.award.image;

        return (
            <li className="awards-item">
                <div className="row">
                    <div className="col-md-2"><img className="img-responsive" src={imageUrl}/></div>
                    <div className="col-md-8">
                        <dl>
                            <dt>{this.props.award.name}</dt>
                            <dd>{this.props.award.desc}</dd>
                        </dl>
                    </div>
                    <div className="col-md-2">
                        <div className="pull-right"><i
                            className="fa fa-times icon-danger icon-control"
                            onClick={this._deleteItem}></i></div>
                    </div>
                </div>
            </li>
        );
    },

    _deleteItem: function () {
        var self = this;
        bootbox.confirm("Are you sure?", function (result) {
            if (result) {
                Actions.deleteAward(self.props.award);
            }
        });
    }
});

module.exports = AwardsListItemView;