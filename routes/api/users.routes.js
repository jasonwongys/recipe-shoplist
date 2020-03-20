const express = require("express");
// const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

let UsersController = require('../../controllers/user.controller')
const userRoute = require('express-promise-router')();

// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Load User model
const User = require("../../models/User.model");

// @route POST api/users/register
// @desc Register user
// @access Public


//Add recipe to user via user DB id


// userRoute.route('/shoplist/:id')
//     .get(UsersController.getShopListByUser)
//     .post(UsersController.newShopListByUser);

userRoute.route('/recipe/:id')
    .get(UsersController.getRecipesByUser) // get all recipes saved by user
    .post(UsersController.addRecipeByUser)
    .put(UsersController.updateRecipeForUser)

// userRoute.route('/recipe/:id1/getSingleRecipe/:id2')
//     .get(UsersController.getSingleRecipe);

    
// When user registers for account, create a shopping list with ID
userRoute.post("/register", (req, res) => {
    // Form validation

    const { errors, isValid } = validateRegisterInput(req.body);

    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
            return res.status(400).json({ email: "Email already exists" });
        } else {
            const newUser = new User({
                
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            });

            // Hash password before saving in database
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser
                        .save()
                        .then(user => res.json(user),
                            console.log("New user", newUser))
                        .catch(err => console.log(err));
                });
            });
        }
    });
});

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
userRoute.post("/login", (req, res) => {
    // Form validation

    const { errors, isValid } = validateLoginInput(req.body);

    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    // Find user by email
    User.findOne({ email }).then(user => {
        // Check if user exists
        if (!user) {
            return res.status(404).json({ emailnotfound: "Email not found" });
        }

        // Check password
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                // User matched
                // Create JWT Payload
                const payload = {
                    id: user.id,
                    name: user.name
                };

                // Sign token
                jwt.sign(
                    payload,
                    keys.secretOrKey,
                    {
                        expiresIn: 31556926 // 1 year in seconds
                    },
                    (err, token) => {
                        res.json({
                            success: true,
                            token: "Bearer " + token
                        });
                    }
                );
            } else {
                return res
                    .status(400)
                    .json({ passwordincorrect: "Password incorrect" });
            }
        });
    });
});


userRoute.route('/usersList').get(function(req,res) {
    User.find(function(err, users) {
        if (err) {
            console.log(err);

        }else {
            res.json(users)
        }
    })
})

module.exports = userRoute;