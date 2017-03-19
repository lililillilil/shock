/**
 * Device
 */
class Device {
    /**
     * @param {String} name
     * @param {Channel} channel
     */
    constructor(name, channel) {
        this.name = name;
        this.channel = channel;
    }
}

module.exports = Device;
