/* SECTION: Modules */
const express = require("express");
const router = express.Router()
/* SECTION: Middleware */

/* SECTION: routes -> /main */
router.get("/", (req, res, next) => {
    res.render("events/main");
});


//GET Profile page
router.get("/profile", (req, res, next) => {
    res.render("auth/profile");
});


/* SECTION: export the router */
module.exports = router;