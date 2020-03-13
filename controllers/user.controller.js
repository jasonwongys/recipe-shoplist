const User = require('../models/User')
const Recipe = require('../models/Recipe.model');

module.exports = {

    getUserRecipes: async (req,res,next) => {
        const { userId } = req.params;
        const user = await user.findById(userId).populate('Recipe');
        
        
        console.log("user: " + user.recipes);
        res.status(200).json(user);
    },

    newUserRecipe: async (req, res, next) => {
        const { userId } = req.params;

        let newRecipe  = new Recipe(req.body);
        
        
        console.log("Req Body", req.body);
        console.log('New Recipe', newRecipe);

        const user = await User.findById(userId).populate('Recipe');
        console.log("New Recipe users " + user);
        // Assign user as Recipe's user
        console.log("newRecipe users" + newRecipe.users);
        newRecipe.users = user;

        await newRecipe.save();
        // Add Recipe to users array of recipes
        //console.log("recipes " + user.recipes);
        console.log("user recipes " + user);
        user.recipes.push(newRecipe);
        // Save the user
        await user.save();
        //console.log("After save user recipes ",user);
        res.status(201).json(newRecipe);
    }
}