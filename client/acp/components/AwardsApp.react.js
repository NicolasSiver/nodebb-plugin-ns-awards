var React        = require('react'),
    AwardCreator = require('./AwardCreator.react'),
    Donate       = require('./Donate.react'),
    TabManager   = require('./TabManager.react'),
    UsersStore   = require('../stores/UsersStore');

var AwardsApp = React.createClass({
    render: function () {
        return (
            <div className="row">
                <div className="col-md-8">
                    <TabManager />
                </div>
                <div className="col-md-4">
                    <div className="panel panel-default">
                        <div className="panel-body">
                            <AwardCreator />
                        </div>
                    </div>
                    <div className="panel panel-default">
                        <div className="panel-body">
                            <Donate />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});
module.exports = AwardsApp;