const mongoose = require('mongoose');

const CustomersSchema = mongoose.Schema({
   
    _id:String,
    FirstName: { 
        type: String, 
        required: true 
      },
    LastName: { 
        type: String, 
        required: true 
      },
     EmailID: { 
        type: String, 
        required: true 
      }
    
}, {
    timestamps: true
});

module.exports = mongoose.model('customers', CustomersSchema);
