
const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const flights = require('./models/flight')
// THIS IS WRONG NEVER DO THAT !! Only for the task we put the DB Link here!! NEVER DO THAAAT AGAIN !!
const MongoURI = 'mongodb+srv://newUser:BoVfIDwrkeEF1Muv@cluster0.glusa.mongodb.net/ACL?retryWrites=true&w=majority' ;


//App variables
const app = express();
//  app.use(express.urlencoded({ extended: false }));
 app.use(express.json())
const port = process.env.PORT || "8000";

app.use((req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin' , '*')
    res.setHeader('Access-Control-Allow-Headers' , '*')
    res.setHeader('Access-Control-Allow-Methods' , '*')
    next();
})
// #Importing the userController


// configurations
// Mongo DB
mongoose.connect(MongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(result =>console.log("MongoDB is now connected") )
.catch(err => console.log(err));



app.get('/' , (req, res , next ) => {
    // console.log('hi')
    // res.json('HI')
})


app.get('/flight' , async(req, res,next ) => {
    // console.log(req.query);
    // console.log('here')
    const reqFlights = await flights.find(req.query)
    res.json( {reqFlights : reqFlights.map( flight => flight.toObject({getters: true })) });
    
})

app.post("/flight",async(req,res)=>{
   await flights.create({
    FlightNumber:req.body.FlightNumber,
    DepartureDate:req.body.DepartureDate,
    ArrivalDate:req.body.ArrivalDate ,
    EconomySeats:req.body.EconomySeats ,
    BusinessSeats:req.body.BusinessSeats,
    AirPort:req.body.AirPort

    });
    flights.find({FlightNumber:1},function(err,q){return res.send(q)});
    console.log('test');
} 

);


app.get('/flight/:id' , async(req,res,nex ) => {
    // console.log(req.params);
    res.json({ flight : await flights.findById(req.params.id)});
})

app.delete('/flight/:id', async (req, res) => {

   await flights.findByIdAndDelete(req.params.id);
   console.log('ho')
   res.redirect('/flight');
})


app.put('/flight/:id', async (req, res) => {
    await flights.findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/flight');
 })


app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
  });