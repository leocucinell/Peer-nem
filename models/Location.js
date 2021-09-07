/* SECTION: external modules */
const mongoose = require("mongoose");

/* SECTION: User schema */
const locationSchema = new mongoose.Schema({
    
}, {timestamps: true});

/* SECTION: User model */
const Location = mongoose.model(locationSchema);

/* SECTION: export */
module.exports = Location;