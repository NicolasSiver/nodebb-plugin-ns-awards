import classNames from 'classnames';
import React from 'react';

export default class AwardPickerItem extends React.Component {
    render() {
        let bodyClass = classNames('award-picker-item__body', {
            'award-picker-item__body--selected': this.props.selected
        });
        let selectionPin;
        if (this.props.selected) {
            selectionPin =
                <svg className="award-picker-item__pin" viewBox="0 0 2 8" width="100%" height="100%" preserveAspectRatio="none">
                    <g>
                        <path d="M 0 0 L 2 4 L 0 8 z"/>
                    </g>
                </svg>;
        }
        return (
            <div className="award-picker-item" onClick={() => this.props.clickListener()}>
                <div className={bodyClass}>
                    <div className="award-picker-item__preview">
                        <img className="award-picker-item__image img-responsive" src={this.props.award.url}/>
                    </div>
                    <div className="award-picker-item__details">
                        <div className="award-picker-item__title">{this.props.award.name}</div>
                        <div className="award-picker-item__description">{this.props.award.desc}</div>
                    </div>
                </div>
                {selectionPin}
            </div>
        );
    }
}

AwardPickerItem.propTypes = {
    award        : React.PropTypes.object.isRequired,
    clickListener: React.PropTypes.func.isRequired,
    selected     : React.PropTypes.bool
};
