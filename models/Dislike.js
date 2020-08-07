const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const DislikeSchema = new mongoose.Schema({
    userId: {
        type: ObjectId,
        ref: 'User'
    },
   postId:{
       type:ObjectId,
       ref: 'Post'
   }
}, {
    timestamps: true
})
const Dislike = mongoose.model('Dislike', DislikeSchema)
module.exports = Dislike;