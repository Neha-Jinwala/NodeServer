const mongoose = require('mongoose');

const customersSchema = mongoose.Schema({
   
    _id:String,
    FirstName:String,
    LastName:String,
    EmailID: String
    
}, {
    timestamps: true
});

module.exports = mongoose.model('customers', customersSchema);
