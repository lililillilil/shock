/**
 * Command
 */
class Command {
    /**
     * @param {String} name
     * @param {Function} callback
     */
    constructor(name, callback) {
        this.name = name;
        this.callback = callback;

        this.execute = this.execute.bind(this);
    }

    /**
     * Execute the command
     */
    execute() {
        this.callback();
    }
}

module.exports = Command;
