const request = require('request');

const forecast = (longitute, latitute, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=2217d7dd21d11d24513d42f858a7f07f&query=' + encodeURIComponent(latitute) + ',' + encodeURIComponent(longitute) + '&units=f ';
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('unable to connect to weather service!!', undefined);
        } else if (body.error) {
            callback('Unable to find location', undefined);
        } else {
            callback(undefined, {
                forecastData: body.current.weather_descriptions[0] + ' ' + 'it is currently ' + body.current.temperature + ' degree celsuis. It feels like ' + body.current.feelslike + ' degrees. ' + 'The humidity is ' + body.current.humidity + '% in the area.'
                    // weatherDescription: body.current.weather_descriptions[0],
                    // temperatute: body.current.temperature,
                    // feelsLike: body.current.feelslike
            });
        }
    })
}

module.exports = forecast