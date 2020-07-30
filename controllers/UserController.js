const UserModel = require('../models/User.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {
    jwt_auth_secret
} = require('../config/keys.js');


const UserController = {

    async register(req, res) {
        try {
            req.body.password = await bcrypt.hash(req.body.password, 9);
            const user = await UserModel.create(req.body);
            res.status(201).send({
                user,
                message: 'Usuario creado con éxito.'
            })
        } catch (error) {
            console.error(error);
            res.status(500).send({
                message: 'Hubo un error al registrarse.',
                error
            })
        }
    },
    async login(req, res) {
        try {
            const user = await UserModel.findOne({
                email: req.body.email
            });
            if (!user) {
                return res.status(400).send({
                    message: 'Email o contraseña incorrectos.'
                })
            }
            const isMatch = await bcrypt.compare(req.body.password, user.password);
            if (!isMatch) {
                return res.status(400).send({
                    message: 'Email o contraseña incorrectos'
                })
            }
            const token = jwt.sign({
                _id: user._id
            }, jwt_auth_secret);

            if (user.tokens.length > 4) user.tokens.shift();
            user.tokens.push(token);
            await user.replaceOne(user);
            res.send({
                user,
                token,
                message: 'Conectado con éxito.'
            })
        } catch (error) {
            console.error(error);
            res.status(500).send({
                message: 'Hubo un problema al intentar conectar al usuario.'
            })
        }
    },
    async getAll(req, res) {

        UserModel.find()
            .then(users => res.send({
                users
            }))
            .catch(console.error)



    },
};

module.exports = UserController;