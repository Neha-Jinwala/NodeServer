const Validator = require('validator');
const Policy = require('../models/policy.model');
const Users = require('../models/users.model');

var userobj = new Users();

// Create and save a new User
exports.create = (req, res) => {
    console.log("Received request to create User");
    console.log(req.body);
    // Validate request
    if(!req.body.AccountNumber && !req.body.PolcyNumber){
        return res.status(400).send({
            message: "Either Account number or Policy Number is required"
        });
    }
    if(!req.body.FirstName){
        return res.status(400).send({
            message: "FirstName content cannot be empty"
        });
    }
    if(!req.body.LastName){
        return res.status(400).send({
            message: "LastName content cannot be empty"
        });
    }
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
    if(!Validator.isLength(req.body.Password, { min : 6 })){
        return res.status(400).send({
            message: "Password must be at least 6 characters"
        });
    }

    Users.findOne({ email : req.body.email }).then(user => {
        if(user){
            return res.status(400).send({
                message : "Email already exists" 
            });
        }
    });
    if(req.body.AccountNumber){
        Policy.findOne({'PolicyPeriod.Policy.Account.AccountNumber': req.body.AccountNumber})
        .then(newuser => {
            newuser = new Users({
                AccountNumber: req.body.AccountNumber,
                FirstName: req.body.FirstName,
                LastName: req.body.LastName,
                EmailID: req.body.EmailID,
                Password: req.body.Password
            });
            // console.log("New User"  + newuser);
            userobj = newuser;
            // console.log("New User object" + userobj);
        });
    } else if(req.body.PolicyNumber){
        Policy.findOne({'PolicyPeriod.PolicyNumber': req.body.PolicyNumber})
        .then(newuser => {
            newuser = new Users({
                PolicyNumber: req.body.PolicyNumber,
                FirstName: req.body.FirstName,
                LastName: req.body.LastName,
                EmailID: req.body.EmailID,
                Password: req.body.Password
            });
            userobj = newuser;
        })
    } else {
        return res.status(400).send({
            message : "Either Account number or Policy number is required"
        });
    }
    //Policy.findOne('PolicyPeriod.Policy.Account.AccountNumber' will be matching req.body.AccountNumber) => match then proceed else check for policy
    //Policy.findOne('PolicyPeriod.PolicyNumber' will be matching req.body.PolicyNumber) => match then proceed else check for policy
    var Userobj = new Users(userobj);
    //console.log("User object created" + Userobj);

    Userobj.save().then(data => {
        console.log("User created successfully!");
        res.status(200).send({
            message: "User created successfully!"
        });
    }).catch(err => {
        console.log("Some error occurres while creating the User Entry.");
        res.status(500).send({
            message: err.message || "Some error occurred while creating User entry."
        });
    });
};


