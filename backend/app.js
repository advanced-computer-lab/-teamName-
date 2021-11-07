if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}
const express = require("express");
const mongoose = require('mongoose');
const moment = require('moment');
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const flights = require('./models/flight')
const admin = require('./models/admin')
const config = require("./utils/auth.config.js");
// THIS IS WRONG NEVER DO THAT !! Only for the task we put the DB Link here!! NEVER DO THAAAT AGAIN !!
const MongoURI = process.env.DBurl;


//App variables
const app = express();
// app.use(express.urlencoded({ extended: false }));
app.use(express.json())
const port = process.env.PORT || "8000";

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', '*')
    res.setHeader('Access-Control-Allow-Methods', '*')

    next();
})
mongoose.connect(MongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => console.log("MongoDB is now connected"))
    .catch(err => console.log(err));



app.get('/', (req, res, next) => {
    // console.log('hi')
     res.json('HI')
})

const adminRoutes = require('./routes/admin.routes')
app.use('/admin', adminRoutes);



app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
});