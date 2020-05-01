const yargs = require('yargs');
const { primary, success, error, warning, inverse } = require('./utils/chalkUtil');
const {geocode} = require('./utils/geocode');
const {forecast} = require('./utils/forecast');

yargs.command({
    command: 'weather',
    describe: 'Get Weather for Location',
    builder: {
        location: {
            describe: 'Location for weather query',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        if (argv.location === undefined || argv.location ==='') {
            return console.log(error('you need to provide a valid location.'));
        }
        geocode(argv.location, (err, {longitude, latitude, placeName} = {}) => {
            if (err) {
                return console.log(error(err));
            } else {
                forecast(longitude,latitude, (err, {timezone, weather, temperature, feelslike} = {}) => {
                    if (err) {
                        return console.log(error(e));
                    } else {
                        console.log(`Place : ${success.inverse(placeName)}`);
                        console.log(`Time Zone : ${success.inverse(timezone)}`);
                        console.log(`Weather : ${success.inverse(weather)}`);
                        console.log(`Temperature : ${success.inverse(temperature)}`);
                        console.log(`Feels Like : ${success.inverse(feelslike)}`);
                    }
                });
            }
        });
    }
});

yargs.parse();

