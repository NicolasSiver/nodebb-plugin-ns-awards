//var React              = require('react'),
//    AwardsListItemView = require('./AwardsListItemView.react'),
//    AwardsStore        = require('../stores/AwardsStore'),
//    Actions            = require('../actions/Actions');

import React from 'react';
import {connect} from 'react-redux';

import {cancelAwardEdit} from '../../action/actions';

class AwardsListView extends React.Component {
    render() {
        let items;

        if (this.props.awards.length == 0) {
            items = <li>No Awards. Why not create a new one?</li>;
        } else {
            items = this.props.awards.map((award, index) => {
                return <AwardsListItemView
                    key={award.aid}
                    edit={index === this.props.editAt}
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
            awards: getSection(state),
            editAt: getSections(state)
        };
    },
    (dispatch) => {
        return {
            cancel: () => dispatch(cancelAwardEdit()),
            edit  : (index) => dispatch(setSection(sectionName)),
            save  : (index, aid, name, description, file) => dispatch(setSection(sectionName))
        };
    }
)(AwardsListView);
