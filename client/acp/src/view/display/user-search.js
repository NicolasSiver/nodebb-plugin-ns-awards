import classNames from 'classnames';
import React from 'react';

import Avatar from './avatar';
import {compareUsers} from '../../util/utils';

export default class UserSearch extends React.Component {
    keyDidChange(e) {
        switch (e.keyCode) {
            // Enter
            case 13:
                e.preventDefault();
                this.props.optionDidSelect(null);
                break;
            // Down
            case 40:
                e.preventDefault();
                this.props.selectionWillChange(1);
                break;
            // Up
            case 38:
                e.preventDefault();
                this.props.selectionWillChange(-1);
                break;
            // Esc
            case 27:
                e.preventDefault();
                this.props.valueWillReset();
                break;
        }
    }

    render() {
        let mainClass = classNames('user-search', 'open');
        return (
            <div className={mainClass}>
                <input
                    type="text"
                    className="form-control"
                    placeholder={this.props.placeholder}
                    value={this.props.value || ''}
                    onBlur={() => console.log('BLUR')}
                    onChange={e => this.props.valueDidChange(e.target.value)}
                    onFocus={() => undefined}
                    onKeyDown={e => this.keyDidChange(e)}/>
                {this.renderOptions(this.props.options, this.props.highlight, this.props.optionDidSelect)}
            </div>
        );
    }

    renderOptionItem(user, highlight, clickListener) {
        let itemClass = classNames('user-search__item', {
            'user-search__item--highlight': compareUsers(user, highlight)
        });
        return <li className={itemClass} key={user.username} onClick={() => clickListener(user)}>
            <div className="user-search__image"><Avatar user={user}/></div>
            <div className="user-search__name">{user.username}</div>
        </li>;
    }

    renderOptions(list, selectedItem, selectListener) {
        return list.length === 0 ? null : (
            <ul className="dropdown-menu user-search__menu">
                {list.map(item => this.renderOptionItem(item, selectedItem, selectListener))}
            </ul>
        );
    }
}

UserSearch.propTypes = {
    highlight          : React.PropTypes.object,
    optionDidSelect    : React.PropTypes.func.isRequired,
    options            : React.PropTypes.array,
    placeholder        : React.PropTypes.string,
    selectionWillChange: React.PropTypes.func.isRequired,
    value              : React.PropTypes.string,
    valueDidChange     : React.PropTypes.func.isRequired,
    valueWillReset     : React.PropTypes.func.isRequired
};


// var React          = require('react'),
//     ReactPropTypes = React.PropTypes,
//     classNames     = require('classnames'),
//     debounce       = require('lodash/debounce');
//
// var Autocomplete = React.createClass({
//     propTypes: {
//         options                   : ReactPropTypes.array,
//         placeholder               : ReactPropTypes.string,
//         valueDidChange            : ReactPropTypes.func,
//         optionDidSelect           : ReactPropTypes.func,
//         optionSelectedIndex       : ReactPropTypes.number,
//         optionsShouldClear        : ReactPropTypes.func,
//         optionWillSelectAt        : ReactPropTypes.func,
//         optionWillSelectWithOffset: ReactPropTypes.func
//     },
//
//     getInitialState: function () {
//         return {
//             ignoreFocusStates  : false,
//             inputText          : null,
//             mouseSelectionIndex: null,
//             open               : false
//         };
//     },
//
//     isOptions: function () {
//         return this.props.options && this.props.options.length;
//     },
//
//     render: function () {
//         var selectOptions, items;
//         var componentClass = classNames({
//             'auto-complete': true,
//             'open'         : this.state.open
//         });
//
//         if (this.isOptions()) {
//             items = this.props.options.map(function (item, index) {
//                 var itemClass = classNames({
//                     'ac-item'    : true,
//                     'ac-selected': this.props.optionSelectedIndex === index
//                 });
//                 return <li className={itemClass} key={item.value}>
//                     <a href="#" data-id={item.value} data-index={index}>{item.label}</a>
//                 </li>;
//             }, this);
//             selectOptions = <ul
//                 className="dropdown-menu ac-menu"
//                 onClick={this._menuDidClick}
//                 onMouseDown={this._menuMouseDidDown}>{items}</ul>;
//         }
//
//         return (
//             <div
//                 className={componentClass}>
//                 <input
//                     type="text"
//                     className="form-control"
//                     placeholder={this.props.placeholder}
//                     value={this.state.inputText}
//                     onBlur={this._focusDidLost}
//                     onChange={this._textDidChange}
//                     onFocus={this._focusDidReceive}
//                     onKeyDown={this._keyDidDown}/>
//                 {selectOptions}
//             </div>
//         );
//     },
//
//     _debounceInput: debounce(function () {
//         this._validateInput();
//     }, 500),
//
//     _focusDidLost: function (e) {
//         if (this.state.ignoreFocusStates) {
//             return;
//         }
//         this.setState({
//             open: false
//         });
//     },
//
//     _focusDidReceive: function (e) {
//         if (this.state.ignoreFocusStates) {
//             return;
//         }
//         this.setState({
//             open: true
//         });
//     },
//
//     _keyDidDown: function (e) {
//         switch (e.keyCode) {
//             // Enter
//             case 13:
//                 if (this.isOptions()) {
//                     this.setState({inputText: null}, function () {
//                         this.props.optionDidSelect();
//                     }.bind(this));
//                 }
//                 break;
//             // Down
//             case 40:
//                 e.preventDefault();
//                 this.props.optionWillSelectWithOffset(1);
//                 break;
//             // Up
//             case 38:
//                 e.preventDefault();
//                 this.props.optionWillSelectWithOffset(-1);
//                 break;
//             // Esc
//             case 27:
//                 console.log('Esc, please implement');
//                 break;
//         }
//     },
//
//     _menuDidClick: function (e) {
//         var selectionIndex = this.state.mouseSelectionIndex;
//         this.setState(this.getInitialState(), function () {
//             this.props.optionWillSelectAt(selectionIndex);
//         }.bind(this));
//     },
//
//     _menuMouseDidDown: function (e) {
//         this.setState({
//             ignoreFocusStates  : true,
//             mouseSelectionIndex: +e.target.dataset.index
//         });
//     },
//
//     _textDidChange: function (e) {
//         this.setState({inputText: e.target.value}, function () {
//             this._debounceInput();
//         }.bind(this));
//     },
//
//     _validateInput: function () {
//         if (this.state.inputText.length >= 2) {
//             this.props.valueDidChange(this.state.inputText);
//         } else if (this.isOptions() && this.props.optionsShouldClear) {
//             this.props.optionsShouldClear();
//         }
//     }
// });
//
// module.exports = Autocomplete;
