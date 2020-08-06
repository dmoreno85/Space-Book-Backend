const Post = require('../models/Post');

const PostController = {
    getAll(req, res) {
        Post.find()
        .populate({path:'user',model:'User'})
      
            .then(async posts => {
                const allPosts = await Post.find()
                res.send({
                    posts,
                    allPosts,
                    
                })
            })
            .catch(error => {
                console.error(error)
                res.status(500).send(error)
            })
    },
    createPost(req, res) {
        Post.create({
                ...req.body,
                user: req.user._id
            })
            .then(post => res.status(201).send(post))
            .catch(error => {
                console.error(error)
                res.status(500).send(error)
            })
    }

};

module.exports = PostController;