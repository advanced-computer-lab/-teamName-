const express = require('express');
const router = express.Router();
const userFlight = require('../models/userFlight')
const flights = require('../models/flight')
const user = require('../models/user')
const middleware = require('../utils/middleware')
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const config = require("../utils/auth.config.js");
const adminController = require('../controllers/adminFlight');

router.get('/hi', (req, res, next) => {
    res.json('HII')
})

router.put('/profile', async (req, res, next) => {
    let updated = await user.findByIdAndUpdate(req.headers.id, req.body);
    updated = await user.findById(req.headers.id);
    console.log(updated._doc)
    res.status(200).json(updated._doc)
})
router.get('/profile', async (req, res, next) => {
    let updated = await user.findById(req.headers.id);
    console.log(updated._doc)
    res.status(200).json(updated._doc)
})
router.post('/register', async (req, res, next) => {
    const Username = req.body.username;
    const Password = req.body.password;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const passportNumber = req.body.passportNumber;
    const email = req.body.email;

    const userFound = await user.find({ username: Username });
    if (userFound.length > 0) {
        console.log('hellpo', userFound)
        res.status(400).send({ message: 'User already registered' })
        return
    }
    let newUser
    try {
        newUser = new user(
            {
                username: Username,
                password: bcrypt.hashSync(Password, 8),
                role: 'User',
                firstname: firstName,
                lastname: lastName,
                email: email,
                passportNumber: passportNumber,

            });
        await newUser.save();
        var token = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: 86400 // 24 hours
        });
    } catch (error) {
        console.log(req.body, error)
        res.status(500).send(error)
    }

    res.status(200).send({
        id: newUser._id,
        username: newUser.username,
        role: newUser.role,
        accessToken: token
    });
})

router.post('/ChangePassword', async (req, res, next) => {
    // const Username = req.body.username;

    const OldPassword = req.body.oldpassword;
    const NewPassword = req.body.newpassword;

    const userFound = await user.findById(req.headers.id);
    var result = bcrypt.compareSync(OldPassword, userFound.password);
    if (result) {
        console.log("hana");
        // userFound.Password= bcrypt.hashSync(NewPassword, 8);
        let updated = await user.findByIdAndUpdate(req.headers.id, {
            ...userFound._doc,

            'password': bcrypt.hashSync(NewPassword, 8),

        })
        res.status(200).json('success');
    }


    else {
        res.status(400).send({ message: 'Passwords do not match' })
        res.json('fail')


    }
})





//reserve flight function 
const reserveFlight = async (req, res, next) => {
    console.log(req.body)
    const id1 = req.body.departureFlight.id ? req.body.departureFlight.id : req.body.departureFlight._id
    const id2 = req.body.returnFlight.id ? req.body.returnFlight.id : req.body.returnFlight._id
    let depflight = await flights.findById(id1)
    let retflight = await flights.findById(id2)
    let userr = await user.findById(req.headers.userid)
    console.log(depflight)
    if (!(depflight['From'] == retflight['To'] && depflight['To'] == retflight['From'])) {
        res.status(500).send({ message: err });
        return;
    }
    let depflightbusSeats = depflight.BusinessSeats.filter((value) => !req.body.busDepSeats.includes(value))
    let depflighteconSeats = depflight.EconomySeats.filter((value) => !req.body.econDepSeats.includes(value))
    let retflightbusSeats = retflight.BusinessSeats.filter((value) => !req.body.busRetSeats.includes(value))
    let retflighteconSeats = retflight.EconomySeats.filter((value) => !req.body.econRetSeats.includes(value))

    async function main() {

        let testAccount = await nodemailer.createTestAccount();
        let transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: testAccount.user, // generated ethereal user
                pass: testAccount.pass, // generated ethereal password
            },
        });

        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: '"Fred Foo 👻" <foo@example.com>', // sender address
            to: userr.email, // list of receivers
            subject: "Edit Reservation confirmed", // Subject line
            text: "Hello world?", // plain text body
            html: `
            <b>Edited Reservation</b></br>
            <b> From: ${depflight['From']} ___ To: ${depflight['To']} <b></br>
            <b> Departure Date: ${depflight['DepartureDate']}<b>
            <b> Price: ${req.body.totalPrice}
            `, // html body
        });
        console.log("Message sent: %s", info.messageId);

        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    }

    main().catch(console.error);

    const newUserFlight = new userFlight({
        'departureFlight': id1,
        'returnFlight': id2,
        'user': req.headers.userid,
        'depBusSeats': req.body.busDepSeats,
        'depEconSeats': req.body.econDepSeats,
        'retBusSeats': req.body.busRetSeats,
        'retEconSeats': req.body.econRetSeats,
        'totalPrice': req.body.totalPrice,
    });
    let updated = await flights.findByIdAndUpdate(req.body.departureFlight.id, {

        ...depflight._doc,
        'EconomySeats': depflighteconSeats,
        'BusinessSeats': depflightbusSeats
    })
    await flights.findByIdAndUpdate(req.body.returnFlight.id, {
        ...retflight._doc,
        'EconomySeats': retflighteconSeats,
        'BusinessSeats': retflightbusSeats
    })
    // 

    await newUserFlight.save()

    let test = await userFlight.find({})
    res.json(test)

}

