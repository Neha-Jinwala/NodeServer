module.exports = (app) => {
    const tpolicies = require('../controllers/tpolicy.controller.js');
    
    app.get('/tpolicies', tpolicies.findAll);
    app.get('/tpolicies_forcustomers/:EmailID', tpolicies.findByEmailID);
}