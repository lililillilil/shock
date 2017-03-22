const Command = require('./Command');

/**
 * List of named command
 */
class CommandSet {
    /**
     * @param {Array} commands
     */
    constructor(commands = []) {
        this.commands = new Map();

        this.add = this.add.bind(this);

        commands.forEach(this.add);
    }

    /**
    * Register a command
    *
    * @param {Command} command
    */
    add(command) {
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

module.exports = CommandSet;
