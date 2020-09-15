const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=15fb96f3b979e90c3c5128f355896dd8&query=${latitude},${longitude}`
    // weatherstack API
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            const temp = body.current.temperature
            const feelslike = body.current.feelslike
            const descrips = body.current.weather_descriptions
            const precip = body.current.precip
            callback(undefined, `${descrips[0]}. It is currently ${temp} degrees out, but it feels like ${feelslike} degrees. There is a precipitation chance of ${precip}.`)
        }
    })
}

module.exports = forecast