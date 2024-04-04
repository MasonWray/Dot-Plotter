export default class ApplicationDataException extends Error {
    constructor(msg: string) {
        super(msg);
        Object.setPrototypeOf(this, ApplicationDataException.prototype);
    }
}