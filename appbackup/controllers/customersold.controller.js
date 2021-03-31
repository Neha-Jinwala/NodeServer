const Customers = require('../models/customersold.model.js');

// Create and Save a new Policy
exports.create = (req, res) => {
    // Validate request
	
    
    // Create a EmailID
    const Custobj = new Customers ({
	_id : req.body._id,
    FirstName: req.body.FirstName,
    LastName: req.body.LastName,
    EmailID: req.body.EmailID
    });

    // Save Policy in the database
    Custobj.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the customer."
        });
    });
};


// Retrieve and return all policy from the database.
exports.findAll = (req, res) => {
    Customers.find()
    .then(customers => {
        res.send(customers);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving customer."
        });
    });
};


// Find a single policy with a Custobj
exports.findOne = (req, res) => {
    Customers.findById(req.params.EmailID)
    .then(customers => {
        if(!customers) {
            return res.status(404).send({
                message: "Custobj not found with id " + req.params.EmailID
            });            
        }
        res.send(customers);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Custobj not found with id " + req.params.EmailID
            });                
        }
        return res.status(500).send({
            message: "Error retrieving Custobj with id " + req.params.EmailID
        });
    });
};


// Update a policy identified by the policyId in the request
exports.update = (req, res) => {
 
    // Find policy and update it with the request body
    Customers.findByIdAndUpdate(req.params.EmailID, {
        CustomersList: req.body.CustomersList
    }, {new: true})
    .then(Custobj => {
        if(!Custobj) {
            return res.status(404).send({
                message: "Policy not found with id " + req.params.EmailID
            });
        }
        res.send(Custobj);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "EmailID not found with id " + req.params.EmailID
            });                
        }
        return res.status(500).send({
            message: "Error updating Email with id " + req.params.EmailID
        });
    });
};


// Delete a policy with the specified policyId in the request
exports.delete = (req, res) => {
    Customers.findByIdAndRemove(req.params.EmailID)
    .then(Custobj => {
        if(!Custobj) {
            return res.status(404).send({
                message: "EmailID not found with id "  + err.kind + " -- "  + req.params.EmailID
            });
        }
        res.send({message: "EmailID deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'EmailID' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "EmailID not found with id " + err.kind + " -- " + req.params.EmailID
            });                
        }
        return res.status(500).send({
            message: "Could not delete policy with id " + req.params.EmailID
        });
    });
};

