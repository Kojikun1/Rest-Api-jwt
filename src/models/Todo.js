const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
     content: {
         type: String,
         required: true
     },
     completed: {
         type: Boolean,
         default: false
     },
     user: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'User'
     },
     createdAt: {
        type: Date,
        default: Date.now,
    }
})


module.exports = mongoose.model('Todo',TodoSchema);