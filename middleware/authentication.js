const jwt = require('jsonwebtoken');
const UserModel = require('../models/User.js');
const {
    jwt_auth_secret
} = require('../config/keys.js');

const authetication = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
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
            error
        });
    }
}

module.exports = {authetication};