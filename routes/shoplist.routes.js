let Shoplist = require('../models/ShopList.model');
const shoplistRoute = require('express-promise-router')();

let ShopListController = require('../controllers/shoplist.controller');

shoplistRoute.route('/')
    .get(ShopListController.index)
    .post(ShopListController.newShoplist);

//get single shop list, update single shop list
shoplistRoute.route('/:id')
    .get(ShopListController.getShoplist)
    .put(ShopListController.replaceShopList)
    .patch(ShopListController.updateShopList);

//get all recipes added to the shop list

shoplistRoute.route('/list/:id')
    .get(ShopListController.getShoplistRecipes)

// add recipe to the shop list 
shoplistRoute.route('/recipe/:id/addRecipe')
    .post(ShopListController.addRecipeToShopList);
    
// Delete shop list

shoplistRoute.route('/:id').delete((req, res)=> {
    Shoplist.findByIdAndDelete(req.params.id)
        .then(() => res.json('List is deleted'))
        .catch(err => res.status(400).json('Error: ',err));
});

module.exports = shoplistRoute;