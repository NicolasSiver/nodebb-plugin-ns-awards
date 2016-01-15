var React          = require('react'),
    ReactPropTypes = React.PropTypes,
    Actions        = require('../actions/Actions'),
    Autocomplete   = require('./Autocomplete.react'),
    AwardMultiple  = require('./AwardMultiple.react');

var Manage = React.createClass({
    componentDidMount: function () {
    },

    componentWillUnmount: function () {
    },

    render: function () {
        return (
            <div className="row">
                <div className="col-md-6">
                    <Autocomplete
                        placeholder="Enter Username"
                        valueDidChange={null}
                        optionDidSelect={null}
                        optionWillSelectWithOffset={null}
                        optionWillSelectAt={null}
                        optionsShouldClear={null}
                        optionSelectedIndex={0}
                        options={[]}/>
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
