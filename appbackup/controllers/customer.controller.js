
const Customers = require('../models/customer.model.js');


exports.createCustomer = (req, res) => {

    const customer = new Customer({
                          firstname: req.body.firstname,
                          lastname: req.body.lastname,
                          emailid: req.body.emailid,
                        });
 
    // Save a Customer in the MongoDB
    customer.save().then(data => {
                    res.status(200).json(data);
                }).catch(err => {
                    res.status(500).json({
                      message: "Fail!",
                      error: err.message
                    });
                });
};

exports.getCustomer = (req, res) => {
  Customer.findById(req.params.emailid).select('-__v')
      .then(customer => {
        res.status(200).json(customer);
      }).catch(err => {
          if(err.kind === 'ObjectId') {
              return res.status(404).send({
                  message: "Customer not found with id " + req.params.emailid,
                  error: err
              });                
          }
          return res.status(500).send({
              message: "Error retrieving Customer with id " + req.params.emailid,
              error: err
          });
      });
};

exports.customers = (req, res) => {
  Customers.find().select('-__v').then(customerInfos => {
        res.status(200).json(customerInfos);
      }).catch(error => {
        // log on console
        console.log(error);

        res.status(500).json({
            message: "Error!",
            error: error
        });
      });
};

exports.deleteCustomer = (req, res) => {
  let emailid = req.params.emailid

  Customer.findByIdAndRemove(emailid).select('-__v -_id')
      .then(customer => {
          if(!customer) {
            res.status(404).json({
              message: "Does Not exist a Customer with id = " + emailid,
              error: "404",
            });
          }
          res.status(200).json({});
      }).catch(err => {
          return res.status(500).send({
            message: "Error -> Can NOT delete a customer with id = " + emailid,
            error: err.message
          });
      });
};

exports.updateCustomer = (req, res) => {
  // Find customer and update it
  Customer.findByIdAndUpdate(
                    req.body._id, 
                    {
                      firstname: req.body.firstname,
                      lastname: req.body.lastname,
                    emailid:req.body.emailid
                    }, 
                      {new: true}
                  ).select('-__v')
      .then(customer => {
          if(!customer) {
              return res.status(404).send({
                  message: "Error -> Can NOT update a customer with id = " + req.params.emailid,
                  error: "Not Found!"
              });
          }

          res.status(200).json(customer);
      }).catch(err => {
          return res.status(500).send({
            message: "Error -> Can not update a customer with id = " + req.params.emailid,
            error: err.message
          });
      });
};