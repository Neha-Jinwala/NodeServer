const CPLink = require('../models/cplink.model.js');

// Create and Save a CPLink
exports.create = (req, res) => {
    // Validate request
    if (!req.body.EmailID) {
        return res.status(400).send({
            message: "EmailID content can not be empty"
        });
    }
    if (!req.body.PolicyNumber) {
        return res.status(400).send({
            message: "Policynumber content can not be empty"
        });
    }
    // Create a CPLink
    const cpl = new CPLink({
        _id : req.body._id,
        EmailID: req.body.EmailID,
        PolicyNumber: req.body.PolicyNumber
    });

    // Save CPLink in the database
    cpl.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the CPLink."
            });
        });
};


// Retrieve and return all CPLink from the database.
exports.findAll = (req, res) => {
    CPLink.find()
        .then(cpl => {
            if (!cpl) {
                return res.status(404).send({
                    message: "No CPLinks found "
                });
            }
            res.send(cpl);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving CPLink."
            });
        });
};


// Find a single CPLink with a EmailID
exports.findMany = (req, res) => {
    CPLink.find({ 'EmailID': req.params.EmailID })
        .then(cpl => {
            if (!cpl) {
                return res.status(404).send({
                    message: "No CPLinks found for email Id " + req.params.EmailID
                });
            }
            res.send(cpl);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "CPLink not found with id " + req.params.EmailID
                });
            }
            return res.status(500).send({
                message: "Error retrieving CPLink with id " + req.params.EmailID
            });
        });
};


// Update a CPLink identified by the policyId in the request
/* exports.update = (req, res) => {

    // Find policy and update it with the request body
    CPLink.findOneAndUpdate(req.params.CPLink, {
        EmailID: req.body.EmailID,
        PolicyNumber: req.body.PolicyNumber
    }, { new: true })
        .then(cpl => {
            if (!cpl) {
                return res.status(404).send({
                    message: "CPLink not found with id " + req.params.EmailID
                });
            }
            res.send(cpl);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "CPLink not found with id " + req.params.EmailID
                });
            }
            return res.status(500).send({
                message: "Error updating CPLink with id " + req.params.EmailID
            });
        });
};
 */

// Delete a CPLink with the specified EmailID in the request
exports.delete = (req, res) => {
    CPLink.findOneAndDelete(req.params.EmailID)
        .then(cpl => {
            if (!cpl) {
                return res.status(404).send({
                    message: "CPLink not found with id " + req.params.EmailID
                });
            }
            res.send({ message: "CPLink deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "CPLink not found with id " + req.params.EmailID
                });
            }
            return res.status(500).send({
                message: "Could not delete CPLink with id " + req.params.EmailID
            });
        });
};