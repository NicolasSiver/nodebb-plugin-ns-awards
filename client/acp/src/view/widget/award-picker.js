import React from 'react';
import {connect} from 'react-redux';

import {pickAward} from '../../action/actions';
import AwardPickerItem from '../display/award-picker-item';
import {getAwardForGrant, getAwards} from '../../model/selector/selectors';
import {compareAwards} from '../../util/utils';

class AwardPicker extends React.Component {
    render() {
        let items;

        if (this.props.awards.length === 0) {
            items = <div>No Awards. Why not create a new one?</div>;
        } else {
            items = this.props.awards.map(award => {
                return <AwardPickerItem
                    key={award.aid}
                    award={award}
                    selected={compareAwards(award, this.props.awardForGrant)}
                    clickListener={() => this.props.selectAward(award)}/>;
            });
        }

        return (
            <div className="award-picker">
                {items}
            </div>
        );
    }
}

export default connect(
    state => {
        return {
            awardForGrant: getAwardForGrant(state),
            awards       : getAwards(state)
        };
    },
    dispatch => {
        return {
            selectAward: award => dispatch(pickAward(award))
        };
    }
)(AwardPicker);
