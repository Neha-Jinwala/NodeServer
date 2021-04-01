const mongoose = require('mongoose');

const cplink = mongoose.Schema({

  _id: String,
  EmailID: {
    type: String,
    required: true
  },

  PolicyNumber: {
    type: String
  },
  AccountNumber: {
    type: String
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('CPLink', cplink);
