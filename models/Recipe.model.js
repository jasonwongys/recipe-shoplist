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
    // ingredients: {
    //     type: Array
    // },
    // instructions: {
    //     type: Array
    // },

    users: [{
        type: Schema.Types.ObjectId,
        ref: 'user'
    }]
    
});
const Recipe =mongoose.model("recipe",RecipeSchema);
module.exports = Recipe;