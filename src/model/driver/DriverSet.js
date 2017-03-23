const Driver = require('./Driver');

/**
 * List of unique Drivers
 */
class DriverSet {
    /**
     * @param {Array} driver ids
     */
    constructor(driverIds = []) {
        this.drivers = new Map();

        this.add = this.add.bind(this);

        driverIds.forEach(this.add);
    }

    /**
    * Register a driver id
    *
    * @param {string} driver id
    */
    add(driver) {
        if (!driver instanceof Driver) {
            throw new Error('Must be a Driver.');
        }

        const { uid } = driver;

        if (this.drivers.has(uid)) {
            throw new Error(`A driver with the uid "${uid}" already exists.`);
        }

        this.drivers.set(uid, driver);
    }
}

module.exports = DriverSet;
