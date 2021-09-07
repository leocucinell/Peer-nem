/*SECTION: external modules */
const express = require("express");

/*SECTION: internal modules */
const { auth } = require("./controllers");

/*SECTION: instanced modules */
const app = express();

/*SECTION: app configuration */
const PORT = process.env.PORT || 4000;
app.set("view engine", "ejs");

/*SECTION: middleware */
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));

/*SECTION: routes */
app.use("/", auth);

/*SECTION: server bind */
app.listen(PORT, () => {
    console.log(`Application listening on port ${PORT}`);
});