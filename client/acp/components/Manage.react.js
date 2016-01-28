var AwardSelector = require('./AwardSelector.react'),
    React         = require('react'),
    EditUser      = require('./EditUser.react');

var Manage = React.createClass({
    render: function () {
        return (
            <div className="row">
                <div className="col-md-7">
                    <EditUser />
                </div>
                <div className="col-md-5">
                    <AwardSelector />
                </div>
            </div>
        );
    }
});

module.exports = Manage;
