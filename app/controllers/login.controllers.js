const Validator = require('validator');
const User = require('../models/users.model');
const jwt = require('jsonwebtoken');
const keys = require('../../config/database.config');

// Find user
exports.find = (req, res) => {
    console.log("Received request to for logging in User");
    // Validate request
    if(!req.body.EmailID){
        return res.status(400).send({
            message: "EmailID content cannot be empty"
        });
    }
    if(!Validator.isEmail(req.body.EmailID)){
        return res.status(400).send({
            message: "EmailID is invalid"
        });
    }
    if(!req.body.Password){
        return res.status(400).send({
            message: "Password content cannot be empty"
        });
    }

    // Find user by email
    User.findOne({'EmailID' : req.body.EmailID})
        .then(user => {
            // checks if user exists
            if(!user){
                return res.status(400).send({
                    message : "User not found with email " + req.params.EmailID
                });
            }

            // checks for password
            if(req.body.Password === user.Password){
                // User matched
                // Create JWT payload
                const payload = {
                    FirstName : user.FirstName,
                    LastName : user.LastName,
                    EmailID : user.EmailID
                };
                // Sign token
                jwt.sign(
                    payload,
                    keys.secretOrKey,
                    {
                        expiresIn: 7200 // 2 hours in seconds
                    },
                    (err, token) => {
                        res.json({
                            success : true,
                            token : "Bearer " + token
                        });
                    }
                );
            } else {
                return res.status(400).send({
                    message : "Incorrect password"
                });
            }
    });
}