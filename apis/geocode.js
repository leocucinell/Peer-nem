const axios = require("axios");
//https://maps.googleapis.com/maps/api/geocode/json?address=19331+Alianna Loop,+Bend,+OR&key=process.env.GOOGLE_KEY

/**
 * objective: use google maps api to geocode address to coordinates
 * returns: coordinate object
 */
module.exports = function geoCode(num, street, city, state) {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${num}+${street},+${city},+${state}&key=${process.env.GOOGLE_KEY}`;
    
    return axios({
        method: 'get',
        url: url,
        // responseType: 'stream'
    }).then((res) => {
        //res.data.results[0].geometry.location -> {lat, long}
        address = `${num} ${street}, ${city}, ${state}`;
        const {lat, lng} = res.data.results[0].geometry.location;
        return ({
            latitude: lat,
            longitude: lng,
            address: address
        });
    });
    
}