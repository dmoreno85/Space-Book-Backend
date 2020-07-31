const jwt = require('jsonwebtoken');
const UserModel = require('../models/User.js');
const {
    jwt_auth_secret
} = require('../config/keys.js');

const authentication = async (req, res, next) => {
    try {
        const token = req.body.headers.Authorization;
     
        const payload = jwt.verify(token, jwt_auth_secret);
        const user = await UserModel.findOne({
            _id: payload._id,
            tokens: token
        });
        
        if (!user) {
            return res.status(401).send({
                message: "No estas autorizado."
            });
        }
        req.user = user;
        next();
    } catch (error) {
        console.error(error);
        res.status(401).send({
            message: 'No estas autorizado.',
            error,
            req
        });
    }
}

module.exports = authentication;