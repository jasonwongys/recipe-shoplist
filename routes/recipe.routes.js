let Recipe = require('../models/Recipe.model');
const recipeRoutes = require('express-promise-router')();
let recipeController = require('../controllers/recipe.controller')


recipeRoutes.route('/')
    .get(recipeController.index);

recipeRoutes.route('/:id')
    .get(recipeController.getRecipe)
    .put(recipeController.replaceRecipe)
    .patch(recipeController.updateRecipe);

recipeRoutes.route('/:id').delete((req,res) => {
    Recipe.findByIdAndDelete(req.params.id)
        .then(()=> res.json('Recipe Deleted'))
        .catch(err => res.status(400).json('Error ', err));
})

module.exports = recipeRoutes;