const Device = require('../Device');
const TCPChannel = require('../channel/TCPChannel');

/**
 * Watchout
 */
class WatchoutProducer extends Device {
    /**
     * @param {String} name
     * @param {String} host
     * @param {String} port Default to 3040 for Watchout Producer
     */
    constructor(name, host, port = 3040) {
        super(name, new TCPChannel(host, port));

        this.termination = "\r\n";

        this.send = this.send.bind(this);
        this.goTo = this.goTo.bind(this);
        this.run = this.run.bind(this);
        this.halt = this.halt.bind(this);
    }

    /**
     * Send message through TCP connection after formatting it
     *
     * @param {String} message The message to be sent before formatting
     */
    send(message) {
        const formatted = message.trim() + this.termination;

        this.channel.send(formatted);
    }

    /**
     * Go to the given point in time
     *
     * @param {String} time position with following format HH:MM:SS.FFF (FFF is milliseconds)
     */
    goTo(time) {
        if (!time) {
            throw new Error(`Invalid argument for Dataton Watchout gotoTime order.`);
        }

        this.send(`gotoTime ${time}`);
    }

    /**
     * Trigger a specified timeline to run.
     *
     * @param {String} timeline Which auxillary timeline to halt. When non specified, main timeline will run.
     */
    run(timeline = '') {
        this.send(`run ${timeline}`);
    }

    /**
     * Trigger a specified timeline to pause.
     *
     * @param {String} timeline Which auxillary timeline to halt. When non specified, main timeline will halt.
     */
    halt(timeline = '') {
        this.send(`halt ${timeline}`);
    }

    /**
     * Load the show located at the specified path.
     *
     * @param {String} path Path to the show to be loaded
     * @param {Number} layer Conditional layer enable  ags, least signi cant bit is condition 1.
     * @param {Boolean} online Go online automatically, making the show to be ready to run.
     */
    loadShow(path, layer = 0, online = true) {
        this.send(`load ${path} ${layer} ${online}`);
    }
}

module.exports = WatchoutProducer;
