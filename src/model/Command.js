/**
 * Command
 */
class Command {
    /**
     * @param {String} value
     * @param {Device} device
     */
    constructor(value, device) {
        this.value = value;
        this.device = device;
    }

    /**
     * Execute the command
     */
    execute() {
        this.device.channel.handle(this);
    }
}

module.exports = Command;
