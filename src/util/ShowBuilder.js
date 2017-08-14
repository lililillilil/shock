const path = require('path');
const Show = require('../model/Show');
const IRLEvent = require('../model/IRLEvent');
const Command = require('../model/Command');
const { loadYaml, keyAsAttribute } = require('./YamlLoader');

class ShowBuilder {
    /**
     * Devices
     *
     * @type {Map}
     */
    static get availableDevices() {
        return new Map([
            ['watchout-producer', require('../model/device/WatchoutProducer')],
            ['optoma-projector', require('../model/device/OptomaProjector')],
        ]);
    }

    /**
     * Constructor
     */
    constructor() {
        this.availableDevices;
        this.IRLEvents;

        this.createDevice = this.createDevice.bind(this);
        this.createIRLEvent = this.createIRLEvent.bind(this);
        this.createCommand = this.createCommand.bind(this);
        this.getDevice = this.getDevice.bind(this);
    }

    /**
     * Load a Show from the given file
     *
     * @param {String} path
     *
     * @return {Show}
     */
    load(path) {
        console.log(path);
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
        const { devices, irl_events } = data;

        // creating list of devices needed in conf file matching those available in the software
        this.devices = new Map();
        for (let device in devices) {
            if (devices.hasOwnProperty(device)) {
                let objDevice = this.createDevice(devices[device]);
                this.devices.set(objDevice['name'], objDevice);
            }
        }

        // Building list of IRLEvents
        const irlEvents = new Map();
        for (let event in irl_events) {
            if (irl_events.hasOwnProperty(event)) {
                let irlEvent = this.createIRLEvent(irl_events[event]);
                irlEvents.set(irlEvent['uid'], irlEvent);
            }
        }

        return new Show(devices, irlEvents);
    }

    /**
     * Create a device
     *
     * @param {Object} data
     *
     * @return {Device}
     */
    createDevice(data) {
        const { name, host, port, protocol } = data;

        if (!ShowBuilder.availableDevices.has(protocol)) {
            throw new Error(`Unkown device "${protocol}", available: ${Array.from(ShowBuilder.availableDevices.keys()).join(', ')}.`);
        }
        const device = ShowBuilder.availableDevices.get(protocol);

        return new device(name, host, port);
    }

    createIRLEvent(data) {
        const { name, uid, commands } = data;

        const commandObjects = commands.map(this.createCommand);

        return new IRLEvent(name, uid, commandObjects);
    }

    createCommand(data) {
        const { name, uid, devices, method, args } = data;

        const commandDevices = new Map();
        for (let device in devices) {
            if (devices.hasOwnProperty(device)) {
                let objDevice = this.getDevice(devices[device]);
                commandDevices.set(objDevice['name'], objDevice);
            }
        }

        return new Command(name, uid, commandDevices, method, args);
    }

    /**
     * Get the specified device in the conf from available devices of the show
     *
     * @param {Object} data
     *
     * @return {Device}
     */
    getDevice(name) {
        if (!this.devices.has(name)) {
            throw new Error(`Unkown device "${name}", available: ${Array.from(this.devices.keys()).join(', ')}.`);
        }

        return this.devices.get(name);
    }
}

module.exports = ShowBuilder;
