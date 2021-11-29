const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userFlightsSchema = new Schema(
    {
        user : {
            type : Schema.Types.ObjectId, 
            ref : 'User',
        },
        departureFlight : {
            type : Schema.Types.ObjectId, 
            ref : 'Flight',
        },
        depBusSeats : {
            type : [Number]
        },
        depEconSeats : {
            type : [Number]
        },
        returnFlight : {
            type : Schema.Types.ObjectId, 
            ref : 'Flight',
        },
        retEconSeats : {
            type : [Number]
        },
        retBusSeats : {
            type : [Number]
        },
        totalPrice :{
            type : Number
        }

        

    }
)
module.exports = mongoose.model('userFlight', userFlightsSchema);