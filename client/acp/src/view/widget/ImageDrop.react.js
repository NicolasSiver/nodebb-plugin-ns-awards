var React      = require('react'),
    Actions    = require('../actions/Actions'),
    Dropzone   = require('dropzone'),
    classNames = require('classnames'),

    dropzone   = null;

var ImageDrop = React.createClass({
    propTypes: {
        action        : React.PropTypes.string.isRequired,
        dataUrl       : React.PropTypes.string.isRequired,
        imageDidSelect: React.PropTypes.func.isRequired,
        success       : React.PropTypes.func.isRequired,
        error         : React.PropTypes.func,
        uploadProgress: React.PropTypes.func.isRequired
    },

    componentDidMount: function () {
        var self = this;

        Dropzone.autoDiscover = false;

        dropzone = new Dropzone(this.view, {
            url      : this.props.action,
            paramName: 'award',
            clickable: true,
            maxFiles : 1,

            //Overwrite Dropzone events
            addedfile: function (file) {
            },

            error: function (file, error) {
                self.props.error(file, error);
            },

            success: function (file, response) {
                self.props.success(file, response);
            },

            thumbnail: function (file, dataUrl) {
                self.props.imageDidSelect(file, dataUrl);
            },

            uploadprogress: function (file, progress, bytesSent) {
                self.props.uploadProgress(file, progress, bytesSent);
            }
        });
    },

    componentWillUnmount: function () {
        dropzone.destroy();
        dropzone = null;
    },

    //Dropzone should be presented in render always
    render: function () {
        var previewAvailable = !!this.props.dataUrl;
        var previewClass = classNames({
                'award-preview': previewAvailable,
                'center-block' : previewAvailable
            }),
            iconClass    = classNames({
                'fa'               : true,
                'fa-cloud-upload'  : true,
                'award-upload-icon': true,
                'hidden'           : previewAvailable
            }),
            imageClass   = classNames({
                'img-responsive': true,
                'hidden'        : !previewAvailable
            });

        return (
            <div className={previewClass}>
                <img className={imageClass} src={this.props.dataUrl}/>
                <i className={iconClass} ref={function(view) {
                    this.view = view;
                }.bind(this)}></i>
            </div>
        );
    }
});

module.exports = ImageDrop;