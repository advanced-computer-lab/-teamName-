const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const flightsSchema = new Schema({ 
  
    
    FlightNumber: {
        type : Number
       
    },
    DepartureDate : {
        type : Date
       
    },
    ArrivalDate : {
        type : Date
       
    },
//     DepartureTime : {
//        type : longTime
       
//    },
   // ArrivalTime : {
    //    type : Date
       
  //  },
 
    EconomySeats : {
        type : Number
    },
   BusinessSeats : {
        type : Number
    },
    AirPort: {
        type : String 
       
    }});

module.exports = mongoose.model('Flight', flightsSchema);