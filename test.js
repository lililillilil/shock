const Watchout = require('./src/model/device/Watchout');
const Command = require('./src/model/Command');
const Show = require('./src/model/Show');

// Devices
const watchoutComputer = new Watchout('Watchout computer', '192.168.0.100', 3040);

// Commands
const stop = new Command('gotoTime 0', watchoutComputer);
const play = new Command('run', watchoutComputer);
const pause = new Command('halt', watchoutComputer);

module.exports = new Show(
    [watchoutComputer],
    [stop, play, pause]
);
