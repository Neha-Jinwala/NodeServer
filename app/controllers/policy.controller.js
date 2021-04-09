const Policy = require('../models/policy.model.js');
const CPLink = require('../models/cplink.model.js');


exports.findByEmailID = (req, res) => {
    console.log("CPLInk.findByEmailID:Finding CPLinks by email id " + req.params.EmailID)
    const queryCPLinks = CPLink.find()
    queryCPLinks.where('EmailID').eq(req.params.EmailID).exec()
        .then(cplinks => {
            console.log(`CPLInk.findByEmailID:Found ${cplinks.length} CPLinks by email id ` + req.params.EmailID)
            if (!cplinks) {
                return res.status(400).send({
                    message: "No cplinks found with EmailID " + req.params.EmailID
                });
            }
            let accPolArrayList = Policy.cpLinkAggregator(cplinks);
            let accList = accPolArrayList[0]
            let polList = accPolArrayList[1]

            const queryPols = Policy.find()
            if (accList != null && accList.length > 0 && polList != null && polList.length > 0) {
                queryPols.or([{ 'PolicyPeriod.Policy.Account.AccountNumber': { $in: accList } },
                { 'PolicyPeriod.PolicyNumber': { $in: polList } }])
            } else if (accList != null && accList.length > 0) {
                queryPols.where('PolicyPeriod.Policy.Account.AccountNumber').in(accList)
            } else if (polList != null && polList.length > 0) {
                queryPols.where('PolicyPeriod.PolicyNumber').in(polList)
            } else {
                return res.status(400).send({
                    message: "No valid cplinks found with EmailID " + req.params.EmailID
                });
            }
            queryPols.exec()
                .then(policies => {
                    console.log(`CPLink.findByEmailID: Found ${policies.length} Policies`)
                    res.send(policies);
                }).catch(err => {
                    console.log('CPLink.findByEmailID: Some error occurred while retrieving Policies')
                    res.status(500).send({
                        message: err.message || 'Some error occurred while retrieving Policies'
                    });
                    return [];
                });

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
}

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

Policy.findByAccNumsAndPolNums = (accPolsListArray) => {
    console.log('CPLink.findByAccNumsAndPolNums: Starting')
    let accList = accPolsListArray[0]
    let polList = accPolsListArray[1]
    Policy.find({ $or: [{ 'PolicyPeriod.Policy.Account.AccountNumber': { $in: accList } }, { 'PolicyPeriod.PolicyNumber': { $in: polList } }] })
        .then(policies => {
            console.log(`CPLink.findByAccNumsAndPolNums: Found ${policies.length} Policies`)
            return policies;
        }).catch(err => {
            console.log('CPLink.findByAccNumsAndPolNums: Some error occurred while retrieving Policies')
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieving Policies'
            });
            return [];
        });
};

Policy.findByAccNums = (accList) => {
    console.log('CPLink.findByAccNums: Starting')
    Policy.find({ 'PolicyPeriod.Policy.Account.AccountNumber': { $in: accList } })
        .then(policies => {
            console.log(`CPLink.findByAccNums: Found ${policies.length} Policies`)
            return policies;
        }).catch(err => {
            console.log('CPLink.findByAccNums: Some error occurred while retrieving Policies')
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieving Policies'
            });
            return [];
        });
};

Policy.findByPolNums = (polList) => {
    console.log('CPLink.findByPolNums: Starting')
    Policy.find({ 'PolicyPeriod.PolicyNumber': { $in: polList } })
        .then(policies => {
            console.log(`CPLink.findByPolNums: Found ${policies.length} Policies`)
            return policies;
        }).catch(err => {
            console.log('CPLink.findByPolNums: Some error occurred while retrieving Policies')
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieving Policies'
            });
            return [];
        });
};

Policy.findByAggregator = (accPolsListArray) => {
    console.log('CPLink.findByAggregator: Starting')
    var { accList, polList } = accPolsListArray
    if (accList != null && accList.length > 0 && polList != null && polList.length > 0)
        Policy.find({ $or: [{ 'PolicyPeriod.Policy.Account.AccountNumber': { $in: accList } }, { 'PolicyPeriod.PolicyNumber': { $in: polList } }] })
            .then(policies => {
                console.log(`CPLink.findByAggregator: Found ${policies.length} Policies by account policy` + policyNumber)
                return policies;
            }).catch(err => {
                console.log('CPLink.findByAggregator: Some error occurred while retrieving Policies by policy number ' + policyNumber)
                res.status(500).send({
                    message: err.message || 'Some error occurred while retrieving Policies by policy number ' + policyNumber
                });
                return [];
            });
};

Policy.cpLinkAggregator = (cplinks) => {
    console.log(`CPLink.cpLinkAggregator: Aggregating ${cplinks.length} CPLinks for querying policies`)
    var accNumArr = []
    var polNumArr = []
    cplinks.forEach(cpLink => {
        if (cpLink.AccountNumber != null && cpLink.AccountNumber !== '') {
            accNumArr.push(cpLink.AccountNumber)
        } else if (cpLink.PolicyNumber != null && cpLink.PolicyNumber !== '') {
            polNumArr.push(cpLink.PolicyNumber)
        }
    })
    console.log('CPLink.cpLinkAggregator: Completed aggregation AccountNumbers for querying policies as:')
    console.log(`CPLink.cpLinkAggregator: ${accNumArr} `)
    console.log('CPLink.cpLinkAggregator: Completed aggregation PolicyNumbers for querying policies as:')
    console.log(`CPLink.cpLinkAggregator: ${polNumArr} `)
    return [accNumArr, polNumArr]

}



