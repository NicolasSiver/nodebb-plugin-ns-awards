import PropTypes from 'prop-types';
import React from 'react';

import AwardPickerItem from '../display/award-picker-item';
import {compareAwards} from '../../util/utils';

export default class AwardPicker extends React.Component {
    render() {
        let items;

        if (this.props.awards.length === 0) {
            items = <div>You don't have any awards. Why not create a new one?</div>;
        } else {
            items = this.props.awards.map(award => {
                return <AwardPickerItem
                    key={award.aid}
                    award={award}
                    selected={compareAwards(award, this.props.awardForGrant)}
                    clickListener={() => this.props.itemDidSelect(award)}/>;
            });
        }

        return (
            <div className="award-picker">
                {items}
            </div>
        );
    }
}

AwardPicker.propTypes = {
    awardForGrant: PropTypes.object,
    awards       : PropTypes.array,
    itemDidSelect: PropTypes.func.isRequired
};
