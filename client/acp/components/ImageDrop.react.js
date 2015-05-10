var React          = require('react'),
    ReactPropTypes = React.PropTypes,
    Actions        = require('../actions/Actions'),
    Dropzone       = require('dropzone'),

    dropzone       = null;

var ImageDrop = React.createClass({
    propTypes: {
        action        : ReactPropTypes.string.isRequired,
        dataUrl       : ReactPropTypes.string.isRequired,
        imageDidSelect: ReactPropTypes.func.isRequired,
        success       : ReactPropTypes.func.isRequired,
        uploadProgress: ReactPropTypes.func.isRequired
    },

    componentDidMount: function () {
        var self = this;

        Dropzone.autoDiscover = false;

        dropzone = new Dropzone(this.getDOMNode(), {
            url      : this.props.action,
            paramName: 'award',
            clickable: true,
            maxFiles : 1,

            //Overwrite Dropzone events
            addedfile: function (file) {
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

    render: function () {
        if (this.props.dataUrl) {
            return (
                <div className="award-preview center-block">
                    <img className="img-responsive" src={this.props.dataUrl}/>
                </div>
            );
        }
        return (
            <i className="fa fa-cloud-upload award-upload-icon"></i>
        );
    }
});

module.exports = ImageDrop;