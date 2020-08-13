const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
     name: {
         type: String,
         required: true
     },
     email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    avatar_url: String,
    todo_list: [
        {type: mongoose.Schema.Types.ObjectId, ref: 'Todo'}
    ]
})

UserSchema.pre('save', async function() {
     const hashedPassword = await bcrypt.hash(this.password,8);
     this.password = hashedPassword;
})

module.exports = mongoose.model("User", UserSchema);

