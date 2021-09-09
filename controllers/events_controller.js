/* SECTION: Modules */
const express = require("express");
const router = express.Router()
const { Location } = require("../models");
const { geoCode } = require("../apis");

/* SECTION: Middleware */

/* SECTION: routes -> /main */
//GET main page
router.get("/", (req, res, next) => {
    res.render("events/main");
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
    /*
    req.body = {
        title: 'test event',
        description: 'test description',
        image: 'image',
        access: 'on',
        addressNum: '19331',
        streetName: 'alianna loop',
        city: 'bend',
        state: 'OR'
    } 
    */
    try{
        //check if there is a user session
        if(req.session.currentUser){
            //geocode the location
            const inputLocation = await geoCode(req.body.addressNum, req.body.streetName, req.body.city, req.body.state);
            //check if there is a location with the same coordinates ? use the created one : create a new location obj
            const foundLocation = await Location.findOne({
                $and: [
                    {latitude: inputLocation.latitude},
                    {longitude: inputLocation.longitude}
                ]
            });
            console.log(foundLocation);
            //create the object that will go into a new event object
        }
        
    } catch(err){
        console.log(err);
        res.send(err);
    }
    

});

/* SECTION: export the router */
module.exports = router;