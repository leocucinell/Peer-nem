const { Location } = require("../models");

function deg2rad(deg) {
    return deg * (Math.PI/180)
}

//The haversine formula allows the haversine of θ (that is, hav(θ)) to be computed directly from the latitude (represented by φ) and longitude (represented by λ) of the two points:
function distanceCalculator(eLat, eLng, hLat, hLng){
    //Compute the distance between the two coordinates, 
    //if it is within range, return true, else return false
    const R = 6371; //radius of earth in km
    const dLat = deg2rad(hLat - eLat); //compute the radian
    const dLng = deg2rad(eLng - hLng);
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(deg2rad(eLat)) * Math.cos(deg2rad(hLat)) * Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const d = R * c; // Distance in km
    const miles = d / 1.60934; //distance in miles

    //have the distance radius be 50 miles
    if(miles < 50){
        return true
    } else {
        return false
    }
}

const findLocation = async function(location){
    //this returns a promise to the location object
    return await Location.findById(location).then(local => {return local});
}


const getEventsInRange =  function(events, homeBase){
    const eventFilter = events.filter((event) => {
        let eventLocal = findLocation(event.location);
        let success = false;
        eventLocal.then(function(eventLocation) {
            console.log(eventLocation)
            //eventLocation is the correct location object!!!
            if(distanceCalculator(eventLocation.latitude, eventLocation.longitude, homeBase.lat, homeBase.lng)){
                success = true;
            };
        });
        return true;
    });
    console.log(eventFilter);
    return eventFilter;
}

const getList = async function(events, homeBase){
    let eventsInRange = await getEventsInRange(events, homeBase);
    return eventsInRange;
}


const distanceCheck = (events, homeBase) => {
    return getList(events, homeBase).then(event => {
        console.log(event);
        return event
    });
}

module.exports = distanceCheck;