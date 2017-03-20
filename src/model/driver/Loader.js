const glob = require('glob');
const Driver = require('./Driver');

/**
 * Loader
 */
class Loader {
    /**
     * @param {String} confLocation
     */
    constructor(confLocation) {
        this.driversLocation = confLocation + "/drivers";
        this.drivers = [];

        this.loadDrivers = this.loadDrivers.bind(this);
    }

    /**
     * loadDrivers the Loader
     */
    loadDrivers() {
        console.log('In the driver loader with confLoc : ' + this.driversLocation);
        glob(this.driversLocation + "/*.yml", (er, files) => {
            files.forEach(file => {
                this.drivers.push(new Driver(file));
                console.log(this.drivers);
            })
          // files is an array of filenames.
          // If the `nonull` option is set, and nothing
          // was found, then files is ["**/*.js"]
          // er is an error object or null.
        })
    }
}

module.exports = Loader;
