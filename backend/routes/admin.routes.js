

const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminFlight');
const middleware = require('../utils/middleware')


router.post('/login',adminController.login);

router.post('/flight' ,adminController.searchFlights);

router.post("/newflight"  , adminController.createFlight);

router.get('/flight/:id', adminController.flightDetails);

router.delete('/flight/:id',adminController.deleteFlight);

router.put('/flight/:id' , adminController.updateFlight);
// ,[middleware.verifyToken ,middleware.isAdmin]
module.exports = router;