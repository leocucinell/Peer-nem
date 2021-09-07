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
router.post("/register", (req, res, next) => {
    
});

//POST login
router.post("/login", (req, res, next) => {

});

//GET logout
router.get("/logout", (req, res, next) => {

});

/* SECTION: export the router */
module.exports = router;