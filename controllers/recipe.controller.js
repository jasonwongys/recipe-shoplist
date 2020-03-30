const Recipe = require('../models/Recipe.model');

module.exports = {

    index: async(req, res,next) => {
        const recipes = await Recipe.find({});
        res.status(200).json(recipes);
    },

    getRecipe: async (req, res, next) => {
        const { id } = req.params;
        const recipe = await Recipe.findById(id);

        res.status(200).json(recipe);
    },

    replaceRecipe: async(req, res,next) => {
        const { id } = req.params;
        const newRecipe = req.body;

        const result = await Recipe.findByIdAndUpdate(id, newRecipe);
        console.log("Result", result);
        res.status(200).json({success: true});
    },

    updateRecipe: async (req, res,next) => {
        const { id } = req.params;

        const newRecipe = req.body;
        const result = await Recipe.findByIdAndUpdate(id, newRecipe);
        res.status(200).json({success: true});
    },

    getRecipeAndUsers: async (req,res,next) => {
        const { id } = req.params;
        const recipe = await Recipe.findById(id).populate('user');
    
        console.log("recipe: " + recipe.recipes);
        res.status(200).json(recipe);
    },

    newRecipeUser: async (req, res, next) => {
        const { id } = req.params;

        let newRecipe  = new Recipe(req.body);
        
        console.log("Req Body", req.body);
        console.log('New recipe', newRecipe);

        const recipe = await Recipe.findById(id).populate('user');
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