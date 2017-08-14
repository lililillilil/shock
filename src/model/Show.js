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
        this.ipcRenderer;

        this.getCommand = this.getCommand.bind(this);
        this.attachIPCRenderer = this.attachIPCRenderer.bind(this);
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

        if (this.ipcRenderer) {
            irlEvent.attachIPCRenderer(this.ipcRenderer);
        }
        irlEvent.trigger();
    }

    /**
     * Attach the ipcRenderer that triggered the show event
     *
     * @param  {[type]} ipcRenderer
     */
    attachIPCRenderer(ipcRenderer) {
        this.ipcRenderer = ipcRenderer;
    }
}

module.exports = Show;
