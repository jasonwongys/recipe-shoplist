const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RecipeSchema = new Schema({

    recipeId: {
        type:String
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
    instructions: {
        type: Array
    },
    userid: {
        type: String
    },
    vegetarian: {
        type: Boolean
    },
    glutenFree: {
        type: Boolean
    },
    vegan: {
        type: Boolean
    },
    dairyFree: {
        type: Boolean
    },
    healthScore: {
        type: Number
    }
    // users: [{
    //     type: Schema.Types.ObjectId,
    //     ref: 'user'
    // }]
    
});
const Recipe =mongoose.model("recipe",RecipeSchema);
module.exports = Recipe;