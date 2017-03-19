/**
 * Command
 */
class Command {
    /**
     * @param {String} name
     * @param {String} value
     * @param {Device} device
     */
    constructor(name, value, device) {
        this.name = name;
        this.value = value;
        this.device = device;

        this.execute = this.execute.bind(this);
    }

    /**
     * Execute the command
     */
    execute() {
        this.device.channel.handle(this);
    }
}

module.exports = Command;
