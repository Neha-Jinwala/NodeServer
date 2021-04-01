const mongoose = require('mongoose');

const PolicySchema = mongoose.Schema({
    _id:String,
    PolicyPeriod:Object
}, {
    timestamps: true
});

module.exports = mongoose.model('Policy', PolicySchema);
