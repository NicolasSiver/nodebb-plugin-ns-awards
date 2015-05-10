var React          = require('react'),
    ReactPropTypes = React.PropTypes,
    ImageDrop      = require('./ImageDrop.react'),
    classNames     = require('classnames'),
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
        var resetButton;
        var wrapperClass = classNames({
            'award-image-edit': !!preview
        });
        if (preview) {
            resetButton = <i className="fa fa-remove icon-danger icon-control" onClick={this.props.resetImage}></i>;
        }
        return (
            <div className={wrapperClass}>
                <ImageDrop
                    action={this.props.action}
                    dataUrl={preview}
                    imageDidSelect={this.props.imageDidSelect}
                    success={this.props.success}
                    uploadProgress={this.props.uploadProgress}/>
                {resetButton}
            </div>
        );
    }
});

module.exports = ImageUpdate;