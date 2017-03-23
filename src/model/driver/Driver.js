

/**
 * Driver
 */
class Driver {
    /**
     * @param {String} filePath of the yml
     */
    constructor(filePath) {
        this.uid = filePath.substring(filePath.lastIndexOf('/') + 1, filePath.lastIndexOf('.'));
        this.filePath = filePath;

        // driver is loaded only when needed
        this.loaded = false;
    }
}

module.exports = Driver;
