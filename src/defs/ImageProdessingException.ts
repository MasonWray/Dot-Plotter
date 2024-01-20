export default class ImageProcessingException extends Error {
    constructor(msg: string) {
        super(msg);
        Object.setPrototypeOf(this, ImageProcessingException.prototype);
    }
}