const jwt = require('jsonwebtoken');
const User = require('../models/User.js');
// const Post = require('../models/Post.js')
const {
    jwt_auth_secret
} = require('../config/keys.js');


const authentication = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const payload = jwt.verify(token, jwt_auth_secret);
        const user = await User.findOne({
            _id: payload._id,
            tokens: token
        });
        if (!user) {
            return res.status(401).send({
                message: 'No estas autorizado 1'
            });
        }
        req.user = user;
        next();
    } catch (error) {
        console.error(error)
        res.status(401).send({
            message: 'No estas autorizado 2',
            error
        })
    }
}

module.exports = authentication