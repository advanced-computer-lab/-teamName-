const jwt = require("jsonwebtoken");
const config = require("./auth.config");
const user = require("../models/user");


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
    user.find({ 'username': req.body.username }).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        else {
            if (user.role === 'Admin'){
                res.status(500).send({ message: "Not Authorized" });
                return;
            }
        }



    });
    next();
};

module.exports.isUser = isUser = (req, res, next) => {
    user.find({ 'username': req.body.username }).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        else {
            if (user.role === 'User'){
                res.status(500).send({ message: "Not Authorized" });
                return;
            }
        }



    });
    next();
};
