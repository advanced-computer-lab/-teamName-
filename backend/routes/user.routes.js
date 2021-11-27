const express = require('express');
const router = express.Router();
const userFlight = require('../models/userFlight')
const flights = require('../models/flight')
const user = require('../models/user')
const middleware = require('../utils/middleware')

router.get('/hi' , (req , res , next ) => {
    res.json('HII')
})



router.post('/reserveFlight' , async(req , res , next ) => {
    let depflight = await flights.findById(req.body.depFlightID)
    let retflight = await flights.findById(req.body.retFlightID)
    
    if(!(depflight['From'] == retflight['To'] && depflight['To'] == retflight['From'])){
        res.status(500).send({ message: err });
        return;
    }
    
    const newUserFlight = new userFlight({
        'departureFlight': req.body.depFlightID,
        'returnFlight': req.body.retFlightID,
        'user': req.body.userID
    });
    
   await newUserFlight.save()

    let test = await userFlight.find({})
    res.json(test)

})


router.delete('/CancelFlight', async(req , res , next ) => {

  userFlight.findOneAndDelete({user: req.body.userID, departureFlight: req.body.depFlightID , returnFlight: req.body.retFlightID }, function (err) {
   if (err){
   console.log(err)
   }  
    res.status(200).send('Success');

})})

module.exports = router

