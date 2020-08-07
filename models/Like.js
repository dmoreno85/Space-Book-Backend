const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const LikeSchema = new mongoose.Schema({
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
const Like = mongoose.model('Like', DislikeSchema)
module.exports = LikeSchema;