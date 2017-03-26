import classNames from 'classnames';
import React from 'react';

import RoundButton from './round-button';
import Uploader from './uploader';

export default class ImageManager extends React.Component {
    render() {
        let preview = false;
        let removeButton = null, uploader = null, imagePreview = null;

        if (preview) {
            removeButton = <div className="image-manager__remove">
                <RoundButton icon="fa-trash" role='danger' clickListener={() => undefined}/>
            </div>;

        } else {
            uploader = <div className="image-manager__uploader">
                <Uploader {...this.props}/>
            </div>;
        }

        return (
            <div className="image-manager">
                <div className="image-manager__content">
                    {imagePreview}
                    {uploader}
                </div>
                {removeButton}
            </div>
        );
    }
}

ImageManager.propTypes = {
};

// var React          = require('react'),
//     ImageDrop      = require('./ImageDrop.react'),
//     classNames     = require('classnames'),
//     pathUtils      = require('../utils/PathUtils');
//
// var ImageUpdate = React.createClass({
//     propTypes: {
//         currentImageUrl: React.PropTypes.string.isRequired,
//         action         : React.PropTypes.string.isRequired,
//         dataUrl        : React.PropTypes.string.isRequired,
//         imageDidSelect : React.PropTypes.func.isRequired,
//         success        : React.PropTypes.func.isRequired,
//         uploadProgress : React.PropTypes.func.isRequired,
//         resetImage     : React.PropTypes.func.isRequired
//     },
//
//     render: function () {
//         var preview = pathUtils.getAwardImageUri(this.props.currentImageUrl) || this.props.dataUrl;
//         var resetButton;
//         var wrapperClass = classNames({
//             'award-image-edit': !!preview
//         });
//         if (preview) {
//             resetButton = <i className="fa fa-remove icon-danger icon-control" onClick={this.props.resetImage}></i>;
//         }
//         return (
//             <div className={wrapperClass}>
//                 <ImageDrop
//                     action={this.props.action}
//                     dataUrl={preview}
//                     imageDidSelect={this.props.imageDidSelect}
//                     success={this.props.success}
//                     uploadProgress={this.props.uploadProgress}/>
//                 {resetButton}
//             </div>
//         );
//     }
// });
//
// module.exports = ImageUpdate;
