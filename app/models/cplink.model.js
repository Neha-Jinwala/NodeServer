const mongoose = require('mongoose');

const cplink = mongoose.Schema({
   
    _id:String,
     EmailID: { 
        type: String, 
        required: true 
      },
      
    PolicyNumber: { 
        type: String, 
        required: true 
      }
       
}, {
    timestamps: true
});

module.exports = mongoose.model('CPLink', cplink);
