const Recipe = require('../models/Recipe.model');

module.exports = {

    // Save new recipe to user
    newRecipeUser: async (req, res, next) => {
        const { id } = req.params;

        let newRecipe  = new Recipe(req.body);
        
        console.log("Req Body", req.body);
        console.log('New recipe', newRecipe);

        const recipe = await recipe.findById(id).populate('user');
        console.log("New recipe recipes " + recipe);
        // Assign recipe as recipe's recipe
        console.log("newRecipe recipes" + newRecipe.recipes);
        newRecipe.recipes = recipe;

        await newRecipe.save();
        // Add recipe to recipes array of recipes
        //console.log("recipes " + recipe.recipes);
        console.log("recipe recipes " + recipe);
        recipe.recipes.push(newRecipe);
        // Save the recipe
        await recipe.save();
        //console.log("After save recipe recipes ",recipe);
        res.status(201).json(newRecipe);
    }
}