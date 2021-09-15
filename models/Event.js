/* SECTION: external modules */
const mongoose = require("mongoose");

/* SECTION: User schema */
const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "please add an event title"]
    },
    description: {
        type: String,
        required: [true, "please add an event description"]
    },
    imageAddress: {
        type: String,
        required: [true, "please add an image address for your event"]
    },
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    guests: [{
        username: String,
        userId: mongoose.Types.ObjectId
    }],
    // public: {
    //     type: Boolean
    // },
    date: {
        type: String,
        required: [true, "Please enter a date for the event"]
    },
    time: {
        type: String,
        required: [true, "Please enter a time for the event"]
    },
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
}, {timestamps: true});

/* SECTION: User model */
const Event = mongoose.model("Event", eventSchema);

/* SECTION: export */
module.exports = Event;