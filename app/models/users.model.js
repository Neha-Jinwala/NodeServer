const mongoose = require("mongoose");

// Create Schema
const UsersSchema = mongoose.Schema({
    AccountNumber: {
        type: String,
        // required: false
    },
    PolicyNumber: {
        type: String,
        // required: false
    },
    FirstName: {
        type: String,
        // required: true
    },
    LastName: {
        type: String,
        // required: true
    },
    EmailID: {
        type: String,
        // required: true
    },
    Password: {
        type: String,
        // required: true
    }
});

module.exports = mongoose.model('users', UsersSchema);