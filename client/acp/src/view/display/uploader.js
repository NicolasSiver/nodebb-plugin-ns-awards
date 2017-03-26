import Dropzone from 'dropzone';
import React from 'react';

export default class Uploader extends React.Component {
    constructor(props) {
        super(props);
        // Disable auto discover for all elements
        Dropzone.autoDiscover = false;
    }

    componentDidMount() {
        this.dropzone = new Dropzone(this.view, {
            url      : this.props.uploadUrl,
            paramName: 'award',
            clickable: true,
            maxFiles : 1,

            // An error occured. Receives the errorMessage as second parameter
            // and if the error was due to the XMLHttpRequest the xhr object as third.
            error: (file, error) => this.props.uploadDidFail(file, error),

            // The file has been uploaded successfully. Gets the server response as second argument.
            success: (file, response) => this.props.imageDidUpload(file, response),

            // When the thumbnail has been generated. Receives the dataUrl as second parameter.
            thumbnail: (file, dataUrl) => this.props.imageDidSelect(file, dataUrl),

            // Gets called periodically whenever the file upload progress changes.
            // Gets the progress parameter as second parameter which is a percentage (0-100) and the bytesSent parameter as third which is the number of the bytes that have been sent to the server.
            // When an upload finishes dropzone ensures that uploadprogress will be called with a percentage of 100 at least once.
            // Warning: This function can potentially be called with the same progress multiple times.
            uploadprogress: (file, progress, bytesSent) => {
                let transfer = this.props.dataDidTransfer;
                if (transfer !== undefined) {
                    transfer(file, progress, bytesSent);
                }
            }
        });
    }

    componentWillUnmount() {
        if (this.dropzone !== null) {
            this.dropzone.destroy();
            this.dropzone = null;
        }
    }

    render() {
        return (
            <div className="uploader">
                <i className="uploader__icon fa fa-cloud-upload fa-3x" ref={view => (this.view = view)}></i>
            </div>
        );
    }

}

Uploader.propTypes = {
    dataDidTransfer: React.PropTypes.func,
    imageDidSelect : React.PropTypes.func.isRequired,
    imageDidUpload : React.PropTypes.func.isRequired,
    uploadDidFail  : React.PropTypes.func.isRequired,
    uploadUrl      : React.PropTypes.string.isRequired
};