//cancel flight function
const cancelFlight = async (req, res, next) => {


    console.log("Cancelling")
    console.log(req.headers.id)
    let reservation = await userFlight.findById(req.headers.id).populate("departureFlight").populate('returnFlight').populate('user');

    let depflight = await flights.findById(reservation.departureFlight.id)
    let retflight = await flights.findById(reservation.returnFlight.id)



    let UpdateddepflightbusSeats = depflight.BusinessSeats.concat(reservation.depBusSeats)
    let UpdateddepflighteconSeats = depflight.EconomySeats.concat(reservation.depEconSeats)
    let UpdatedretflightbusSeats = retflight.BusinessSeats.concat(reservation.retBusSeats)
    let UpdatedretflighteconSeats = retflight.EconomySeats.concat(reservation.retEconSeats)

    let updated = await flights.findByIdAndUpdate(reservation.departureFlight.id, {

        ...depflight._doc,
        'EconomySeats': UpdateddepflighteconSeats,
        'BusinessSeats': UpdateddepflightbusSeats
    })

    await flights.findByIdAndUpdate(reservation.returnFlight.id, {
        ...retflight._doc,
        'EconomySeats': UpdatedretflighteconSeats,
        'BusinessSeats': UpdatedretflightbusSeats
    })

    await userFlight.findByIdAndDelete(req.headers.id)

    let returnOrders = await userFlight.find({ user: req.body.userid }).populate("departureFlight").populate('returnFlight').populate('user')

    //res.status(200).json(returnOrders);
    next();
}

//edit reserved flight route
router.put('/editReservedFlight', cancelFlight, reserveFlight)


