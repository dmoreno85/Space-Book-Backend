const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;
const UserSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    tokens: [],
    coments: [{
        text: String,
        UserId: {
            type: ObjectId,
            ref: 'User'
        }
    }],
    timestamps: true,
});

UserSchema.methods.toJSON= function (params){
    const user = this._doc;
    delete user.tokens;
    delete user.password;
    delete user.__v;
    return user;
}
module.exports = mongoose.model('User', UserSchema);