const jwt = require("jsonwebtoken");
const config = require("auth.config.js");
const admin = require("../models/admin");
const config = require("../utils/auth.config.js");
module.exports.verifyToken = verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send({ message: "No token provided!" });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: "Unauthorized!" });
        }
        req.userId = decoded.id;
        next();
    });
};
module.exports.isAdmin = isAdmin = (req, res, next) => {
    admin.find({ 'username': req.body.username }).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }



    });
};
