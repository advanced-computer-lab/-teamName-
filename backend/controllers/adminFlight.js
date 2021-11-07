
const moment = require('moment');
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const flights = require('../models/flight')
const admin = require('../models/admin')
const config = require("../utils/auth.config.js");
const catchAsync = require('../utils/catchAsync')


exports.login =  (req, res, next) => {
    console.log('here')
    admin.findOne({
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
exports.searchFlights = async (req, res, next) => {
    
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
}
exports.createFlight = async (req, res) => {
   
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
exports.flightDetails =  async (req, res, nex) => {
    // console.log(req.params);
    let reqFlight = await flights.findById(req.params.id)
    let newFlight = {
        ...reqFlight._doc,
        ['ArrivalDate']: moment(reqFlight.ArrivalDate).format('YYYY-MM-DD'),
        ['DepartureDate']: moment(reqFlight.DepartureDate).format('YYYY-MM-DD'),

    };
    res.json({ flight: newFlight });
}
exports.updateFlight =  async (req, res) => {

    await flights.findByIdAndUpdate(req.params.id, req.body);
    console.log('jk')
    return res.status(200).json({
        success: true,
        redirectUrl: '/flights'
    })
}
exports.deleteFlight = async (req, res) => {
    await flights.findByIdAndDelete(req.params.id);
    
    res.status(200).send('Success')
}