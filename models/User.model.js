const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    // shoplist: [{
    //     type: Schema.Types.ObjectId,
    //     ref: 'shoplist'
    // }],
    recipe: {
        type: Array,
        ref: 'recipe'
    }
    
});

module.exports = User = mongoose.model("users",UserSchema);