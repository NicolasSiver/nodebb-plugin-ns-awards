/**
 * An error occurred. Receives the errorMessage as second parameter
 * and if the error was due to the XMLHttpRequest the xhr object as third.
 *
 * @constant
 * @default
 * @type {string}
 */
export const ERROR_DID_OCCUR = 'error';

/**
 * When the thumbnail has been generated. Receives the dataUrl as second parameter.
 *
 * @constant
 * @default
 * @type {string}
 */
export const THUMBNAIL_DID_CHANGE = 'thumbnail';

/**
 * The file has been uploaded successfully. Gets the server response as second argument.
 *
 * @constant
 * @default
 * @type {string}
 */
export const FILE_DID_UPLOAD = 'success';
