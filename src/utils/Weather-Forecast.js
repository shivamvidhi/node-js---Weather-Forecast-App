const request =  require('postman-request')

// function -> return weather of the cordinates entered

const forecast = (latitude,longitude,callback)=>{

    const url = 'http://api.weatherstack.com/current?access_key=60b1d542c94c248ed52d2579166c79c1&query='+latitude+','+longitude;
    request({url:url, json:true},(error, response, body)=>{
        if(error)
        {
            callback('network issue', undefined)
        }
        else if(body.error)
        {
            callback('unable to find location as per the given cordinates', undefined)
        }
        else{
            const data = body;
            callback(undefined,data)
        }
    })

}
module.exports = forecast