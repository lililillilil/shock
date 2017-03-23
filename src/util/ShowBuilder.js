const Show = require('../model/Show');
const Screen = require('../model/Screen');
const Command = require('../model/Command');
const { loadYaml, keyAsAttribute } = require('./YamlLoader');

class ShowBuilder {
    /**
     * Devices
     *
     * @type {Map}
     */
    static get devices() {
        return new Map([
            ['watchout', require('../model/device/Watchout')],
            ['optoma-projector', require('../model/device/OptomaProjector')],
        ]);
    }

    /**
     * Constructor
     */
    constructor() {
        this.createDevice = this.createDevice.bind(this);
        this.createScreen = this.createScreen.bind(this);
        this.createCommand = this.createCommand.bind(this);
    }

    /**
     * Load a Show from the given file
     *
     * @param {String} path
     *
     * @return {Show}
     */
    load(path) {
        const data = loadYaml(path);

        if (!data) {
            return console.error('Could not parse the show file.');
        }

        return this.create(data);
    }

    /**
     * Create a Show from data
     *
     * @param {Object} data
     *
     * @return {Show}
     */
    create(data) {
        const { devices, screens } = data;

        const show = new Show(
            keyAsAttribute(devices).map(this.createDevice)
        );

        keyAsAttribute(screens, 'title').forEach(screen => show.addScreen(this.createScreen(screen, show.devices)));

        return show;
    }

    /**
     * Create a device
     *
     * @param {Object} data
     *
     * @return {Device}
     */
    createDevice(data) {
        const { name, host, port, driver } = data;
        const Device = this.getDeviceClass(driver);

        return new Device(name, host, port);
    }

    createScreen(data, devices) {
        const { title, triggers } = data;

        return new Screen(
            title,
            keyAsAttribute(triggers).map(trigger => this.createCommand(trigger, devices))
        );
    }

    createCommand(data, deviceSet) {
        const { name, action } = data;
        const devices = data.devices.map(deviceSet.get);
        const callbacks = devices.map(device => this.createCommandCallback(device, action));

        return new Command(name, () => callbacks.forEach(callback => callback()));
    }

    createCommandCallback(device, action) {
        if (typeof action === 'string') {
            return device[action];
        }

        const { name, args } = action;

        return () => { return device[name](...args) };
    }

    /**
     * Get device class by name
     *
     * @param {String} name
     *
     * @return {Function}
     */
    getDeviceClass(name) {
        const { devices } = ShowBuilder;
        const key = name.toLowerCase();

        if (!devices.has(key)) {
            throw new Error(`Unkown device "${name}", available: ${Array.from(devices.keys()).join(', ')}.`);
        }

        return devices.get(key);
    }
}

module.exports = ShowBuilder;
