const Device = require('../Device');
const TCPChannel = require('../channel/TCPChannel');

/**
 * Watchout
 */
class Watchout extends Device {
    /**
     * @param {String} name
     * @param {String} host
     * @param {String} port
     */
    constructor(name, host, port) {
        super(name, new TCPChannel(host, port));

        this.goTo = this.goTo.bind(this);
        this.run = this.run.bind(this);
        this.halt = this.halt.bind(this);
    }

    /**
     * Go to the given point in time
     *
     * @param {Number} time
     */
    goTo(time) {
        this.channel.send(`gotoTime ${time}`);
    }

    /**
     * Trigger a specified timeline to run.
     *
     * @param {String} timeline Which auxillary timeline to halt. When non specified, main timeline will run.
     */
    run(timeline = '') {
        this.channel.send(`run ${timeline}`.trim());
    }

    /**
     * Trigger a specified timeline to pause.
     *
     * @param {String} timeline Which auxillary timeline to halt. When non specified, main timeline will halt.
     */
    halt(timeline = '') {
        this.channel.send(`halt ${timeline}`.trim());
    }

    /**
     * Load the show located at the specified path.
     *
     * @param {String} path Path to the show to be loaded
     * @param {Number} layer Conditional layer enable  ags, least signi cant bit is condition 1.
     * @param {Boolean} online Go online automatically, making the show to be ready to run.
     */
    loadShow(path, layer = 0, online = true) {
        this.channel.send(`load ${path} ${layer} ${online}`);
    }
}

module.exports = Watchout;
