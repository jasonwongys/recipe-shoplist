const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RecipeSchema = new Schema({

    id: {
        type: String,
        required: true
    },
    recipeName: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    instructions: {
        type: String,
    },
    ingredients: {
        type: String
    }

    
});

module.exports = Recipe = mongoose.model("recipe",RecipeSchema);