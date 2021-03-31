const mongoose = require('mongoose');
 
const CustomerSchema = mongoose.Schema({
    firstname: String,
    lastname: String,
    emailid: String
  
   
});

module.exports = mongoose.model('Customer', CustomerSchema);