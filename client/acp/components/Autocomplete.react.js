var React          = require('react'),
    ReactPropTypes = React.PropTypes,
    debounce       = require('lodash/function/debounce'),
    Typeahead      = require('react-typeahead').Typeahead,

    customClasses  = {
        input: 'form-control',
        hover: 'hover-item'
    },

    input          = null;

var Autocomplete = React.createClass({
    propTypes: {
        options       : ReactPropTypes.array,
        placeholder   : ReactPropTypes.string,
        valueDidChange: ReactPropTypes.func
    },

    ////input, results, listItem, listAnchor, hover
    render: function () {
        return (
            <div className="auto-complete">
                <Typeahead
                    options={this.props.options}
                    maxVisible={2}
                    onKeyDown={this._keyDidDown}
                    placeholder={this.props.placeholder}
                    customClasses={customClasses}/>
            </div>
        );
    },

    _delayInput: debounce(function () {
        this._checkInput();
    }, 500),

    _keyDidDown: function (event) {
        input = event.currentTarget;
        this._delayInput();
    },

    _checkInput: function () {
        if (input.value.length >= 3) {
            this.props.valueDidChange(input.value);
        }
    }
});

module.exports = Autocomplete;