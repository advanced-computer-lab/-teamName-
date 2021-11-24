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
    }

 });

module.exports = mongoose.model('User', user);