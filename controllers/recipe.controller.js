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
    }

    
}