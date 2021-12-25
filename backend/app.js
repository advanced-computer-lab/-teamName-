if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}
const express = require("express");
const mongoose = require('mongoose');
const moment = require('moment');
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const flights = require('./models/flight')
const admin = require('./models/user')
const config = require("./utils/auth.config.js");
const cors = require('cors')
const uuid = require('uuid')
const stripe = require('stripe')('sk_test_51K9DLKEJp0MOvRAS70VO4lkXinDShFChooW7tgEMGW40WdnjNKn3fCpDQkU3xmHwyCU706iprdVhaCGPvUZAvJzJ00UDYCFVqM');
// THIS IS WRONG NEVER DO THAT !! Only for the task we put the DB Link here!! NEVER DO THAAAT AGAIN !!
const MongoURI = process.env.DBurl;


//App variables
const app = express();
// app.use(express.urlencoded({ extended: false }));
app.use(express.json())
app.use(cors())
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

const YOUR_DOMAIN = 'http://localhost:8000';
app.post("/payment", (req, res) => {
    const { cart, token } = req.body;
    console.log("PRODUCT ", cart);
    console.log("PRICE ", cart.totalPrice);
    const idempontencyKey = uuid.v4();

    return stripe.customers
        .create({
            email: token.email,
            source: token.id
        })
        .then(customer => {
            stripe.charges.create(
                {
                    amount: cart.totalPrice * 100,
                    currency: "usd",
                    customer: customer.id,
                    receipt_email: token.email,
                    description: `purchase of ${cart.departureFlight.FlightNumber}`,
                 },
                { idempontencyKey }
            );
        })
        .then(result => res.status(200).json(result))
        .catch(err => res.status(200));
});
const adminRoutes = require('./routes/admin.routes')
app.use('/admin', adminRoutes);

const userRoutes = require('./routes/user.routes')
app.use('/user', userRoutes);


app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
});


