const request = require('postman-request');

const forecast = (longitude, latitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=b39c38488882d5991f33a31f083f846a&query=${latitude},${longitude}&units=m`;
    request({url: url, json: true}, (err, response) => {
        if (err) {
            callback(`can not connect to weatherstack servers.`, undefined);
        } else if (response.body.error) {
            callback(`can not find location with specified coordinates.`, undefined);
        } else {
            const body = response.body;
            callback(undefined, {
                timezone: body.location.timezone_id,
                weather: body.current.weather_descriptions[0],
                temperature: body.current.temperature,
                feelslike: body.current.feelslike
            });
        }
    });
}

module.exports = {
    forecast
}