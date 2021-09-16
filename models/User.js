/* SECTION: external modules */
const mongoose = require("mongoose");

/* SECTION: User schema */
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please create a user name"]
    },
    email: {
        type: String,
        required: [true, "Please add your email"]
    },
    password: {
        type: String,
        required: [true, "Please add a password"]
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
    attending: [{
        title: String,
        image: String,
        eventId: mongoose.Types.ObjectId
    }],
}, {timestamps: true});

/* SECTION: User model */
const User = mongoose.model("User", userSchema);

/* SECTION: export */
module.exports = User;