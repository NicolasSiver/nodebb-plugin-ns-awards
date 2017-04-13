import React from 'react';

import ImageManager from './image-manager';
import RoundButton from './round-button';
import {createAwardUid} from '../../util/utils';

export default class AwardsListItemView extends React.Component {
    render() {
        return (
            <li className="awards-item">
                <div className="awards-item__preview">
                    {this.renderImage(
                        this.props.award.url,
                        this.props.award.preview,
                        createAwardUid(this.props.award.aid),
                        this.props.itemImageDidChange,
                        this.props.itemImageDidReset,
                        this.props.uploadPath,
                        this.props.edit)}
                </div>
                <div className="awards-item__info">
                    <div className="awards-about">
                        <div className="awards-about__header">
                            <div className="awards-about__title">{this.renderName(this.props.award.name, this.props.edit)}</div>
                            {this.renderIcons(
                                this.props.itemWillCancel,
                                this.props.itemWillDelete,
                                this.props.itemWillEdit,
                                this.props.itemWillSave,
                                this.props.edit
                            )}
                        </div>
                        <div className="awards-about__details">{this.renderDetails(this.props.award.desc, this.props.edit)}</div>
                    </div>
                </div>
            </li>
        );
    }

    renderDetails(value, edit) {
        return edit ? (
            <textarea className="form-control"
                      rows="3"
                      placeholder="Enter description"
                      onChange={e => this.textDidChange('desc', e.target.value)}
                      value={value}></textarea>
        ) : value;
    }

    renderIcons(cancelListener, deleteListener, editListener, saveListener, edit) {
        let dangerButton, successButton;

        if (edit) {
            dangerButton = <RoundButton
                icon="fa-trash"
                animate={true}
                role="danger"
                clickListener={deleteListener}/>;
            successButton = <RoundButton
                icon="fa-check"
                animate={true}
                role="success"
                clickListener={saveListener}/>;
        }

        return (
            <div className="awards-about__icon">
                {dangerButton}
                {successButton}
                <RoundButton icon="fa-pencil" role={edit ? 'active' : null} clickListener={edit ? cancelListener : editListener}/>
            </div>
        );
    }

    renderImage(url, preview, aid, selectListener, resetListener, uploadPath, edit) {
        let previewUrl = preview !== undefined ? preview : url;
        return edit ? (
            <ImageManager
                entityId={aid}
                imageDidSelect={(file, url) => selectListener(url)}
                imageWillRemove={resetListener}
                previewUrl={previewUrl}
                uploadUrl={uploadPath}/>
        ) : <img className="awards-item__image" src={url}/>;
    }

    renderName(value, edit) {
        return edit ? (
            <input
                type="text"
                className="form-control"
                placeholder="Enter name"
                onChange={e => this.textDidChange('name', e.target.value)}
                value={value}/>
        ) : value;
    }

    textDidChange(field, value) {
        let award = this.props.award;
        award[field] = value;
        this.props.itemDidEdit(award);
    }
}

AwardsListItemView.propTypes = {
    award             : React.PropTypes.object.isRequired,
    edit              : React.PropTypes.bool.isRequired,
    itemDidEdit       : React.PropTypes.func.isRequired,
    itemImageDidChange: React.PropTypes.func.isRequired,
    itemImageDidReset : React.PropTypes.func.isRequired,
    itemWillCancel    : React.PropTypes.func.isRequired,
    itemWillDelete    : React.PropTypes.func.isRequired,
    itemWillEdit      : React.PropTypes.func.isRequired,
    itemWillSave      : React.PropTypes.func.isRequired,
    uploadPath        : React.PropTypes.string.isRequired
};
