/*SECTION: external modules */
const express = require("express");

/*SECTION: internal modules */

/*SECTION: instanced modules */
const app = express();

/*SECTION: app configuration */
const PORT = process.env.PORT || 4000;

/*SECTION: middleware */
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));

/*SECTION: routes */
app.get("/", (req, res, next) => {
    res.send("Hello from peer server!");
})

/*SECTION: server bind */
app.listen(PORT, () => {
    console.log(`Application listening on port ${PORT}`);
});