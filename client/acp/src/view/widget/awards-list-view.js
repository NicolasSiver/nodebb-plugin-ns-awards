import React from 'react';
import {connect} from 'react-redux';

import {cancelAwardEdit, setAwardEditIndex} from '../../action/actions';
import AwardsListItemView from './awards-list-item-view';
import {getAwards, getEditAwards} from '../../model/selector/selectors';

class AwardsListView extends React.Component {
    render() {
        let items;

        if (this.props.awards.length == 0) {
            items = <li>No Awards. Why not create a new one?</li>;
        } else {
            items = this.props.awards.map((award, index) => {
                let editedAward = this.props.edited[award.aid];
                award = editedAward || award;
                return <AwardsListItemView
                    key={award.aid}
                    edit={!!editedAward}
                    award={award}
                    itemWillEdit={() => this.props.edit(index)}
                    itemWillCancel={() => this.props.cancel()}
                    itemWillSave={(name, description, file) => this.props.save(index, award.aid, name, description, file)}/>;
            });
        }

        return (
            <div>
                <ul className="awards-list">
                    {items}
                </ul>
            </div>
        );
    }
}

export default connect(
    (state) => {
        return {
            awards: getAwards(state),
            edited: getEditAwards(state)
        };
    },
    (dispatch) => {
        return {
            cancel: () => dispatch(cancelAwardEdit()),
            edit  : (index) => dispatch(setAwardEditIndex(index))
            // save  : (index, aid, name, description, file) => dispatch(setSection(sectionName))
        };
    }
)(AwardsListView);
