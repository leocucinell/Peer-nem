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
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    public: {
        type: Boolean
    },
    location: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Location"
    }
}, {timestamps: true});

/* SECTION: User model */
const Event = mongoose.model(eventSchema);

/* SECTION: export */
module.exports = Event;