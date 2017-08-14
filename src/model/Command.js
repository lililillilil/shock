const Device = require('./Device');

/**
 * Command
 *
 * A Command represents a order sent to a single or many Devices that must respond to the same control interface
 */
class Command {
    /**
     * @param {String} name
     * @param {Function} callback
     */
    constructor(name, uid, devices, method, args) {
        this.name = name;
        this.uid = uid;
        this.devices = devices;
        this.method = method;
        this.args = args;

        this.execute = this.execute.bind(this);
        this.triggerDevice = this.triggerDevice.bind(this);
    }

    /**
     * Execute the command, triggering the defined method for each device
     */
    execute() {
        this.devices.forEach(this.triggerDevice);
    }

    /**
     * Execute on each device, the current method with arguments
     *
     * @param  {[type]} device [description]
     */
    triggerDevice(device) {
        device[this.method](this.args);
    }
}

module.exports = Command;
