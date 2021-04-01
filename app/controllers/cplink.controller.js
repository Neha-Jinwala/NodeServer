const CPLink = require('../models/cplink.model.js');
const IDGenerator = require('../common/IDGenerator.js');

exports.create = (req, res) => {
    // Validate request
    console.log("cplink.controller: received request to add cplink with details");
    console.log(`cplink.controller: EmailID: ${req.body.EmailID}`);
    console.log(`cplink.controller: PolicyNumber: ${req.body.PolicyNumber}`);
    console.log(`cplink.controller: AccountNumber: ${req.body.AccountNumber}`);

    if (!req.body.EmailID) {
        console.log("cplink.controller: EmailID cannot be empty");
        return res.status(400).send({
            message: "EmailID cannot be empty"
        });
    }

    if (!req.body.PolicyNumber && !req.body.AccountNumber) {
        console.log("cplink.controller: Either Policy Number or Account Number must be present");
        return res.status(400).send({
            message: "cplink.controller: Either Policy Number or Account Number must be present"
        });
    }

    const cpl = new CPLink({
        _id: IDGenerator.generateCPLinkID(),
        EmailID: req.body.EmailID,
        PolicyNumber: req.body.PolicyNumber,
        AccountNumber: req.body.AccountNumber
    });

    cpl.save()
        .then(data => {
            console.log("cplink.controller: CPLink created successfully.");
            res.status(200).send({
                message: "CPLink created successfully."
            });
        }).catch(err => {
            console.log("cplink.controller: Some error occurred while creating the CPLink.");
            res.status(500).send({
                message: err.message || "Some error occurred while creating the CPLink."
            });
        });
};

// Retrieve and return all CPLink from the database.
exports.findAll = (req, res) => {
    console.log("cplink.controller: received request to find all cplinks");
    CPLink.find()
        .then(cpl => {
            console.log(`cplink.controller: found ${cpl.length} cplinks`);
            res.send(cpl);
        }).catch(err => {
            console.log("cplink.controller: Some error occurred while retrieving CPLinks.");
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving CPLinks."
            });
        });
};

exports.findByEmailID = (req, res) => {
    console.log(`cplink.controller: received request to find cplinks for EmailID : ${req.params.EmailID}`);
    CPLink.find({ 'EmailID': req.params.EmailID })
        .then(cpl => {
            if (!cpl) {
                console.log(`cplink.controller: No CPLinks found for email ID : ${req.params.EmailID}`);
                return res.status(400).send({
                    message: "No CPLinks found for email ID " + req.params.EmailID
                });
            }
            console.log(`cplink.controller: found ${cpl.length} cplinks for email ID : ${req.params.EmailID}`);
            res.send(cpl);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                console.log(`CPLink not found with id : ${req.params.EmailID}`);
                return res.status(500).send({
                    message: "CPLink not found with id " + req.params.EmailID
                });
            }
            console.log(`Error retrieving CPLink with id : ${req.params.EmailID}`);
            return res.status(500).send({
                message: "Error retrieving CPLink with id " + req.params.EmailID
            });
        });
};

exports.update = (req, res) => {
    CPLink.findByIdAndUpdate(req.body._id, {
        EmailID: req.body.EmailID,
        PolicyNumber: req.body.PolicyNumber,
        AccountNumber: req.body.AccountNumber
    }, { new: true })
        .then(cpl => {
            if (!cpl) {
                return res.status(400).send({
                    message: "CPLink not found with id " + req.body._id
                });
            }
            res.status(200).send({
                message: "CPLink updated successfully!"
            });
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(500).send({
                    message: "CPLink not found with id " + req.body._id
                });
            }
            return res.status(500).send({
                message: "Error updating CPLink with id " + req.body._id
            });
        });
};


exports.delete = (req, res) => {
    CPLink.findByIdAndRemove(req.params._id)
        .then(cpl => {
            if (!cpl) {
                return res.status(404).send({
                    message: "CPLink not found with id : " + req.params._id
                });
            }
            res.status(200).send({ message: "CPLink deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(500).send({
                    message: "CPLink not found with ID : " + req.params._id
                });
            }
            return res.status(500).send({
                message: "Could not delete CPLink with ID :  " + req.params._id
            });
        });
};
