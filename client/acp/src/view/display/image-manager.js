import classNames from 'classnames';
import React from 'react';

import * as LoaderEvents from '../../model/loader-events';
import RoundButton from './round-button';
import UploadService from '../../service/upload-service';

export default class ImageManager extends React.Component {
    componentDidMount() {
        let loader = UploadService.sharedInstance().add(this.props.entityId, this.view, this.props.uploadUrl);
        loader.on(LoaderEvents.THUMBNAIL_DID_CHANGE, (file, dataUrl) => {
            this.props.imageDidSelect(file, dataUrl);
        });
    }

    componentWillUnmount() {
        UploadService.sharedInstance().remove(this.props.entityId);
    }

    render() {
        let preview = this.props.previewUrl !== null;
        let removeButton = null, imagePreview = null;
        let uploaderClass = classNames('image-manager__uploader', {
            'aws-hidden': preview
        });

        if (preview) {
            imagePreview = <img
                className="image-manager__preview"
                src={this.props.previewUrl}/>;

            removeButton = <div className="image-manager__remove">
                <RoundButton icon="fa-trash" role='danger' clickListener={() => this.props.imageWillRemove()}/>
            </div>;
        }

        return (
            <div className="image-manager">
                <div className="image-manager__content">
                    {imagePreview}
                    <div className={uploaderClass}>
                        <i className="image-manager__icon fa fa-cloud-upload fa-3x" ref={view => (this.view = view)}/>
                    </div>
                </div>
                {removeButton}
            </div>
        );
    }
}

ImageManager.propTypes = {
    entityId       : React.PropTypes.string.isRequired,
    imageWillRemove: React.PropTypes.func.isRequired,
    imageDidSelect : React.PropTypes.func.isRequired,
    previewUrl     : React.PropTypes.string,
    uploadUrl      : React.PropTypes.string.isRequired
};
