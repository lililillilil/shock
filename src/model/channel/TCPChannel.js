const net = require('net');
const Channel = require('../Channel');

/**
 * TCP Channel
 */
class TCPChannel extends Channel {
  /**
   * @param {String} host
   * @param {Number} port
   * @param {Boolean} autoOpen
   */
  constructor(host, port, autoOpen = true) {
    super();

    this.host = host;
    this.port = port;
    this.socket = null;

    this.onConnect = this.onConnect.bind(this);
    this.onClose = this.onClose.bind(this);
    this.onEnd = this.onEnd.bind(this);
    this.onTimeout = this.onTimeout.bind(this);
    this.onError = this.onError.bind(this);
    this.onData = this.onData.bind(this);

    if (autoOpen) {
      this.open();
    }
  }

  /**
   * Open the connection
   */
  open() {
    if (!this.socket) {
      this.socket = net.createConnection(this.port, this.host, this.onConnect);
      this.socket.on('close', this.onClose);
      this.socket.on('end', this.onEnd);
      this.socket.on('timeout', this.onTimeout);
      this.socket.on('error', this.onError);
      this.socket.on('data', this.onData);
    }
  }

  /**
   * Close the connection
   */
  close() {
    if (this.socket) {
      this.socket.end();
      this.socket = null;
    }
  }

  /**
   * Send a message through the connection
   *
   * @param {String} message
   */
  send(message) {
    this.socket.write(message);
  }

  /**
   * On socket receive data
   */
  onData(data) {
    console.info('Data received', data);
  }

  /**
   * On socket connect
   */
  onConnect() {
    console.info('Connection to %s:%s open.', this.host, this.port);
  }

  /**
   * On socket close
   */
  onClose() {
    console.info('Connection to %s:%s closed.', this.host, this.port);
  }

  /**
   * On socket end
   */
  onEnd() {
    console.info('Connection to %s:%s ended.', this.host, this.port);
  }

  /**
   * On socket timeout
   */
  onTimeout() {
    console.info('Connection to %s:%s timed out.', this.host, this.port);
  }

  /**
   * On socket error
   */
  onError(error) {
    console.error(error);
  }
}

module.exports = TCPChannel;
