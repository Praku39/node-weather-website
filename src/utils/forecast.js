const request = require('request');

const forecast=(address, callback)=>{
    // const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(longitude)+','+encodeURIComponent(latitude)+'.json?access_token=pk.eyJ1IjoicHJha3UiLCJhIjoiY2tzNGU4cTA3MjU3cjJ2bXJ3ZHBjNjV6eCJ9.zJSvPrMmJN4xUkleLIvlbA&limit-1'
    const url = 'http://api.weatherstack.com/current?access_key=60dd26e50b674661906f01ab64120a7d&query='+encodeURIComponent(address)+'&units=f'
    request({url, json:true}, (error, response)=>{
        if(error){
            callback('unable to connect location services!', undefined)
        }else if(response.body.error){
            callback('unable to find location, Try another search', undefined);
        }else{
            callback(undefined, response.body.current.weather_descriptions[0] + ' It is currently ' + response.body.current.temperature + ' degress out. There is a ' + response.body.current.feelslike + '% chance of rain.'
            )
        }
    })
}


module.exports = forecast;