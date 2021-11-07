
const express = require("express");
const mongoose = require('mongoose');
const moment = require('moment');
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
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

app.post('/admin/login'), (req, res, nex) => {
    User.findOne({
        username: req.body.username
    })
        .exec((err, user) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }

            if (!user) {
                return res.status(404).send({ message: "User Not found." });
            }

            var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );

            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Invalid Password!"
                });
            }

            var token = jwt.sign({ id: user.id }, config.secret, {
                expiresIn: 86400 // 24 hours
            });
            res.status(200).send({
                id: user._id,
                username: user.username,
                
                
                accessToken: token
            });
        });
}

app.post('/flight', async (req, res, next) => {


    let reqFlights = await flights.find(req.body)
    let modifiedFlights = [];
    for (let i = 0; i < reqFlights.length; i++) {
        let newFlight = {
            ...reqFlights[i]._doc,
            ['ArrivalDate']: moment(reqFlights[i].ArrivalDate).format('YYYY-MM-DD'),
            ['DepartureDate']: moment(reqFlights[i].DepartureDate).format('YYYY-MM-DD'),
        };
        modifiedFlights.push(newFlight)
    }

    res.json({
        reqFlights: modifiedFlights.map(flight => {


            return flight
        })
    });

})

app.post("/newflight", async (req, res) => {

    console.log(req.data);
    let newFlight = await flights.create(

        {
            FlightNumber: req.body.FlightNumber,
            DepartureDate: req.body.DepartureDate,
            ArrivalDate: req.body.ArrivalDate,
            EconomySeats: req.body.EconomySeats,
            BusinessSeats: req.body.BusinessSeats,
            From: req.body.From,
            To: req.body.To,
        }
    );
    // flights.find({ FlightNumber: 1 }, function (err, q) { return res.send(q) });
    res.status(200).send(newFlight);

}

);


app.get('/flight/:id', async (req, res, nex) => {
    // console.log(req.params);
    let reqFlight = await flights.findById(req.params.id)
    let newFlight = {
        ...reqFlight._doc,
        ['ArrivalDate']: moment(reqFlight.ArrivalDate).format('YYYY-MM-DD'),
        ['DepartureDate']: moment(reqFlight.DepartureDate).format('YYYY-MM-DD'),

    };
    res.json({ flight: newFlight });
})

app.delete('/flight/:id', async (req, res) => {

    await flights.findByIdAndDelete(req.params.id);
    consolo.log('flight deleted')
    res.status(200).send('Success')
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