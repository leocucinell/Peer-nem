/* SECTION: Modules */
const express = require("express");
const router = express.Router()
const { Event, User } = require("../models");
const { geoCode, distanceCheck, parseAddress, buildAddress } = require("../apis");

/* SECTION: Middleware */

/* SECTION: routes -> /main */
//GET main page
router.get("/", async (req, res, next) => {
    //Reimplement this code once the distance check works out!

    try{
        const allEvents = await Event.find();
        const userObj = await User.findById(req.session.currentUser.id);
        const userCoords = {
            lat: userObj.latitude,
            lng: userObj.longitude
        }
        const nearMe = distanceCheck(allEvents, userCoords);
        return res.render("events/main", {allEvents: nearMe});
    } catch(err) {
        console.log(err)
        res.send(err);
    }
});


//GET Profile page
router.get("/profile", (req, res, next) => {
    res.render("auth/profile");
});

//GET Update profile page
router.get("/profile/edit/:id", async (req, res, next) => {
    try{
        const userObj = await User.findById(req.session.currentUser.id);
        const address = parseAddress(userObj.address);
        res.render("auth/editProfile", { 
            data: userObj,
            address: address
        });
    } catch(e) {
        console.log(e);
        res.send(e);
    }
});

//PUT UpdateProfile route
router.put("/profile/edit/:id", async (req, res, next) => {
    try{
        const addressFields = {
            addressNum: req.body.addressNum,
            streetName: req.body.streetName,
            city: req.body.city,
            state: req.body.state
        }
        const addressString = buildAddress(addressFields);

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id, 
            {
                username: req.body.username,
                email: req.body.email,
                address: addressString
            }, 
            {
                new: true,
            }
        );
        return res.redirect(`/main/profile/${updatedUser.id}`);
    } catch(e){
        console.log(e);
        res.send(e);
    }
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

            //create the object that will go into a new event object
            const newEvent = {
                title: req.body.title,
                description: req.body.description,
                imageAddress: req.body.image,
                admin: req.session.currentUser.id,
                public: req.body.access == "on" ? true : false,
                latitude: inputLocation.latitude,
                longitude: inputLocation.longitude,
                address: inputLocation.address
            }

            const createdEvent = await Event.create(newEvent);
            res.redirect(`/main/show/${createdEvent.id}`)
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
        const address = parseAddress(eventInfo.address);

        return res.render("events/edit", {
            event: eventInfo,
            eventAddress: address
        });
    } catch(err) {
        console.log(err);
        res.send(err);
    }
})

//PUT Edit event route
router.put("/edit/:id", async (req, res, next) => {
    try{
        const updatedEvent = await Event.findByIdAndUpdate(
            req.params.id, 
            {
                $set: req.body,
            }, 
            {
                new: true,
            }
        );
        return res.redirect(`/main/show/${updatedEvent.id}`)
    } catch(err) {
        console.log(err);
        res.send(err);
    }
});

//DELETE Event route
router.delete("/edit/:id", async (req, res, next) => {
    try{
        const deletedEvent = await Event.findByIdAndDelete(req.params.id);
        return res.redirect("/main");
    } catch(err){
        console.log(err);
        res.send(err);
    }
})

/* SECTION: export the router */
module.exports = router;