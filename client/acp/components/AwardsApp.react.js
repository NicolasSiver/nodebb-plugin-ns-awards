var React            = require('react'),
    AwardsListView   = require('./AwardsListView.react'),
    AwardCreator     = require('./AwardCreator.react'),
    UserAwardManager = require('./UserAwardManager.react'),
    Settings         = require('./Settings.react');

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

                    <div className="alert alert-info" role="alert">Plugin is under development. Don't hesitate to <a
                        href="https://github.com/NicolasSiver/nodebb-plugin-ns-awards#todo"
                        target="_blank">contribute</a>.
                    </div>
                </div>
            </div>
        );
    }
});
module.exports = AwardsApp;