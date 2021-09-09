/* SECTION: Modules */
const express = require("express");
const router = express.Router()
/* SECTION: Middleware */

/* SECTION: routes */
router.get("/", (req, res, next) => {
    res.render("main/main");
})
/* SECTION: export the router */
module.exports = router;