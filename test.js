// A dummy Show, for test purpose.

const Watchout = require('./src/model/device/Watchout');
const Command = require('./src/model/Command');
const Show = require('./src/model/Show');

// Devices
const watchoutComputer = new Watchout('Watchout computer', 'localhost'/*'192.168.0.100'*/, 3040);

// Commands
const commands = [
    new Command('stop', () => watchoutComputer.goTo(0)),
    new Command('play', watchoutComputer.run),
    new Command('pause', watchoutComputer.halt),
];

module.exports = new Show([watchoutComputer], commands);
