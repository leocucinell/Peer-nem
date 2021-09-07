/* SECTION: external modules */
const mongoose = require("mongoose");

/* SECTION: User schema */
const eventSchema = new mongoose.Schema({

}, {timestamps: true});

/* SECTION: User model */
const Event = mongoose.model(eventSchema);

/* SECTION: export */
module.exports = Event;