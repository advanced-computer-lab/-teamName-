

const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminFlight');
const middleware = require('../utils/middleware')


router.post('/login',adminController.login);

router.post('/flight' , adminController.searchFlights);

router.post("/newflight"  , [middleware.verifyToken ,middleware.isAdmin] ,adminController.createFlight);

router.get('/flight/:id', adminController.flightDetails);

router.delete('/flight/:id',[middleware.verifyToken ,middleware.isAdmin],adminController.deleteFlight);

router.put('/flight/:id' , [middleware.verifyToken ,middleware.isAdmin],adminController.updateFlight);
// ,[middleware.verifyToken ,middleware.isAdmin]
module.exports = router;