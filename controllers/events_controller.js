/* SECTION: Modules */
const express = require("express");
const router = express.Router()
const { Location, Event, User } = require("../models");
const { geoCode, distanceCheck } = require("../apis");

/* SECTION: Middleware */

/* SECTION: routes -> /main */
//GET main page
router.get("/", async (req, res, next) => {
    //Reimplement this code once the distance check works out!

    // try{
    //     //get all the information from the events, filter for coordinates near home base
    //     const allEvents = await Event.find();
    //     const userObj = await User.findById(req.session.currentUser.id);
    //     const userLocation = await Location.findById(userObj.home)
    //     const userCoords = {
    //         lat: userLocation.latitude,
    //         lng: userLocation.longitude,
    //     }

    //     const nearMe = distanceCheck(allEvents, userCoords).then(obj => {return obj});
    //     nearMe.then((events) => {
    //         res.render("events/main", {allEvents: events});
    //     });
        
    // } catch(err) {
    //     console.log(err);
    //     res.send(err);
    // }

    try{
        const allEvents = await Event.find();
        return res.render("events/main", {allEvents});
    } catch(err) {
        console.log(err)
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
        //TODO: Update this route to ignore duplicate locations WHEN REFACTOR
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

//GET Event show page
router.get("/show/:id", async (req, res, next) => {
    //grab the event the user wants to see
    try {
        const clickedEvent = await Event.findById(req.params.id);
        const adminCreator = await User.findById(clickedEvent.admin);
        res.render("events/show", {event: clickedEvent, eventAdmin: adminCreator});
    } catch(err) {
        console.log(err)
        res.send(err);
    }
});

//GET Edit event route
router.get("/edit/:id", async (req, res, next) => {
    //get the information from the event,
    //send it to the update form & place the values in ejs
    try{
        const eventInfo = await Event.findById(req.params.id);
        const eventLocation = await Location.findById(eventInfo.location); //TODO: update this when refactoring location info 
        return res.render("events/edit", {
            event: eventInfo,
            location: eventLocation
        });
    } catch(err) {
        console.log(err);
        res.send(err);
    }
})

/* SECTION: export the router */
module.exports = router;