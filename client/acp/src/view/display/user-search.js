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
                    onBlur={() => this.props.focusDidChange(false)}
                    onChange={e => this.props.valueDidChange(e.target.value)}
                    onFocus={() => this.props.focusDidChange(true)}
                    onKeyDown={e => this.keyDidChange(e)}/>
                {this.renderOptions(this.props.options, this.props.highlight, this.props.focus, this.props.optionDidSelect)}
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

    renderOptions(list, selectedItem, focused, selectListener) {
        return (list.length === 0 || !focused) ? null : (
            <ul className="dropdown-menu user-search__menu">
                {list.map(item => this.renderOptionItem(item, selectedItem, selectListener))}
            </ul>
        );
    }
}

UserSearch.propTypes = {
    focus              : React.PropTypes.bool,
    focusDidChange     : React.PropTypes.func.isRequired,
    highlight          : React.PropTypes.object,
    optionDidSelect    : React.PropTypes.func.isRequired,
    options            : React.PropTypes.array,
    placeholder        : React.PropTypes.string,
    selectionWillChange: React.PropTypes.func.isRequired,
    value              : React.PropTypes.string,
    valueDidChange     : React.PropTypes.func.isRequired,
    valueWillReset     : React.PropTypes.func.isRequired
};
