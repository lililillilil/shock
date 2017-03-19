/**
 * Channel
 */
class Channel {
    /**
     * Send a command through the channel
     *
     * @param {Command} command
     */
    handle(command) {
        throw new Error('A Channel must implement the "handle" method.);');
    }
}

module.exports = Channel;
