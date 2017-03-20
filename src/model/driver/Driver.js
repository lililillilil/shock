

/**
 * Driver
 */
class Driver {
    /**
     * @param {String} uid
     * @param {Function} callback
     */
    constructor(driverLocation) {
        this.uid = 'uid';

        this.execute = this.execute.bind(this);
    }

    /**
     * Execute the Driver
     */
    execute() {
        this.callback();
    }
}

module.exports = Driver;
