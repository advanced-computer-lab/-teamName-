const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let business = [...Array(15).keys()]
business = business.map((item) => { return (item + 1) })

let economy = [...Array(25).keys()]
economy = economy.map((item) => { return (item + 1) })

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
        type: [Number],
        default : economy
    },
    BusinessSeats: {
        type: [Number], 
        default : business
    },
    From: {
        type: String

    },
    To: {
        type: String

    },
    BusPrice : {
        type: Number ,
        default : 300
    },
    EconPrice : {
        type: Number ,
        default : 120
    }

    
});

module.exports = mongoose.model('Flight', flightsSchema);