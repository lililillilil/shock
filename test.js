const ShowBuilder = require('./src/util/ShowBuilder');
const DriverLoader = require('./src/model/driver/Loader');

module.exports = function(confLocation) {
    const drivers = new DriverLoader(confLocation).loadDrivers();
    setTimeout(function(){console.log(drivers)}, 2000);

    return new ShowBuilder().load('./example/show.yml');
}
