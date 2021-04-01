const Policy = require('../models/policy.model.js');


// Retrieve and return all policy from the database.
exports.findAll = (req, res) => {
    Policy.find()
    .then(policies => {
        res.send(policies);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving policy."
        });
    });
};


