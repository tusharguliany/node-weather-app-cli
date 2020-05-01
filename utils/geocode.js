const request = require('postman-request');
const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiZ3VsaWFueSIsImEiOiJjazludjZpdmgwNXd4M21taHN3ZjBobjFvIn0.N9Rzgk8opD_b3KOnraWE0Q&limit=1`;
    request ({url: url, json: true}, (err, response) => {
        if (err) {
            callback(`Unable to connect to Location services.`, undefined);
        } else if (response.body.message) {
            callback(`${response.body.message}`, undefined);
        } else if (response.body.features.length === 0) {
            callback(`No Locations found with registered Address. Try other search.`, undefined);
        } else {
            callback(undefined, {
                longitude: response.body.features[0].center[0],
                latitude:  response.body.features[0].center[1],
                placeName: response.body.features[0].place_name
            });
        }
    });
}

module.exports = {
    geocode: geocode
}