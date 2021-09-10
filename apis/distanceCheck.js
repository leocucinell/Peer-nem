const { Location } = require("../models");

function distanceCalculator(eLat, eLng, hLat, hLng){
}


const distanceCheck = (events, homeBase) => {
    events.forEach(async (event) =>  {
        //get the event location & pass to distanceCalculator function
        const eventLocation = await Location.findById(event.location);
        distanceCalculator(eventLocation.latitude, eventLocation.longitude, homeBase.lat, homeBase.lng);
    });
}

module.exports = distanceCheck;