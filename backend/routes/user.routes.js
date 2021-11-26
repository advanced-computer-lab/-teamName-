const express = require('express');
const router = express.Router();
const userFlight = require('../models/userFlight')
const flights = require('../models/flight')
const user = require('../models/user')
const middleware = require('../utils/middleware')

router.get('/hi' , (req , res , next ) => {
    res.json('HII')
})



router.get('/reserveFlight' , async(req , res , next ) => {
    let depflight = await flights.findById(req.body.depFlightID)
    let retflight = await flights.findById(req.body.retFlightID)
    
    if(!(depflight['From'] == retflight['To'] && depflight['To'] == retflight['From'])){
        res.status(500).send({ message: err });
        return;
    }
    
    const newUserFlight = new userFlight({
        'depflight': req.body.depFlightID,
        'retflight': req.body.retFlightID,
        'user': req.body.userID
    });
    newUserFlight.save()

    let test = await userFlight.find({})
    res.json(test)

})

// router.get('/userFlight' , async(req , res , next ) => {
//     return userFlight
// })

// router.get("/createuserFlight", (req, res) => {
//     userFlight.create({
//     user: req.body.userID,
//     departureFlight: req.body.depFlightID,
//     returnFlight: req.body.retFlightID 
//     });



module.exports = router
