import React from 'react';
import {connect} from 'react-redux';

import {
    setAwardCreationState,
    setNewAwardDescription,
    setNewAwardName
} from '../../action/actions';
import ImageManager from '../display/image-manager';
import PanelControls from '../display/panel-controls';
import {
    getNewAwardDescription,
    getNewAwardName,
    getUploadPath
} from '../../model/selector/selectors';

class NewAwardForm extends React.Component {

    render() {
        let readyCreate = false;
        return (
            <div className="award-form">
                <h4>Create Award</h4>

                <div className="form-group">
                    <label htmlFor="awardName">Name</label>
                    <input
                        className="form-control"
                        type="text"
                        id="awardName"
                        placeholder="Enter name, ex: 'Good Conduct Medal'"
                        onChange={e => this.props.setName(e.target.value)}
                        value={this.props.name}/>
                </div>
                <div className="form-group">
                    <label htmlFor="awardImage">Image</label>
                    <div className="award-form__image">
                        <ImageManager
                            uploadUrl={this.props.uploadPath}/>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="awardDesc">Description</label>
                    <textarea
                        className="form-control"
                        rows="4"
                        id="awardDesc"
                        placeholder="Enter full description, ex: 'The Good Conduct Medal is one of the oldest military awards of the United States Armed Forces.'"
                        onChange={e => this.props.setDescription(e.target.value)}
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
    state => {
        return {
            description: getNewAwardDescription(state),
            name       : getNewAwardName(state),
            uploadPath : getUploadPath(state)
        };
    },
    dispatch => {
        return {
            cancel        : () => dispatch(setAwardCreationState(false)),
            setName       : value => dispatch(setNewAwardName(value)),
            setDescription: value => dispatch(setNewAwardDescription(value))
        };
    }
)(NewAwardForm);
