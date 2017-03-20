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
     * Run
     */
    run() {
        this.channel.send('run');
    }

    /**
     * Halt
     */
    halt() {
        this.channel.send('halt');
    }
}

module.exports = Watchout;
