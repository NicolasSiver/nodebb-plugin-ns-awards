var React            = require('react'),
    AwardCreator     = require('./AwardCreator.react'),
    TabManager       = require('./TabManager.react'),
    UsersStore       = require('../stores/UsersStore');

var AwardsApp = React.createClass({
    render: function () {
        return (
            <div className="row">
                <div className="col-md-8">
                    <TabManager />
                </div>
                <div className="col-md-4">
                    <AwardCreator />
                </div>
            </div>
        );
    }
});
module.exports = AwardsApp;