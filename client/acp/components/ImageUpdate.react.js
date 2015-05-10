var React          = require('react'),
    ReactPropTypes = React.PropTypes,
    ImageDrop      = require('./ImageDrop.react'),
    pathUtils      = require('../utils/PathUtils');

var ImageUpdate = React.createClass({
    propTypes: {
        currentImageUrl: ReactPropTypes.string.isRequired,
        action         : ReactPropTypes.string.isRequired,
        dataUrl        : ReactPropTypes.string.isRequired,
        imageDidSelect : ReactPropTypes.func.isRequired,
        success        : ReactPropTypes.func.isRequired,
        uploadProgress : ReactPropTypes.func.isRequired,
        resetImage     : ReactPropTypes.func.isRequired
    },

    render: function () {
        var preview = pathUtils.getAwardImageUri(this.props.currentImageUrl) || this.props.dataUrl;
        if (preview) {
            return (
                <div className="award-image-edit">
                    <img className="img-responsive" src={preview}/>
                    <i className="fa fa-remove icon-danger icon-control" onClick={this.props.resetImage}></i>
                </div>
            );
        }
        return (
            <ImageDrop
                action={this.props.action}
                dataUrl={this.props.dataUrl}
                imageDidSelect={this.props.imageDidSelect}
                success={this.props.success}
                uploadProgress={this.props.uploadProgress}/>
        );
    }
});

module.exports = ImageUpdate;