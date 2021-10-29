const mongoose = require('mongoose');
const flight = require('../models/flight.js');
const admin = require('../models/admin.js');
const flights = require('./seeds.js');
const MongoURI = 'mongodb+srv://newUser:BoVfIDwrkeEF1Muv@cluster0.glusa.mongodb.net/ACL?retryWrites=true&w=majority' ;

mongoose.connect(MongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(result =>console.log("MongoDB is now connected") )
.catch(err => console.log(err));

const seedDB = async () => {
    await flight.deleteMany({});
    await admin.deleteMany({});
    flights.forEach (async(e)=> {
        const Flight = new flight ( {
            From : e.From ,
            To : e.To ,
            Date : e.Date,
            Cabin : e.Cabin,
            Seats : e.Seats 
        });
        await Flight.save();
    })
    const Username = 'Admin'; 
    const Password = '1234' ; 
    const Admin = new admin ({
        username : Username ,
        password : Password ,
    }) ;
    await Admin.save();
}
seedDB().then(() => {
    mongoose.connection.close();
})