const express = require('express');
const router = express.Router();
const flights = require('../models/flight')
const user = require('../models/user')
const middleware = require('../utils/middleware')

router.get('/hi' , (req , res , next ) => {
    res.json('HII')
})

module.exports = router;