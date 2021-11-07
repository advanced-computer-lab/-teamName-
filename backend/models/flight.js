const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const flightsSchema = new Schema({


    FlightNumber: {
        type: Number

    },
    DepartureDate: {
        type: Date

    },
    ArrivalDate: {
        type: Date

    },

    EconomySeats: {
        type: Number
    },
    BusinessSeats: {
        type: Number
    },
    From: {
        type: String

    },
    To: {
        type: String

    }
});

module.exports = mongoose.model('Flight', flightsSchema);