const request = require('request')

const forecast = (longtitude, latitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=aee99c1e385cdaf87f32c9890ea75d10&query='+ latitude + ',' + longtitude
    request({url, json: true}, (error, {body}) => {
        if (error, undefined) {
            callback('Unable to connect to weather services', undefined)
        }else if (body.error, undefined) {
            callback('Unable to find location', undefined)
        }else{
            const current = body.current.weather_descriptions
            const temp = body.current.temperature
            const feelslike = body.current.feelslike
            const windSpeed = body.current.wind_speed
            callback(undefined, "The current weather is " + current + ". The temperature is " + temp + " degrees and it feels like " + feelslike + " degrees. There is a wind speed of " + windSpeed + "mph." )
        }
    })
}

module.exports = forecast