const Policy = require('../models/policy.model.js');
const CPLink = require('../models/cplink.model.js');



exports.findByEmailID = (req, res) => {
    var returnArray = [];
    console.log("CPLInk.findByEmailID:Finding CPLinks by email id "+req.params.EmailID)
    CPLink.find({ 'EmailID': req.params.EmailID })
        .then(cplinks => {
            console.log(`CPLInk.findByEmailID:Found ${cplinks.length} CPLinks by email id `+req.params.EmailID)
            if (!cplinks) {
                return res.status(400).send({
                    message: "No cplinks found with EmailID " + req.params.EmailID
                });
            }
            for (var i = 0; i < cplinks.length; i++) {
                let currentCPLink = cplinks[i];
                if(currentCPLink.AccountNumber != null && currentCPLink.AccountNumber !== ''){
                    console.log("CPLInk.findByEmailID: Finding Policies by AccountNumber " + currentCPLink.AccountNumber)
                    Policy.find({'PolicyPeriod.Policy.Account.AccountNumber':currentCPLink.AccountNumber})
                    .then(policies => {
                        console.log(`CPLInk.findByEmailID: Found ${policies.length} Policies by account number `+currentCPLink.AccountNumber)
                        if(policies != null && policies.length > 0){
                            returnArray = returnArray.concat(policies);
                            console.log("Return size after fetch by account is "+returnArray.length)
                        }
                    })
                } else if(currentCPLink.PolicyNumber != null && currentCPLink.PolicyNumber !== ''){
                    console.log("CPLInk.findByEmailID: Finding Policies by PolicyNumber " + currentCPLink.PolicyNumber)
                    Policy.find({'PolicyPeriod.PolicyNumber':currentCPLink.PolicyNumber})
                    .then(policies => {
                        console.log(`CPLInk.findByEmailID: Found ${policies.length} Policies by policy number `+currentCPLink.PolicyNumber)
                        if(policies != null && policies.length > 0){
                            returnArray = returnArray.concat(policies);
                            console.log("Return size after fetch by policy is "+returnArray.length)
                        }
                    })
                }
            }            
            console.log(`CPLInk.findByEmailID: Found total ${returnArray.length} policies for Email ID `+ req.params.EmailID)
            res.send(returnArray)
        })
        .catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(500).send({
                    message: "No cplinks found with EmailID " + req.params.EmailID
                });
            }
            console.log(err.message)
            console.log(err)
            return res.status(500).send({
                message: "Error retrieving cplinks with EmailID " + req.params.EmailID
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


