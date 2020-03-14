let Shoplist = require('../models/ShopList.model');
const shoplistRoute = require('express-promise-router')();

let ShopListController = require('../controllers/shoplist.controller');

//All routes:
//localhost:5000/shoplist/

shoplistRoute.route('/')
    .get(ShopListController.index)
    .post(ShopListController.newShoplist);

//get single shop list, update single shop list
shoplistRoute.route('/:id')
    .get(ShopListController.getShoplist)
    .put(ShopListController.replaceShopList)
    .patch(ShopListController.updateShopList);

//===============Relationships with Recipe mode=================

//get all recipes added to the shop list ID

shoplistRoute.route('/recipesList/:id')
    .get(ShopListController.getShoplistRecipes)

// add recipe to the shop list ID
shoplistRoute.route('/addRecipe/:id')
    .post(ShopListController.addRecipeToShopList);
    

//=============================================================
// Delete shop list

shoplistRoute.route('/:id').delete((req, res)=> {
    Shoplist.findByIdAndDelete(req.params.id)
        .then(() => res.json('List is deleted'))
        .catch(err => res.status(400).json('Error: ',err));
});

module.exports = shoplistRoute;