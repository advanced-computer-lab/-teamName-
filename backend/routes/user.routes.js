const express = require('express');
const router = express.Router();
const userFlight = require('../models/userFlight')
const flights = require('../models/flight')
const user = require('../models/user')
const middleware = require('../utils/middleware')
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const config = require("../utils/auth.config.js");
const adminController = require('../controllers/adminFlight');

router.get('/hi', (req, res, next) => {
    res.json('HII')
})
router.post('/register', async (req, res, next) => {
    const { Username, Password } = req.body;
    const newUser = new user(
        {
            username: Username,
            password: bcrypt.hashSync(Password ,8)
        });
        await newUser.save() ;
        var token = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: 86400 // 24 hours
        });
        res.status(200).send({
            id: newUser._id,
            username: newUser.username,
            role : newUser.role ,
            accessToken: token
        });
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
