const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const flightsSchema = new Schema(
    {
        user : {
            type : Schema.Types.ObjectId, 
            ref : 'User',
        },
        departureFlight : {
            type : Schema.Types.ObjectId, 
            ref : 'Flight',
        },
        returnFlight : {
            type : Schema.Types.ObjectId, 
            ref : 'Flight',
        }

    }
)
module.exports = mongoose.model('Flight', flightsSchema);