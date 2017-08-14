const DeviceSet = require('./DeviceSet');

/**
* Show
*
* This class is not more than a container for Devices & IRLEvents
*/
class Show {
    /**
    * @param {Map} irlEvents
    */
    constructor(devices, irlEvents) {
        this.devices = devices;
        this.irlEvents = irlEvents;

        this.getCommand = this.getCommand.bind(this);
    }

    getCommand(name) {
        return this.commands.find(commands => commands.name.toLowerCase() === name.toLowerCase());
    }

    /**
     * Trigger the irl event
     *
     * @param {String} uid for the irl event that is triggered
     */
    trigger(uid) {
        if (!this.irlEvents.has(uid)) {
            throw Error(`No irl event found with uid "${uid}".`);
        }

        const irlEvent = this.irlEvents.get(uid);

        irlEvent.trigger();
    }
}

module.exports = Show;
