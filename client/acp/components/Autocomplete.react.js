var React          = require('react'),
    ReactPropTypes = React.PropTypes,
    classNames     = require('classnames'),
    debounce       = require('lodash/function/debounce');

var Autocomplete = React.createClass({
    propTypes: {
        options                   : ReactPropTypes.array,
        placeholder               : ReactPropTypes.string,
        valueDidChange            : ReactPropTypes.func,
        optionDidSelect           : ReactPropTypes.func,
        optionSelectedIndex       : ReactPropTypes.number,
        optionsShouldClear        : ReactPropTypes.func,
        optionWillSelectAt        : ReactPropTypes.func,
        optionWillSelectWithOffset: ReactPropTypes.func
    },

    getInitialState: function () {
        return {
            ignoreFocusStates  : false,
            inputText          : null,
            mouseSelectionIndex: null,
            open               : false
        };
    },

    isOptions: function () {
        return this.props.options && this.props.options.length;
    },

    render: function () {
        var selectOptions, items;
        var componentClass = classNames({
            'auto-complete': true,
            'open'         : this.state.open
        });

        if (this.isOptions()) {
            items = this.props.options.map(function (item, index) {
                var itemClass = classNames({
                    'ac-item'    : true,
                    'ac-selected': this.props.optionSelectedIndex === index
                });
                return <li className={itemClass} key={item.value}>
                    <a href="#" data-id={item.value} data-index={index}>{item.label}</a>
                </li>;
            }, this);
            selectOptions = <ul
                className="dropdown-menu ac-menu"
                onClick={this._menuDidClick}
                onMouseDown={this._menuMouseDidDown}>{items}</ul>;
        }

        return (
            <div
                className={componentClass}>
                <input
                    type="text"
                    className="form-control"
                    placeholder={this.props.placeholder}
                    value={this.state.inputText}
                    onBlur={this._focusDidLost}
                    onChange={this._textDidChange}
                    onFocus={this._focusDidReceive}
                    onKeyDown={this._keyDidDown}/>
                {selectOptions}
            </div>
        );
    },

    _debounceInput: debounce(function () {
        this._validateInput();
    }, 500),

    _focusDidLost: function (e) {
        if (this.state.ignoreFocusStates) {
            return;
        }
        this.setState({
            open: false
        });
    },

    _focusDidReceive: function (e) {
        if (this.state.ignoreFocusStates) {
            return;
        }
        this.setState({
            open: true
        });
    },

    _keyDidDown: function (e) {
        switch (e.keyCode) {
            // Enter
            case 13:
                if (this.isOptions()) {
                    this.setState({inputText: null}, function () {
                        this.props.optionDidSelect();
                    }.bind(this));
                }
                break;
            // Down
            case 40:
                e.preventDefault();
                this.props.optionWillSelectWithOffset(1);
                break;
            // Up
            case 38:
                e.preventDefault();
                this.props.optionWillSelectWithOffset(-1);
                break;
            // Esc
            case 27:
                console.log('Esc, please implement');
                break;
        }
    },

    _menuDidClick: function (e) {
        var selectionIndex = this.state.mouseSelectionIndex;
        this.setState(this.getInitialState(), function () {
            this.props.optionWillSelectAt(selectionIndex);
        }.bind(this));
    },

    _menuMouseDidDown: function (e) {
        this.setState({
            ignoreFocusStates  : true,
            mouseSelectionIndex: +e.target.dataset.index
        });
    },

    _textDidChange: function (e) {
        this.setState({inputText: e.target.value}, function () {
            this._debounceInput();
        }.bind(this));
    },

    _validateInput: function () {
        if (this.state.inputText.length >= 2) {
            this.props.valueDidChange(this.state.inputText);
        } else if (this.isOptions() && this.props.optionsShouldClear) {
            this.props.optionsShouldClear();
        }
    }
});

module.exports = Autocomplete;
