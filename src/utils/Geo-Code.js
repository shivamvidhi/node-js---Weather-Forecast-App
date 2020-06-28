const request = require('postman-request')

// function -> returns cordinates of the address entered

const geoCode = (address, callback)=>{

    const  locationUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1Ijoic2hpdmFtdmlkaGkiLCJhIjoiY2tid21kaHZ6MGF5NDJ6bmFwMnN6cXhieCJ9.fKGC3NXR0bPC1M2FNhUxrA&limit=1'
    request({url:locationUrl, json:true},(error,response,body)=>
    {
    
        if(error)
        {
            callback('Internet connectivity is poor', undefined)
        }
        else if(body.message || body.features.length === 0)
        {
            callback('Unable to find location of the address',undefined)
        }
        else
        {
                const data = body
                const cordinates ={
                    latitude : data.features[0].center[1],
                    longitude : data.features[0].center[0]
                }

            callback(undefined,cordinates)
        }
    
    })

}
module.exports = geoCode