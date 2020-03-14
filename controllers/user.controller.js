const User = require('../models/User.model')
const ShopList = require('../models/ShopList.model');
const Recipe  = require('../models/Recipe.model')
module.exports = {

    // getShopListByUser: async (req,res,next) => {
    //     const { id } = req.params;
    //     const user = await User.findById(id).populate('ShopList');
        
        
    //     console.log("user: " + user.shoplist);
    //     res.status(200).json(user);
    // },

    // newShopListByUser: async (req, res, next) => {

    //     const { id } = req.params;

    //     let newShopList  = new ShopList(req.body);
        
        
    //     console.log("Req Body", req.body);
    //     console.log('New Shoplist created', newShopList);

    //     const user = await User.findById(id).populate('Shoplist');
    //     console.log("New Recipe users " + user);
    //     // Assign user as Recipe's user
    //     console.log("newRecipe users" + newShopList.users);
    //     newShopList.users = user;

    //     await newShopList.save();
    //     // Add Recipe to users array of recipes
    //     //console.log("recipes " + user.recipes);
    //     console.log("user recipes " + user);
    //     user.shoplist.push(newShopList);
    //     // Save the user
    //     await user.save();
    //     //console.log("After save user recipes ",user);
    //     res.status(201).json(newShopList);
    // }
    getRecipesByUser: async (req,res,next) => {
        const { id } = req.params;
        const user = await User.findById(id).populate('Recipe');
        
        
        console.log("user: " + user.recipe);
        res.status(200).json(user);
    },

    addRecipeByUser: async (req, res, next) => {

        const { id } = req.params;

        let newRecipe  = new Recipe(req.body);
        
        
        console.log("Req Body", req.body);
        console.log('New Shoplist created', newRecipe);

        const user = await User.findById(id).populate('Recipe');
        console.log("New Recipe users " + user);
        // Assign user as Recipe's user
        console.log("newRecipe users" + newRecipe.users);
        newRecipe.users = user;

        await newRecipe.save();
        // Add Recipe to users array of recipes
        //console.log("recipes " + user.recipes);
        console.log("user recipes " + user);
        user.recipe.push(newRecipe);
        // Save the user
        await user.save();
        //console.log("After save user recipes ",user);
        res.status(201).json(newRecipe);
    }
}