const mongoose = require('mongoose');
if (process.env.NODE_ENV !== "production") {
    require('dotenv').config({ path: '../.env' });
}
const flight = require('../models/flight.js');
const admin = require('../models/admin.js');
const flights = require('./seeds.js');
const MongoURI = process.env.DBurl ;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");


mongoose.connect(MongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(result =>console.log("MongoDB is now connected") )
.catch(err => console.log(err));

const seedDB = async () => {
    await flight.deleteMany({});
    await admin.deleteMany({});
    flights.forEach (async(e)=> {
        const Flight = new flight ( e);
        await Flight.save();
    })
    const Username = 'Admin'; 
    const Password = '1234' ; 
    const Role = 'Admin';
    const Admin = new admin ({
        username : Username ,
        password : bcrypt.hashSync(Password ,8),
        role : Role 
    }) ;
    await Admin.save();
}
seedDB().then(() => {
    mongoose.connection.close();
})