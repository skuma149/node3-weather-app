const request = require('request')

const geocode = (address,callback)=>{
    const geocodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1Ijoic3VyeWFuc2h1IiwiYSI6ImNqdms3aXN1azBjcjQzenBoZzhyYW5wajcifQ.cYPsyJKt5o6mYFwyLR3oGg&limit=1'

request({ url: geocodeURL, json: true }, (error, {body}) => {
    if (error) {
        callback('Unable to connect to location services!',undefined)
    } else if (body.features.length === 0) {
        callback('Unable to find location. Try another search.',undefined)
    } else {
        const latitude = body.features[0].center[1]
        const longitude = body.features[0].center[0]
        const location = body.features[0].place_name
        callback(undefined,{
            latitude,
            longitude,
            location
        })
    }
})
}


const getForecast =(lat,long,callback)=>{
    const url = 'https://api.darksky.net/forecast/4a004754fe083505323446a035d6573a/'+lat+","+long
    request({ url: url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service!')
        } else if (body.error) {
            callback('Unable to find location')
        } else {
            callback(undefined,body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out. There is a ' + body.currently.precipProbability + '% chance of rain.')   
        }
    })
    }
    

module.exports = {
    'geocode':geocode,
    'getForecast':getForecast
}