// A dummy Show, for test purpose.

const Watchout = require('./src/model/device/Watchout');
const Command = require('./src/model/Command');
const Show = require('./src/model/Show');

// Devices
const watchoutComputer = new Watchout('Watchout computer', 'localhost'/*'192.168.0.100'*/, 3040);

// Commands
const commands = [
    new Command('stop', 'gotoTime 0', watchoutComputer),
    new Command('play', 'run', watchoutComputer),
    new Command('pause', 'halt', watchoutComputer),
];

module.exports = new Show([watchoutComputer], commands);
