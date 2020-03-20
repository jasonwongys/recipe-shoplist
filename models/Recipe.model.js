const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RecipeSchema = new Schema({

    
    recipeName: {
        type: String,
        
    },
    image: {
        type: String,
        
    },
    ingredients: {
        type: Array
    },
    instructions: {
        type: Array
    }

    
});

module.exports = Recipe = mongoose.model("recipe",RecipeSchema);