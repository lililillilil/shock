const glob = require('glob');
const Driver = require('./Driver');
const DriverSet = require('./DriverSet');

/**
 * Loader
 */
class Loader {
    /**
     * @param {String} confLocation
     */
    constructor(confLocation) {
        this.driversLocation = confLocation + "/drivers";

        this.loadDrivers = this.loadDrivers.bind(this);
    }

    /**
     * loadDrivers the Loader
     */
    loadDrivers() {
        const drivers = new DriverSet();
        console.log('In the driver loader with confLoc : ' + this.driversLocation);
        glob(this.driversLocation + "/*.yml", (er, files) => {
            files.forEach(file => {
                drivers.add(new Driver(file));
            })
        })

        return drivers;
    }
}

module.exports = Loader;
