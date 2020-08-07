const Post = require('../models/Post');

const PostController = {
    getAll(req, res) {
        Post.find()
            .populate({
                path: 'user',
                model: 'User'
            })

            .then(async posts => {
                await Post.find()
                res.send({
                    posts,
                    // allPosts,

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
    },

    deletePost(req, res) {
        Post.findByIdAndDelete(req.params.post_id)
            .then(post => res.send(post))
            .catch(error => {
                console.error(error)
                res.status(500).send(error)
            })
    },
 
    updatePost(req, res) {
        const id = req.params.post_id;
        Post.findByIdAndUpdate(id, req.body)
        .then(data => {
            if (!data) {
              res.status(404).send({
                message: `No se puede editar el Post con el id=${id}. Tal vez no existe!`
              });
            } else res.send({ message: "Post editado correctamente." });
          })
          .catch(err => {
            res.status(500).send({
              message: "Error al editar Post con el id=" + id
            });
          });
    },
};

module.exports = PostController;