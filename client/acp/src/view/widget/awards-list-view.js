import React from 'react';
import {connect} from 'react-redux';

import {cancelAwardEdit, editAward, startAwardEdit} from '../../action/actions';
import AwardsListItemView from './awards-list-item-view';
import {getAwards, getEditAwards} from '../../model/selector/selectors';
import {createAwardUid} from '../../util/utils';

class AwardsListView extends React.Component {
    render() {
        let items;

        if (this.props.awards.length === 0) {
            items = <li>No Awards. Why not create a new one?</li>;
        } else {
            items = this.props.awards.map((award, index) => {
                let aid = createAwardUid(award.aid);
                let editedAward = this.props.edited[aid];
                award = editedAward || award;
                return <AwardsListItemView
                    key={award.aid}
                    edit={!!editedAward}
                    award={award}
                    itemDidEdit={awardEdited => this.props.edit(aid, Object.assign({}, awardEdited))}
                    itemWillEdit={() => this.props.editStart(aid, Object.assign({}, award))}
                    itemWillCancel={() => this.props.cancel(aid)}
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
    state => {
        return {
            awards: getAwards(state),
            edited: getEditAwards(state)
        };
    },
    dispatch => {
        return {
            cancel   : aid => dispatch(cancelAwardEdit(aid)),
            edit     : (aid, award) => dispatch(editAward(aid, award)),
            editStart: (aid, award) => dispatch(startAwardEdit(aid, award))
            // save  : (index, aid, name, description, file) => dispatch(setSection(sectionName))
        };
    }
)(AwardsListView);
