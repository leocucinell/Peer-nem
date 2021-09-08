/* SECTION: Modules */
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { User } = require("../models");

/* SECTION: Middleware */

/* SECTION: routes */
//GET register/login => account
router.get("/", (req, res, next) => {
    //maybe set current url
    res.render("auth/splash");
});

//POST register
router.post("/register", async (req, res, next) => {
    try {
        //if user exists, tell user and stay on splash page
        const foundUser = await User.exists({$or:[{email:req.body.email},{username:req.body.username}]});
        if(foundUser){
            //MAKE A ROUTE SPECIFICALLY FOR LOGGING IN / REGISTERING FOR ERROR HANDLING PURPOSES
            console.log("User already exists");
            return res.render("auth/splash"); //I would redirect to a specific register page for the error purpose
        }

        //if user does not exist, salt&hash the password and [redirect to login splash || go to main page]
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(req.body.password, salt);
        req.body.password = hash;

        //create a location object based on the req.body.home
        //save it to the database
        //set the req.body.home as the _id of the location object

        //create the new user in mongodb
        const createdUser = await User.create(req.body);

        //return to login
        return res.send("Created a new user!");

    } catch(error) {
        console.log(error);
        return res.send(error);
    }
});

//POST login
router.post("/login", (req, res, next) => {

});

//GET logout
router.get("/logout", (req, res, next) => {

});

/* SECTION: export the router */
module.exports = router;