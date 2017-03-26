import Dropzone from 'dropzone';

const uploadService = (() => {
    let instance = null;
    let loaders = {};

    function init() {
        // Disable auto discover for all elements
        Dropzone.autoDiscover = false;

        return {
            add: (id, view, uploadUrl) => {
                let loader = new Dropzone(view, {
                    url      : uploadUrl,
                    paramName: 'award',
                    clickable: true,
                    maxFiles : 1,

                    thumbnailWidth : null,
                    thumbnailHeight: null,

                    // When set to false you have to call myDropzone.processQueue() yourself
                    // in order to upload the dropped files. See below for more information on handling queues.
                    autoProcessQueue: false,

                    // Consume event to prevent Dropzone's default behavior
                    addedfile: () => undefined,

                    // An error occured. Receives the errorMessage as second parameter
                    // and if the error was due to the XMLHttpRequest the xhr object as third.
                    // error: (file, error) => this.props.uploadDidFail(file, error),

                    // The file has been uploaded successfully. Gets the server response as second argument.
                    // success: (file, response) => this.props.imageDidUpload(file, response),
                });

                loaders[id] = loader;

                return loader;
            },

            getLoader: id => loaders[id],

            remove: id => {
                let loader = loaders[id];
                if (loader !== undefined) {
                    loader.destroy();
                    delete loaders[id];
                }
            }
        };
    }

    return {
        sharedInstance: () => {
            if (instance === null) {
                instance = init();
            }
            return instance;
        }
    };
})();

export default uploadService;