//reserve flight route
router.post('/reserveFlight', async (req, res, next) => {
    let depflight = await flights.findById(req.body.departureFlight.id)
    let retflight = await flights.findById(req.body.returnFlight.id)

    let userr = await user.findById(req.headers.userid)
    if (!(depflight['From'] == retflight['To'] && depflight['To'] == retflight['From'])) {
        res.status(500).send({ message: err });
        return;
    }
    let depflightbusSeats = depflight.BusinessSeats.filter((value) => !req.body.busDepSeats.includes(value))
    let depflighteconSeats = depflight.EconomySeats.filter((value) => !req.body.econDepSeats.includes(value))
    let retflightbusSeats = retflight.BusinessSeats.filter((value) => !req.body.busRetSeats.includes(value))
    let retflighteconSeats = retflight.EconomySeats.filter((value) => !req.body.econRetSeats.includes(value))


    async function main() {

        let testAccount = await nodemailer.createTestAccount();
        let transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: testAccount.user, // generated ethereal user
                pass: testAccount.pass, // generated ethereal password
            },
        });

        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: '"Fred Foo 👻" <foo@example.com>', // sender address
            to: userr.email, // list of receivers
            subject: "Flight Reservation confirmed", // Subject line
            text: "Hello world?", // plain text body
            html: `
            <b>Reservation</b></br>
            <b> From: ${depflight['From']} ___ To: ${depflight['To']} <b></br>
            <b> Departure Date: ${depflight['DepartureDate']}<b>
            <b> Price: ${req.body.totalPrice}
            `, // html body
        });
        console.log("Message sent: %s", info.messageId);

        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    }

    main().catch(console.error);

    const newUserFlight = new userFlight({
        'departureFlight': req.body.departureFlight.id,
        'returnFlight': req.body.returnFlight.id,
        'user': req.headers.userid,
        'depBusSeats': req.body.busDepSeats,
        'depEconSeats': req.body.econDepSeats,
        'retBusSeats': req.body.busRetSeats,
        'retEconSeats': req.body.econRetSeats,
        'totalPrice': req.body.totalPrice,
    });
    let updated = await flights.findByIdAndUpdate(req.body.departureFlight.id, {

        ...depflight._doc,
        'EconomySeats': depflighteconSeats,
        'BusinessSeats': depflightbusSeats
    })
    await flights.findByIdAndUpdate(req.body.returnFlight.id, {
        ...retflight._doc,
        'EconomySeats': retflighteconSeats,
        'BusinessSeats': retflightbusSeats
    })

    await newUserFlight.save()

    let test = await userFlight.find({})
    res.json(test)

})

//cancel flight route
router.delete('/CancelFlight', async (req, res, next) => {
    let reservation = await userFlight.findById(req.body.id).populate("departureFlight").populate('returnFlight').populate('user');

    let depflight = await flights.findById(reservation.departureFlight.id)
    let retflight = await flights.findById(reservation.returnFlight.id)



    let userr = await user.findById(req.body.userid);
    let UpdateddepflightbusSeats = depflight.BusinessSeats.concat(reservation.depBusSeats)
    let UpdateddepflighteconSeats = depflight.EconomySeats.concat(reservation.depEconSeats)
    let UpdatedretflightbusSeats = retflight.BusinessSeats.concat(reservation.retBusSeats)
    let UpdatedretflighteconSeats = retflight.EconomySeats.concat(reservation.retEconSeats)

    let updated = await flights.findByIdAndUpdate(reservation.departureFlight.id, {

        ...depflight._doc,
        'EconomySeats': UpdateddepflighteconSeats,
        'BusinessSeats': UpdateddepflightbusSeats
    })

    await flights.findByIdAndUpdate(reservation.returnFlight.id, {
        ...retflight._doc,
        'EconomySeats': UpdatedretflighteconSeats,
        'BusinessSeats': UpdatedretflightbusSeats
    })

    async function main() {
        // Generate test SMTP service account from ethereal.email
        // Only needed if you don't have a real mail account for testing
        let testAccount = await nodemailer.createTestAccount();

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: testAccount.user, // generated ethereal user
                pass: testAccount.pass, // generated ethereal password
            },
        });

        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: '"Fred Foo 👻" <foo@example.com>', // sender address
            to: userr.email, // list of receivers
            subject: "Flight cancelation ", // Subject line
            text: "Hello world?", // plain text body
            html: `<b>Price Refunded ${reservation.totalPrice}</b>`, // html body
        });

        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    }

    main().catch(console.error);

    await userFlight.findByIdAndDelete(req.body.id)

    let returnOrders = await userFlight.find({ user: req.body.userid }).populate("departureFlight").populate('returnFlight').populate('user')

    res.status(200).json(returnOrders);
})

router.get('/ReservedFlights', async (req, res, next) => {


    let reservedFlights = await userFlight.find({ user: req.headers.userid }).populate("departureFlight").populate('returnFlight').populate('user')

    res.status(200).json(reservedFlights)
})

module.exports = router

