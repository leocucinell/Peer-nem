//require mongoose
const mongoose = require("mongoose");

//set up .env connection
require('dotenv').config();

//connect to the database (secret OR local machine)
const connectionString = process.env.MONGO_URI || 'mongodb://localhost:27017/peer'

mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
});

//test connection status
mongoose.connection.on("connected",()=>{
    console.log("....connected")
})

mongoose.connection.on('error',(error)=>{
    console.log("....error",error)
})

mongoose.connection.on("disconnected",()=>{
    console.log("....disconnected")
})