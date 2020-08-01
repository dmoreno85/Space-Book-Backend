const router = require('express').Router();
const PostController = require('../controllers/PostController.js');
const authentication = require('../middleware/authentication.js');

router.get('/', authentication, PostController.getAll);
router.post('/', authentication, PostController.createPost)

module.exports = router;