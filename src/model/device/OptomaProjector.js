const Device = require('../Device');
const TCPChannel = require('../channel/TCPChannel');

/**
 * Optoma Projector
 */
class OptomaProjector extends Device {
    /**
     * @param {String} name
     * @param {String} host
     * @param {String} port
     */
    constructor(name, host, port) {
        super(name, new TCPChannel(host, port));
    }
}

module.exports = OptomaProjector;
