const express = require('express');
const router = express.Router();
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



module.exports = router;