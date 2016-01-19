var React        = require('react'),
    Autocomplete = require('./Autocomplete.react');

var EditUser = React.createClass({
    render: function () {
        return (
            <div>
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
        );
    }
});

module.exports = EditUser;
