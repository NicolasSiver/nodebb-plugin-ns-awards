import React from 'react';
import {connect} from 'react-redux';

import {
    cancelAwardEdit,
    deleteAward,
    editAward,
    saveAward,
    setAwardPreview,
    startAwardEdit
} from '../../action/actions';
import AwardsListItemView from '../display/awards-list-item-view';
import {getAwards, getEditAwards, getUploadPath} from '../../model/selector/selectors';
import {createAwardUid} from '../../util/utils';

class AwardsListView extends React.Component {
    render() {
        let items;

        if (this.props.awards.length === 0) {
            items = <li>You don't have any awards. Why not create a new one?</li>;
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
                    itemImageDidChange={value => this.props.setPreview(aid, value)}
                    itemImageDidReset={() => this.props.resetPreview(aid)}
                    itemWillEdit={() => this.props.editStart(aid, Object.assign({}, award))}
                    itemWillCancel={() => this.props.cancel(aid)}
                    itemWillDelete={() => this.props.delete(aid)}
                    itemWillSave={() => this.props.save(aid)}
                    uploadPath={this.props.uploadPath}/>;
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
            awards    : getAwards(state),
            edited    : getEditAwards(state),
            uploadPath: getUploadPath(state)
        };
    },
    dispatch => {
        return {
            cancel      : aid => dispatch(cancelAwardEdit(aid)),
            delete      : aid => dispatch(deleteAward(aid)),
            edit        : (aid, award) => dispatch(editAward(aid, award)),
            editStart   : (aid, award) => dispatch(startAwardEdit(aid, award)),
            resetPreview: aid => dispatch(setAwardPreview(aid, null)),
            save        : aid => dispatch(saveAward(aid)),
            setPreview  : (aid, value) => dispatch(setAwardPreview(aid, value))
        };
    }
)(AwardsListView);
