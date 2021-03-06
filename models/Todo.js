const mongoose = require("mongoose");

const TodoSchema = mongoose.Schema({

    name: {
        type: String, 
        required: true,
        trim: true
    },
    state: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project"
    }
});


module.exports = mongoose.model('Todo', TodoSchema);