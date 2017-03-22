const DeviceSet = require('./DeviceSet');

/**
* Show
*/
class Show {
    /**
    * @param {Array} devices
    * @param {Array} screens
    */
    constructor(devices = [], screens = []) {
        this.devices = new DeviceSet(devices);
        this.screens = screens;
    }

    addScreen(screen) {
        this.screens.push(screen);
    }

    getScreen(name) {
        return this.screens.find(screen => screen.name.toLowerCase() === name.toLowerCase());
    }

    /**
     * Execute the given command from the given screen
     *
     * @param {String} screenName
     * @param {String} commandName
     */
    execute(screenName, commandName) {
        const screen = this.getScreen(screenName);

        if (!screen) {
            throw Error(`No screen found with name "${screenName}".`);
        }

        screen.commands.execute(commandName);
    }
}

module.exports = Show;
