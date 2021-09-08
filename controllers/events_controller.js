/* SECTION: Modules */
const express = require("express");
const router = express.Router()
/* SECTION: Middleware */

/* SECTION: routes */
router.get("/", (req, res, next) => {
    res.send("Hello from the /main route!")
})
/* SECTION: export the router */
module.exports = router;