const mongoose = require('mongoose');

const TPolicySchema = mongoose.Schema({
    _id:String,
    PolicyPeriod:Object
}, {
    timestamps: true
});

module.exports = mongoose.model('TPolicy', TPolicySchema);
