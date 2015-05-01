var React          = require('react'),
    ReactPropTypes = React.PropTypes,
    Typeahead      = require('react-typeahead').Typeahead,

    customClasses  = {
        input: 'form-control',
        hover: 'hover-item'
    };


var Autocomplete = React.createClass({
    propTypes: {
        options: ReactPropTypes.array,
        placeholder: ReactPropTypes.string
    },

    ////input, results, listItem, listAnchor, hover
    render: function () {
        return (
            <div className="auto-complete">
                <Typeahead
                    options={this.props.options}
                    maxVisible={2}
                    placeholder={this.props.placeholder}
                    customClasses={customClasses}/>
            </div>
        );
    }
});

module.exports = Autocomplete;