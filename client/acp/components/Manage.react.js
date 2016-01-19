var React         = require('react'),
    EditUser      = require('./EditUser.react'),
    AwardMultiple = require('./AwardMultiple.react');

var Manage = React.createClass({
    render: function () {
        return (
            <div className="row">
                <div className="col-md-6">
                    <EditUser />
                </div>
                <div className="col-md-1">
                    OR
                </div>
                <div className="col-md-5">
                    <AwardMultiple />
                </div>
            </div>
        );
    }
});

module.exports = Manage;
