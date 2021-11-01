
const express = require("express");
const mongoose = require('mongoose');
const flights = require('./models/flight')
// THIS IS WRONG NEVER DO THAT !! Only for the task we put the DB Link here!! NEVER DO THAAAT AGAIN !!
const MongoURI = 'mongodb+srv://newUser:BoVfIDwrkeEF1Muv@cluster0.glusa.mongodb.net/ACL?retryWrites=true&w=majority' ;


//App variables
const app = express();
app.use(express.urlencoded({ extended: true }));
const port = process.env.PORT || "8000";

app.use((req,res,nex) => {
    res.setHeader('Access-Control-Allow-Origin' , '*')
    res.setHeader('Access-Control-Allow-Headers' , '*')
    res.setHeader('Access-Control-Allow-Methods' , '*')

})
// #Importing the userController


// configurations
// Mongo DB
mongoose.connect(MongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(result =>console.log("MongoDB is now connected") )
.catch(err => console.log(err));



app.get('/' , (req, res , next ) => {
    res.send('HI')
})


app.get('/flight' , async(req, res,next ) => {
    // console.log(req.query);
    
    res.send( await flights.find(req.query));
})

app.get('/flight/:id' , async(req,res,nex ) => {
    console.log(req.params);
    res.send( await flights.findById(req.params.id));
})

app.delete('/flight/:id', async (req, res) => {

   await flights.findByIdAndDelete(req.params.id);
   res.redirect('/flight');
})


app.put('/flight/:id', async (req, res) => {
    // const updatedFlight = req.body.Seats;
    console.log(req.body)
    await flights.findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/flight');
 })


app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
  });