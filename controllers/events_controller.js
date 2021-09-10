/* SECTION: Modules */
const express = require("express");
const router = express.Router()
const { Location, Event, User } = require("../models");
const { geoCode, distanceCheck } = require("../apis");

/* SECTION: Middleware */

/* SECTION: routes -> /main */
//GET main page
router.get("/", async (req, res, next) => {
    console.log("")
    try{
        //get all the information from the events, filter for coordinates near home base
        const allEvents = await Event.find();
        console.log(allEvents);
        console.log("-------------------------")
        const userObj = await User.findById(req.session.currentUser.id);
        const userLocation = await Location.findById(userObj.home)
        const userCoords = {
            lat: userLocation.latitude,
            lng: userLocation.longitude,
        }
        const nearMe = distanceCheck(allEvents, userCoords);
        console.log("NEARME OBJECT+++++")
        console.log(nearMe);

        res.render("events/main");
    } catch(err) {
        console.log(err);
        res.send(err);
    }
});


//GET Profile page
router.get("/profile", (req, res, next) => {
    res.render("auth/profile");
});

//GET Create event page
router.get("/create", (req, res, next) => {
    res.render("events/create");
});

//POST Create event
router.post("/create", async (req, res, next) => {
    try{
        //check if there is a user session
        if(req.session.currentUser){
            //geocode the location
            const inputLocation = await geoCode(req.body.addressNum, req.body.streetName, req.body.city, req.body.state);
            //check if there is a location with the same coordinates ? use the created one : create a new location obj
            let foundLocation = await Location.findOne({
                $and: [
                    {latitude: inputLocation.latitude},
                    {longitude: inputLocation.longitude}
                ]
            });
            if(!foundLocation){
                foundLocation = await Location.create(inputLocation);
            }
            //create the object that will go into a new event object
            const newEvent = {
                title: req.body.title,
                description: req.body.description,
                imageAddress: req.body.image,
                admin: req.session.currentUser.id,
                public: req.body.access == "on" ? true : false,
                location: foundLocation
            }

            const createdEvent = await Event.create(newEvent);
            res.redirect("/main/profile")
        } else {
            res.redirect("/");
        }
        
    } catch(err){
        console.log(err);
        res.send(err);
    }
    

});

/* SECTION: export the router */
module.exports = router;