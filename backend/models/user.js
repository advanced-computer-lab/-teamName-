const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const user = new Schema({
    username : {
        type : String 
    }, 
    password : {
        type : String
    },
    role : {
        type : String ,
        enum : [
            'User' , 
            'Admin'
        ]
    },
    firstName :{
        type: String ,
        default: 'ACL frontend'
    },
    lastName : {
        type : String ,
        default : 'ACL backend'
    },
    email : {
        type: String ,
        default: 'omar.mousaaref@gmail.com'
    },
    passportNumber : {
        type : String ,
        default: 'A123'
    }

 });

module.exports = mongoose.model('User', user);