const Device = require('./Device');

/**
 * List of named device
 */
class DeviceSet {
    /**
     * @param {Array} devices
     */
    constructor(devices = []) {
        this.devices = new Map();

        this.add = this.add.bind(this);
        this.get = this.get.bind(this);

        devices.forEach(this.add);
    }

    /**
    * Register a device
    *
    * @param {Device} device
    */
    add(device) {
        if (!device instanceof Device) {
            throw new Error('Must be a Device.');
        }

        const { name } = device;

        if (this.devices.has(name)) {
            throw new Error(`A device with the name "${name}" already exists.`);
        }

        this.devices.set(name, device);
    }

    /**
    * Get a device by name
    *
    * @param {String} name
    */
    get(name) {
        if (!this.devices.has(name)) {
            throw new Error(`Device "${name}" no found, available: ${Array.from(this.devices.keys()).join(', ')}."`);
        }

        return this.devices.get(name);
    }
}

module.exports = DeviceSet;
