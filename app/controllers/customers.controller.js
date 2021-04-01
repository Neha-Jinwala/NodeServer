const Customers = require('../models/customers.model.js');
const IDGenerator = require('../common/IDGenerator.js');

// Create and Save a new Policy
exports.create = (req, res) => {
    // Validate request
    if (!req.body.FirstName) {
        return res.status(400).send({
            message: "FirstName content can not be empty"
        });
    }
    if (!req.body.LastName) {
        return res.status(400).send({
            message: "LastName content can not be empty"
        });

    }
    if (!req.body.EmailID) {
        return res.status(400).send({
            message: "EmailID content can not be empty"
        });
    }

    // Create a EmailID
    const Custobj = new Customers({
        _id: IDGenerator.generateCustomerID(),
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        EmailID: req.body.EmailID
    });

    // Save EmailID in the database
    Custobj.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the EmailID."
            });
        });
};


// Retrieve and return all customer from the database.
exports.findAll = (req, res) => {
    Customers.find()
        .then(customers => {
            res.send(customers);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving EmailID."
            });
        });
};


// Find a single policy with a Customer
exports.findOne = (req, res) => {
    Customers.find({ 'EmailID': req.params.EmailID })
        .then(customers => {
            if (!customers) {
                return res.status(404).send({
                    message: "Customers not found with id " + req.params.EmailID
                });
            }
            res.send(customers);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Customers not found with id " + req.params.EmailID
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
    Customers.findByIdAndUpdate(req.body._id, {
        EmailID: req.body.EmailID ,
        FirstName: req.body.FirstName,
        LastName: req.body.LastName
    }, { new: true })
        .then(Custobj => {
            if (!Custobj) {
                return res.status(404).send({
                    message: "Customers not found with id " + req.params.EmailID
                });
            }
            res.send(Custobj);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
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
    Customers.findOneAndDelete({ 'EmailID': req.params.EmailID })
        .then(customers => {
            if (!customers) {
                return res.status(404).send({
                    message: "EmailID  not found with id " + req.params.EmailID
                });
            }
            res.send({ message: "EmailID deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'EmailID' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "EmailID  not found with id " + req.params.EmailID
                });
            }
            return res.status(500).send({
                message: "Could not delete policy with id " + req.params.EmailID
            });
        });
};

