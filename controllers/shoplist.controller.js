const ShopList = require('../models/ShopList.model');
const Recipe = require('../models/Recipe.model')

module.exports = {
    // View all shopping lists created

    index: async(req, res,next) => {
        const shoplists = await ShopList.find({});
        res.status(200).json(shoplists);
    },

    //create shoplist
    newShoplist: async (req, res, next ) => {
        
        let newShoplist = new ShopList(req.body);
        let shoplist = await newShoplist.save();
        res.status(200).json({
            "Shopping List": "Shopping list added success" + shoplist
        })
    },

    //view details of one shopping lsit created
    getShoplist: async (req, res,next) => {

        const { id } = req.params;
        const shoplist = await ShopList.findById(id);
        res.status(200).json(shoplist);
    },

    replaceShopList: async (req, res,next) => {
        const { id } = req.params;

        const newShoplist = req.body;

        const result = await ShopList.findByIdAndUpdate(id, newShoplist);

        res.status(200).json({success : true});
    },

    updateShopList: async (req, res, next) => {

        const { id } = req.params;

        const newShopList = req.body;
        const result = await ShopList.findByIdAndUpdate(id, newShopList);
        res.status(200).json({success: true});
    },


//===============Relationships with Recipe mode=================

    //get all recipes within the shoplist
    getShoplistRecipes: async (req, res,next) => {
        const { id } = req.params;
        const shoplist = await ShopList.findById(id).populate('Recipe');

        console.log("Shopping list " + shoplist.recipes)

        res.status(200).json(shoplist);
    },

    //add recipe to shoplist
    addRecipeToShopList: async (req,res, next) => {
        
        const { id } = req.params;
        console.log("ID",id);

        let newRecipe = new Recipe(req.body);
        console.log("newRecipe object: ",newRecipe);

        const shoplist = await ShopList.findById(id).populate('Recipe');
        console.log("Shoplist",shoplist);

        newRecipe.shoplists = shoplist;
        console.log("newRecipe.shoplists", newRecipe.shoplists);

        //console.log("Shoplist recipes", shoplist.recipes);
        
        await newRecipe.save();
        shoplist.recipes.push(newRecipe);

        await shoplist.save();

        res.status(201).json(newRecipe);
    }
}