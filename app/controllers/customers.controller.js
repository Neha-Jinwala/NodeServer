const Customers = require('../models/customers.model.js');
const IDGenerator = require('../common/IDGenerator.js');

// Create and Save a new Policy
exports.create = (req, res) => {
    console.log("Received request to create Customer");
    // Validate request
    if (!req.body.FirstName) {
        return res.status(400).send({
            message: "FirstName content cannot be empty"
        });
    }
    if (!req.body.LastName) {
        return res.status(400).send({
            message: "LastName content cannot be empty"
        });

    }
    if (!req.body.EmailID) {
        return res.status(400).send({
            message: "EmailID content cannot be empty"
        });
    }

    const Custobj = new Customers({
        _id: IDGenerator.generateCustomerID(),
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        EmailID: req.body.EmailID
    });

    Custobj.save()
        .then(data => {
            console.log("Customer created Successfully!");
            res.status(200).send({
                message: "Customer cCreated Successfully!"
            });
        }).catch(err => {
            console.log("Some error occurred while creating the Customer Entry.");
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Customer Entry."
            });
        });
};

exports.findAll = (req, res) => {
    Customers.find()
        .then(customers => {
            res.send(customers);
        }).catch(err => {
            console.log(err.message)
            console.log(err)
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Customers."
            });
        });
};

exports.findByEmailID = (req, res) => {    
    Customers.find({ 'EmailID': req.params.EmailID })
        .then(customers => {
            if (!customers) {
                return res.status(400).send({
                    message: "Customer not found with id " + req.params.EmailID
                });
            }
            res.send(customers);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(500).send({
                    message: "Customer not found with id " + req.params.EmailID
                });
            }
            console.log(err.message)
            console.log(err)
            return res.status(500).send({
                message: "Error retrieving Customer with id " + req.params.EmailID
            });
        });
};


exports.update = (req, res) => {
    console.log("Received request to update Customer");
    Customers.findByIdAndUpdate(req.body._id, {
        EmailID: req.body.EmailID,
        FirstName: req.body.FirstName,
        LastName: req.body.LastName
    }, { new: true })
        .then(Custobj => {
            if (!Custobj) {
                console.log("Customer not found with id " + req.body._id);
                return res.status(400).send({
                    message: "Customer not found with id " + req.body._id
                });
            }
            console.log("Customer updated successfully!");
            res.status(200).send({
                message: "Customer updated successfully!"
            });
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                console.log("Customer not found with id " + req.body._id);
                return res.status(500).send({
                    message: "Customer not found with id " + req.body._id
                });
            }
            console.log("Error updating Customer with id " + req.body._id);
            console.log(err.message)
            console.log(err)
            return res.status(500).send({
                message: "Error updating Customer with id " + req.body._id
            });
        });
};


// Delete a policy with the specified policyId in the request
exports.delete = (req, res) => {
    console.log("Received request to delete Customer with id " + req.params._id);
    Customers.findByIdAndRemove(req.params._id)
        .then(customers => {
            if (!customers) {
                console.log("Customer not found with id " + req.params._id);
                return res.status(400).send({
                    message: "Customer not found with id " + req.params._id
                });
            }
            console.log("Customer deleted successfully!");
            res.status(200).send({
                message: "Customer deleted successfully!"
            });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                console.log("Customer not found with id " + req.params._id);
                return res.status(500).send({
                    message: "Customer not found with id " + req.params._id
                });
            }
            console.log("Could not delete customer with id " + req.params._id);
            console.log(err.message)
            console.log(err)
            return res.status(500).send({
                message: "Could not delete customer with id " + req.params._id
            });
        });
};

