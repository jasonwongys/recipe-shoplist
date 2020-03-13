const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let shoplistSchema = new Schema({
    listName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    dietType: {
        type: String,
        required: true
    },
    dateCreated: {
        type: Date,
        required: true
    },
    recipes: [{
        type: Schema.Types.ObjectId,
        ref: 'recipe'
    }]
    
});

const ShopList = mongoose.model('shoplist',shoplistSchema);
module.exports = ShopList;