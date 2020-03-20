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

    // getBugAndProjects: async (req,res,next) => {
    //     const { id } = req.params;
    //     const bug = await Bug.findById(id).populate('project');
    
    //     console.log("Bug: " + bug.bugs);
    //     res.status(200).json(bug);
    // },

    // newRecipeProjects: async (req, res, next) => {
    //     const { id } = req.params;

    //     let newBug  = new Bug(req.body);
        
    //     console.log("Req Body", req.body);
    //     console.log('New bug', newBug);

    //     const bug = await Bug.findById(id).populate('project');
    //     console.log("New Bug bugs " + bug);
    //     // Assign bug as bug's bug
    //     console.log("Newbug bugs" + newBug.bugs);
    //     newBug.bugs = bug;

    //     await newBug.save();
    //     // Add bug to bugs array of bugs
    //     //console.log("Bugs " + bug.bugs);
    //     console.log("Bug bugs " + bug);
    //     bug.bugs.push(newBug);
    //     // Save the bug
    //     await bug.save();
    //     //console.log("After save Bug bugs ",bug);
    //     res.status(201).json(newBug);
    
    
}