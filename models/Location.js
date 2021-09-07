/* SECTION: external modules */
const mongoose = require("mongoose");

/* SECTION: User schema */
const locationSchema = new mongoose.Schema({
    latitude: {
        type: Number,
        required: [true, "please add the latitude for the event"]
    },
    longitude: {
        type: Number,
        required: [true, "please add the longitude for the event"]
    },
    address: {
        type: String,
        required: [true, "please add an address for the event"]
    },
    //look into adding a title to the location for popular locations
});

/* SECTION: User model */
const Location = mongoose.model("Location", locationSchema);

/* SECTION: export */
module.exports = Location;