var React          = require('react'),
    ImageDrop      = require('./ImageDrop.react'),
    classNames     = require('classnames'),
    pathUtils      = require('../utils/PathUtils');

var ImageUpdate = React.createClass({
    propTypes: {
        currentImageUrl: React.PropTypes.string.isRequired,
        action         : React.PropTypes.string.isRequired,
        dataUrl        : React.PropTypes.string.isRequired,
        imageDidSelect : React.PropTypes.func.isRequired,
        success        : React.PropTypes.func.isRequired,
        uploadProgress : React.PropTypes.func.isRequired,
        resetImage     : React.PropTypes.func.isRequired
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
