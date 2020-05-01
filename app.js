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
        geocode(argv.location, (err, data) => {
            if (err) {
                return console.log(error(err));
            } else {
                const longitude = data.longitude;
                const latitude = data.latitude;
                const placeName = data.placeName;
                forecast(longitude,latitude, (err, forecastData) => {
                    if (err) {
                        return console.log(error(e));
                    } else {
                        forecastData.placeName = placeName;
                        console.log(forecastData);
                    }
                });
            }
        });
    }
});

yargs.parse();

