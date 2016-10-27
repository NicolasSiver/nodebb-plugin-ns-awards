import React from 'react';
import {connect} from 'react-redux';

import {setAwardCreationState} from '../../action/actions';
import PanelControls from '../display/panel-controls';
import {getCreation} from '../../model/selector/selectors';

class NewAwardForm extends React.Component {

    render() {
        let readyCreate = false;
        return (
            <div>
                <h4>Create Award</h4>

                <div className="form-group">
                    <label htmlFor="awardName">Name</label>
                    <input
                        className="form-control"
                        type="text"
                        id="awardName"
                        placeholder="Enter name"
                        value={this.props.name}/>
                </div>
                <div className="form-group">
                    <label htmlFor="awardDesc">Description</label>
                    <textarea
                        className="form-control"
                        rows="4"
                        id="awardDesc"
                        placeholder="Enter full description"
                        value={this.props.description}></textarea>
                </div>
                <PanelControls
                    labelSuccess="Create"
                    valid={readyCreate}
                    cancelDidClick={this.props.cancel}
                    successDidClick={this._createAward}/>
            </div>
        );
    }
}

export default connect(
    (state) => {
        return {
            creation: getCreation(state)
        };
    },
    (dispatch) => {
        return {
            cancel: () => dispatch(setAwardCreationState(false))
        };
    }
)(NewAwardForm);
