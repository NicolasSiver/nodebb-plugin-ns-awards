import Dropzone from 'dropzone';

import * as LoaderEvents from '../model/loader-events';

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

                    headers: {
                        'NS-Award-Entity-ID': id
                    },

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
            },

            start: id => {
                let loader;
                let errorListener, successListener;

                return new Promise((resolve, reject) => {
                    loader = loaders[id];

                    if (loader === undefined) {
                        reject(new Error('Can not find loader with ID: ' + id));
                    }

                    function manageListeners(add) {
                        loader[add ? 'on' : 'off'](LoaderEvents.ERROR_DID_OCCUR, errorListener);
                        loader[add ? 'on' : 'off'](LoaderEvents.FILE_DID_UPLOAD, successListener);
                    }

                    errorListener = (file, error) => {
                        manageListeners(false);
                        reject(error);
                    };

                    successListener = (file, response) => {
                        manageListeners(false);
                        resolve({file, response});
                    };

                    manageListeners(true);
                    loader.processQueue();
                });
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
