const CommandSet = require('./CommandSet');

/**
 * Screen
 */
class Screen {
    /**
     * @param {String} name
     * @param {Array} commands
     */
    constructor(name, commands = []) {
        this.name = name;
        this.commands = new CommandSet(commands);
    }
}

module.exports = Screen;
