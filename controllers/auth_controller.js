/* SECTION: Modules */
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { User } = require("../models");
const { geoCode } = require("../apis"); //geoCode(params);

/* SECTION: Middleware */
function fieldCheck(req, res, next){
    for(key in req.body){
        if(!req.body[key]){
            //check which URL sent the req && respond accordingly
            if(req.path == "/login"){
                return res.render("auth/login", { err: "Please fill out all fields or create an account" });
            } else if (req.path == "/register"){
                return res.render("auth/register", { err: "Please fill out all fields to create an account" })
            }
        }
    }
    return next();
}

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
router.post("/register", fieldCheck, async (req, res, next) => {
    try {
        //if user exists, tell user and stay on splash page
        const foundUser = await User.exists({$or:[{email:req.body.email},{username:req.body.username}]});
        if(foundUser){
            //MAKE A ROUTE SPECIFICALLY FOR LOGGING IN / REGISTERING FOR ERROR HANDLING PURPOSES
            console.log("User already exists");
            return res.render("auth/login");
        }

        //if user does not exist, salt&hash the password and [redirect to login splash || go to main page]
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(req.body.password, salt);
        req.body.password = hash;

        //create a location object based on the req.body.home
        const {addressNum, streetName, city, state } = req.body
        const inputLocation = await geoCode(addressNum, streetName, city, state); // -> {lat, lng, address}
        //if the location already exists, grab the id of that location and use that for the user
        // const foundLocation = await Location.exists({$and:[{latitude:inputLocation.latitude}, {longitude: inputLocation.longitude}]})
        // if(foundLocation){
        //     homeBase = await Location.findOne({$and:[{latitude:inputLocation.latitude}, {longitude: inputLocation.longitude}]});
        // } else {
        //     homeBase = await Location.create(inputLocation);
        // }

        //create the new user object to save to mongoDB
        const newUser = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            latitude: inputLocation.latitude,
            longitude: inputLocation.longitude,
            address: inputLocation.address
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
router.post("/login", fieldCheck, async (req, res, next) => {
    //try/catch
    try{
        //check if user exist
        const foundUser = await User.findOne({username: req.body.username});
        if(!foundUser){
            console.log(`user does not exist`)
            return res.redirect('/register')
        }

        //check if the passwords match
        const matchedPassword = await bcrypt.compare(req.body.password,foundUser.password)
        if(!matchedPassword){
            return res.render("auth/login");
        }

        //create the session for the user during the app
        req.session.currentUser = {
            id: foundUser._id,
            username: foundUser.username,
            email: foundUser.email,
        }

        //redirect the user to the main page
        return res.redirect("/main");
    } catch(error) {
        console.log(error);
        return res.send(error);
    }
});

//GET logout
router.get("/logout", async (req, res, next) => {
    //destry the session and return to the splash page
    try{
        await req.session.destroy();
        return res.redirect("/");
    } catch(err) {
        console.log(err);
        return res.send(err)
    }
});

/* SECTION: export the router */
module.exports = router;