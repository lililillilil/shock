const net = require('net');
const { StringDecoder } = require('string_decoder');

/**
 * Virtual device
 *
 * Usage: node VirtualDevice.js [port] [host]
 */
class VirtualDevice {
  /**
   * @param {Number} port
   * @param {String} host
   */
  constructor(port = 8124, host = 'localhost') {
    console.log('New virtual device at %s:%s', host, port);

    this.onListen = this.onListen.bind(this);
    this.onConnect = this.onConnect.bind(this);
    this.onDisconnect = this.onDisconnect.bind(this);
    this.onError = this.onError.bind(this);
    this.onData = this.onData.bind(this);

    this.decoder = new StringDecoder('utf8');
    this.server = net.createServer(this.onConnect);

    this.server.on('error', this.onError);
    this.server.listen(port, host, this.onListen);
  }

  /**
   * Send data through the given socket
   *
   * @param {Socket} socket
   * @param {String} message
   */
  send(socket, message) {
    socket.write(message + '\r\n');
    socket.pipe(socket);
  }

  /**
   * On server listening
   */
  onListen() {
    console.info('Listening...');
  }

  /**
   * On client connected
   *
   * @param {Socket} socket
   */
  onConnect(socket) {
    console.info('Client connected.');

    socket.on('end', this.onDisconnect);
    socket.on('data', this.onData);
  }

  /**
   * On client disconnected
   */
  onDisconnect() {
    console.info('Client disconnected.')
  }

  /**
   * On data received
   *
   * @param {Buffer} buffer
   */
  onData(buffer) {
    console.log('>', this.decoder.end(buffer));
  }

  /**
   * On error
   *
   * @param {Error} error
   */
  onError(error) {
    throw error;
  }
}

module.exports = new VirtualDevice(...process.argv.slice(2));
