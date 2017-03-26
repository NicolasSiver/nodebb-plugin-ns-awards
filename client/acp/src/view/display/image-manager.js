import classNames from 'classnames';
import React from 'react';

import RoundButton from './round-button';
import Uploader from './uploader';

export default class ImageManager extends React.Component {
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
                        <Uploader {...this.props}/>
                    </div>
                </div>
                {removeButton}
            </div>
        );
    }
}

ImageManager.propTypes = {
    imageWillRemove: React.PropTypes.func.isRequired,
    previewUrl     : React.PropTypes.string
};
