
const express = require("express");
const mongoose = require('mongoose');
const moment = require('moment');

const flights = require('./models/flight')
// THIS IS WRONG NEVER DO THAT !! Only for the task we put the DB Link here!! NEVER DO THAAAT AGAIN !!
const MongoURI = 'mongodb+srv://newUser:BoVfIDwrkeEF1Muv@cluster0.glusa.mongodb.net/ACL?retryWrites=true&w=majority';


//App variables
const app = express();
// app.use(express.urlencoded({ extended: false }));
app.use(express.json())
const port = process.env.PORT || "8000";

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', '*')
    res.setHeader('Access-Control-Allow-Methods', '*')
    next();
})
// #Importing the userController


// configurations
// Mongo DB
mongoose.connect(MongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => console.log("MongoDB is now connected"))
    .catch(err => console.log(err));



app.get('/', (req, res, next) => {
    // console.log('hi')
    // res.json('HI')
})


app.post('/flight', async (req, res, next) => {
    // console.log(req.query);

    let reqFlights = await flights.find(req.body)
    let modifiedFlights = [];
    for (let i = 0; i < reqFlights.length; i++) {
        let newFlight = {
            ...reqFlights[i]._doc,
            ['Date']: moment(reqFlights[i].Date).format('YYYY-MM-DD')
        };
        modifiedFlights.push(newFlight)
    }
   
    res.json({
        reqFlights: modifiedFlights.map(flight => {


            return flight
        })
    });

})

app.get('/flight/:id', async (req, res, nex) => {
    // console.log(req.params);
    let reqFlight = await flights.findById(req.params.id)
    let newFlight = {
        ...reqFlight._doc,
        ['Date']: moment(reqFlight.Date).format('YYYY-MM-DD')
    };
    res.json({ flight:newFlight });
})

app.delete('/flight/:id', async (req, res) => {

    await flights.findByIdAndDelete(req.params.id);

    res.redirect('/flight');
})


app.put('/flight/:id', async (req, res) => {

    await flights.findByIdAndUpdate(req.params.id, req.body);
    console.log('jk')
    return res.status(200).json({
        success: true,
        redirectUrl: '/flights'
    })
})


app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
});