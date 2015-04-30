var React      = require('react'),
    PromptView = require('./PromptView.react'),
    Actions    = require('../actions/Actions');

var UserAwardManager = React.createClass({

    getInitialState: function () {
        return {
            open: false
        };
    },

    render: function () {
        return (
            <div className="panel panel-default">
                <div className="panel-body">
                    <PromptView
                        label="Give Award..."
                        hint="Overview user's awards and grant him or her a new one. Don't forget to specify reason."/>
                </div>
            </div>
        );
    }
});

module.exports = UserAwardManager;