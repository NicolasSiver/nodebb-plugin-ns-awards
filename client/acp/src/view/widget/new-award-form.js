import React from 'react';
import {connect} from 'react-redux';

import {
    createAward,
    resetNewAwardPreview,
    setAwardCreationState,
    setNewAwardDescription,
    setNewAwardName,
    setNewAwardPreview
} from '../../action/actions';
import * as Constants from '../../model/constants';
import ImageManager from '../display/image-manager';
import PanelControls from '../display/panel-controls';
import {
    getNewAwardDescription,
    getNewAwardName,
    getNewAwardPreview,
    getUploadPath
} from '../../model/selector/selectors';

class NewAwardForm extends React.Component {

    isValid() {
        return this.props.name !== null && this.props.name.length > 0
            && this.props.description !== null && this.props.description.length > 0
            && this.props.preview !== null && this.props.preview.length > 0;
    }

    render() {
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
                        value={this.props.name || ''}/>
                </div>
                <div className="form-group">
                    <label htmlFor="awardImage">Image</label>
                    <div className="award-form__image">
                        <ImageManager
                            entityId={Constants.NEW_AWARD_ID}
                            imageDidSelect={(file, url) => this.props.setPreview(url)}
                            imageWillRemove={() => this.props.resetPreview()}
                            previewUrl={this.props.preview}
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
                        value={this.props.description || ''}/>
                </div>
                <PanelControls
                    labelSuccess="Create"
                    valid={this.isValid()}
                    cancelDidClick={this.props.cancel}
                    successDidClick={() => this.props.createAward(
                        this.props.name,
                        this.props.description
                    )}/>
            </div>
        );
    }
}

export default connect(
    state => {
        return {
            description: getNewAwardDescription(state),
            name       : getNewAwardName(state),
            preview    : getNewAwardPreview(state),
            uploadPath : getUploadPath(state)
        };
    },
    dispatch => {
        return {
            cancel        : () => dispatch(setAwardCreationState(false)),
            createAward   : (name, desc) => dispatch(createAward(name, desc)),
            resetPreview  : () => dispatch(resetNewAwardPreview()),
            setName       : value => dispatch(setNewAwardName(value)),
            setDescription: value => dispatch(setNewAwardDescription(value)),
            setPreview    : value => dispatch(setNewAwardPreview(value))
        };
    }
)(NewAwardForm);
