const request = require("request");

const geoCode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYXNodXRvc2hrdW1hciIsImEiOiJja2YzZ201c2kwMTRkMnVwOHozMHFna3d1In0.RpnNiq9S2eww9-Onfwn9mg&limit=1';
    request({ url, json: true }, (error, { body } = {}) => {

        if (error) {
            callback('Unable to connect to location services', undefined);
        } else if (body.features.length === 0) {
            callback('Location is not found', undefined);
        } else {
            callback(undefined, {
                longitute: body.features[0].center[0],
                latitute: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geoCode