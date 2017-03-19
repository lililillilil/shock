const Command = require('./Command');

/**
* Show
*/
class Show {
    /**
    * @param {Array} devices
    * @param {Array} commands
    */
    constructor(devices, commands = []) {
        this.devices = devices;
        this.commands = new Map();

        this.addCommand = this.addCommand.bind(this);

        commands.forEach(this.addCommand);
    }

    /**
    * Register a command
    *
    * @param {Command} command
    */
    addCommand(command) {
        if (!command instanceof Command) {
            throw new Error('Must be a Command.');
        }

        const { name } = command;

        if (this.commands.has(name)) {
            throw new Error(`A command with the name "${name}" already exists.`);
        }

        this.commands.set(name, command);
    }

    /**
    * Execute the command with the given name
    *
    * @param {String} name
    */
    execute(name) {
        const command = this.commands.get(name);

        if (!command) {
            throw new Error(`Command "${name}" no found, available: ${Array.from(this.commands.keys()).join(', ')}."`);
        }

        command.execute();
    }
}

module.exports = Show;
