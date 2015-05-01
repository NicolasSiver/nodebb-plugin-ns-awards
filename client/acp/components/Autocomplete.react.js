var React          = require('react'),
    ReactPropTypes = React.PropTypes,
    classNames     = require('classnames'),
    debounce       = require('lodash/function/debounce');

var Autocomplete = React.createClass({
    propTypes: {
        options        : ReactPropTypes.array,
        placeholder    : ReactPropTypes.string,
        valueDidChange : ReactPropTypes.func,
        optionDidSelect: ReactPropTypes.func
    },

    getInitialState: function () {
        return {
            open     : false,
            inputText: ''
        };
    },

    render: function () {
        var selectOptions, items;
        var componentClass = classNames({
            'auto-complete': true,
            'open'         : this.state.open
        });

        if (this.props.options && this.props.options.length > 0) {
            items = this.props.options.map(function (item, index) {
                return <li className="ac-item" key={item.value}>
                    <a href="#" data-id={item.value} data-index={index}>{item.label}</a>
                </li>;
            });
            selectOptions = <ul
                className="dropdown-menu ac-menu"
                onClick={this._menuDidClick}>{items}</ul>;
        }

        return (
            <div
                className={componentClass}
                onFocus={this._focusDidReceive}
                onBlur={this._focusDidLost}>
                <input
                    type="text"
                    className="form-control"
                    placeholder={this.props.placeholder}
                    value={this.state.inputText}
                    onChange={this._textDidChange}/>
                {selectOptions}
            </div>
        );
    },

    _debounceInput: debounce(function () {
        this._validateInput();
    }, 500),

    _focusDidLost: function (e) {
        this.setState({
            open: false
        });
    },

    _focusDidReceive: function (e) {
        this.setState({
            open: true
        });
    },

    _menuDidClick: function (e) {
        this.setState(this.getInitialState());
        this.props.optionDidSelect({
            index: +e.target.dataset.index,
            id   : +e.target.dataset.id
        });
    },

    _textDidChange: function (e) {
        this.setState({inputText: e.target.value});
        this._debounceInput();
    },

    _validateInput: function () {
        if (this.state.inputText.length >= 3) {
            this.props.valueDidChange(this.state.inputText);
        }
    }
});

module.exports = Autocomplete;