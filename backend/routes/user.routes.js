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

router.put('/profile', async (req, res, next) => {
    let updated = await user.findByIdAndUpdate(req.headers.id, req.body);
    updated = await user.findById(req.headers.id);
    console.log(updated._doc)
    res.status(200).json(updated._doc)
})
router.get('/profile', async (req, res, next) => {
    let updated = await user.findById(req.headers.id);
    console.log(updated._doc)
    res.status(200).json(updated._doc)
})
router.post('/register', async (req, res, next) => {
    const Username = req.body.username;
    const Password = req.body.password

    const userFound = await user.find({ username: Username });
    if (userFound.length > 0) {
        console.log('hellpo', userFound)
        res.status(400).send({ message: 'User already registered' })
        return
    }
    let newUser
    try {
        newUser = new user(
            {
                username: Username,
                password: bcrypt.hashSync(Password, 8),
                role: 'User'
            });
        await newUser.save();
        var token = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: 86400 // 24 hours
        });
    } catch (error) {
        console.log(req.body, error)
        res.status(500).send(error)
    }

    res.status(200).send({
        id: newUser._id,
        username: newUser.username,
        role: newUser.role,
        accessToken: token
    });
})






router.post('/reserveFlight', async (req, res, next) => {

    let depflight = await flights.findById(req.body.departureFlight.id)
    let retflight = await flights.findById(req.body.returnFlight.id)
    console.log(depflight)
    if (!(depflight['From'] == retflight['To'] && depflight['To'] == retflight['From'])) {
        res.status(500).send({ message: err });
        return;
    }
    let depflightbusSeats = depflight.BusinessSeats.filter((value) => !req.body.busDepSeats.includes(value))
    let depflighteconSeats = depflight.EconomySeats.filter((value) => !req.body.econDepSeats.includes(value))
    let retflightbusSeats = retflight.BusinessSeats.filter((value) => !req.body.busRetSeats.includes(value))
    let retflighteconSeats = retflight.EconomySeats.filter((value) => !req.body.econRetSeats.includes(value))

    console.log(req.body)
    const newUserFlight = new userFlight({
        'departureFlight': req.body.departureFlight.id,
        'returnFlight': req.body.returnFlight.id,
        'user': req.headers.userid,
        'depBusSeats': req.body.busDepSeats,
        'depEconSeats': req.body.econDepSeats,
        'retBusSeats': req.body.busRetSeats,
        'retEconSeats': req.body.econRetSeats,
        'totalPrice': req.body.totalPrice,
    });
    let updated = await flights.findByIdAndUpdate(req.body.departureFlight.id, {

        ...depflight._doc,
        'EconomySeats': depflighteconSeats,
        'BusinessSeats': depflightbusSeats
    })
    await flights.findByIdAndUpdate(req.body.returnFlight.id, {
        ...retflight._doc,
        'EconomySeats': retflighteconSeats,
        'BusinessSeats': retflightbusSeats
    })
    // 
    console.log(updated)
    console.log({

        ...depflight._doc,
        'EconomySeats': depflighteconSeats,
        'BusinessSeats': depflightbusSeats
    })
    await newUserFlight.save()

    let test = await userFlight.find({})
    res.json(test)

})


router.delete('/CancelFlight', async (req, res, next) => {

    let depflight = await flights.findById(req.body.departureFlight.id)
    let retflight = await flights.findById(req.body.returnFlight.id)

 
    let UpdateddepflightbusSeats = depflight.BusinessSeats.concat(req.body.busDepSeats)
    let UpdateddepflighteconSeats = depflight.EconomySeats.concat(req.body.econDepSeats)
    let UpdatedretflightbusSeats = retflight.BusinessSeats.concat(req.body.busRetSeats)
    let UpdatedretflighteconSeats = retflight.EconomySeats.concat(req.body.econRetSeats)
    console.log(UpdateddepflighteconSeats, req.body.econDepSeats)

    let updated = await flights.findByIdAndUpdate(req.body.departureFlight.id, {
      
        ...depflight._doc,
        'EconomySeats': UpdateddepflighteconSeats,
        'BusinessSeats': UpdateddepflightbusSeats
    })
    await flights.findByIdAndUpdate(req.body.returnFlight.id , {
        ...retflight._doc,
        'EconomySeats': UpdatedretflighteconSeats,
        'BusinessSeats': UpdatedretflightbusSeats
    })
    
    await userFlight.findByIdAndDelete(req.body.id)
    console.log(req.body)
    let returnOrders = await userFlight.find({ user: req.body.userid }).populate("departureFlight").populate('returnFlight').populate('user')
    console.log(returnOrders)
    res.status(200).json(returnOrders);
})

router.get('/ReservedFlights', async (req, res, next) => {


    let reservedFlights = await userFlight.find({ user: req.headers.userid }).populate("departureFlight").populate('returnFlight').populate('user')
    console.log(reservedFlights, req.headers.userid)
    res.status(200).json(reservedFlights)
})

module.exports = router

