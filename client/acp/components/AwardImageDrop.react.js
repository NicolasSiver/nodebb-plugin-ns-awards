var React          = require('react'),
    ReactPropTypes = React.PropTypes,
    Actions        = require('../actions/Actions'),
    Dropzone       = require('dropzone'),

    dropzone       = null;

var AwardImageDrop = React.createClass({
    propTypes: {
        action        : ReactPropTypes.string.isRequired,
        success       : ReactPropTypes.func.isRequired,
        uploadProgress: ReactPropTypes.func.isRequired
    },

    getInitialState: function () {
        return {
            dataUrl: null
        };
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
                self.setState({
                    dataUrl: dataUrl
                });
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
        if (this.state.dataUrl) {
            return (<img className="award-preview" src={this.state.dataUrl}/>);
        }
        return (
            <i className="fa fa-cloud-upload award-upload-icon"></i>
        );
    }
});

module.exports = AwardImageDrop;