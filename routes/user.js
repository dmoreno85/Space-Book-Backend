const router = require('express').Router();
const UserController = require('../controllers/UserController.js');
const {authetication} =require('../middleware/authentication.js');

router.post('/',authetication, UserController.getAll);
router.post('/register', UserController.register);
router.post('/login', UserController.login);

module.exports = router;