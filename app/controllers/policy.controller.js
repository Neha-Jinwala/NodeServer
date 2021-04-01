const Policy = require('../models/policy.model.js');

// Create and Save a new Policy
exports.create = (req, res) => {
    // Validate request
	
    
    // Create a Policy
    const policy = new Policy({
	_id : req.body._id,
        PolicyPeriod: req.body.PolicyPeriod
    });

    // Save Policy in the database
    policy.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Policy."
        });
    });
};


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


// Find a single policy with a policyId
exports.findOne = (req, res) => {
    Policy.findById(req.params.policyId)
    .then(policy => {
        if(!policy) {
            return res.status(404).send({
                message: "Policy not found with id " + req.params.policyId
            });            
        }
        res.send(policy);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Policy not found with id " + req.params.policyId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving policy with id " + req.params.policyId
        });
    });
};


// Update a policy identified by the policyId in the request
exports.update = (req, res) => {
 
    // Find policy and update it with the request body
    Policy.findByIdAndUpdate(req.params.policyId, {
        PolicyPeriod: req.body.PolicyPeriod
    }, {new: true})
    .then(policy => {
        if(!policy) {
            return res.status(404).send({
                message: "Policy not found with id " + req.params.policyId
            });
        }
        res.send(policy);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Policy not found with id " + req.params.policyId
            });                
        }
        return res.status(500).send({
            message: "Error updating policy with id " + req.params.policyId
        });
    });
};


// Delete a policy with the specified policyId in the request
exports.delete = (req, res) => {
    Policy.findByIdAndRemove(req.params.policyId)
    .then(policy => {
        if(!policy) {
            return res.status(404).send({
                message: "Policy not found with id " + req.params.policyId
            });
        }
        res.send({message: "Policy deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Policy not found with id " + req.params.policyId
            });                
        }
        return res.status(500).send({
            message: "Could not delete policy with id " + req.params.policyId
        });
    });
};

