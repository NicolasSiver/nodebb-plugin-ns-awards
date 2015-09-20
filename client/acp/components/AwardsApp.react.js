var React            = require('react'),
    AwardsListView   = require('./AwardsListView.react'),
    AwardCreator     = require('./AwardCreator.react'),
    Donate           = require('./Donate.react'),
    UserAwardManager = require('./UserAwardManager.react'),
    Settings         = require('./Settings.react'),

    UsersStore       = require('../stores/UsersStore');

var AwardsApp = React.createClass({
    render: function () {
        return (
            <div className="row">
                <div className="col-md-5">
                    <AwardsListView />
                </div>
                <div className="col-md-3">
                    <Settings />
                </div>
                <div className="col-md-4">
                    <AwardCreator />
                    <UserAwardManager />
                    <Donate />
                </div>
            </div>
        );
    }
});
module.exports = AwardsApp;