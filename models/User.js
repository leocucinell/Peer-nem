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
    //add home here once created location model
}, {timestamps: true});

/* SECTION: User model */
const User = mongoose.model(userSchema);

/* SECTION: export */
module.exports = User;