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

const distanceCheck = (events, homeBase) => {
    console.log("~~~DISTANCE CHECK~~~")
    let withinRange = []
    events.forEach(event => {
        if(distanceCalculator(event.latitude, event.longitude, homeBase.lat, homeBase.lng)){
            console.log("PUSHING TO withinRange")
            withinRange.push(event);
        }
    });
    return withinRange;
}

module.exports = distanceCheck;