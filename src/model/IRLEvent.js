const Command = require('./Command');

/**
 * IRLEvent
 *
 * An IRL event is made of a succession of Commands
 */
class IRLEvent {
    /**
     * @param {String} name
     * @param {String} uid
     * @param {Array} commands
     */
    constructor(name, uid, commands = []) {
        this.name = name;
        this.uid = uid;
        this.commands = new Map();

        this.addCommand = this.addCommand.bind(this);
        this.trigger = this.trigger.bind(this);

        commands.forEach(this.addCommand);
    }

    /**
     * Execute the commands in order they are stored in this IRLEvent
     */
    trigger() {
        this.commands.forEach(command => { command.execute(); });
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

        const { uid } = command;

        if (this.commands.has(uid)) {
            throw new Error(`A command with the uid "${uid}" already exists.`);
        }

        this.commands.set(uid, command);
    }
}

module.exports = IRLEvent;
