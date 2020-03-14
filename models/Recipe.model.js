const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RecipeSchema = new Schema({

    uri: {
        type: String,
    },
    recipeName: {
        type: String,
        
    },
    image: {
        type: String,
        
    },
    ingredients: {
        type: Array
    },
    // shoplists: [{
    //     type: Schema.Types.ObjectId,
    //     ref: 'shoplist'
    // }]

    
});

module.exports = Recipe = mongoose.model("recipe",RecipeSchema);