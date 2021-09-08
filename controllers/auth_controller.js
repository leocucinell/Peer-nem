/* SECTION: Modules */
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { User, Location } = require("../models");
const { geoCode } = require("../apis"); //geoCode(params);

/* SECTION: Middleware */

/* SECTION: routes */
//GET register/login => account
router.get("/", (req, res, next) => {
    //maybe set current url
    res.render("auth/splash");
});

//GET register page
router.get("/register", (req, res, next) => {
    res.render("auth/register");
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
        const {addressNum, streetName, city, state } = req.body
        let homeBase = null;
        const inputLocation = await geoCode(addressNum, streetName, city, state);
        //if the location already exists, grab the id of that location and use that for the user
        const foundLocation = await Location.exists({$and:[{latitude:inputLocation.latitude}, {longitude: inputLocation.longitude}]})
        if(foundLocation){
            homeBase = await Location.findOne({$and:[{latitude:inputLocation.latitude}, {longitude: inputLocation.longitude}]});
        } else {
            homeBase = await Location.create(inputLocation);
        }

        //create the new user object to save to mongoDB
        const newUser = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            home: homeBase._id
        }

        const createdUser = await User.create(newUser);

        //return to login
        return res.render('auth/login');

    } catch(error) {
        console.log(error);
        return res.send(error);
    }
});

//GET login
router.get("/login", (req, res, next) => {
    return res.render("auth/login");
});

//POST login
router.post("/login", async (req, res, next) => {
    //try/catch
    try{
        //check if the user exists
        const foundUser = User.findOne({email: req.body.email});
        if(!foundUser){
            console.log("User does not exist");
            return res.redirect("/register");
        }

        //check if the passwords match
        const passwordsMatch = await bcrypt.compare(req.body.password, foundUser.password);
        if(!passwordsMatch){
            return res.redirect("/login");
        }

        //create the session for the user during the app
        

        //redirect the user to the main page
    } catch(error) {
        console.log(error);
        return res.send(error);
    }
});

//GET logout
router.get("/logout", (req, res, next) => {

});

/* SECTION: export the router */
module.exports = router;