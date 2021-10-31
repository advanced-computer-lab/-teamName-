const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const flightsSchema = new Schema({ 
    From : {
        type : String
    }, 
    To : {
        type : String
    },
    Date : {
        type : Date 
    },
    Cabin : {
        type : String 
       
    },
    Seats : {
        type : Number
    }
});

module.exports = mongoose.model('Flight', flightsSchema);