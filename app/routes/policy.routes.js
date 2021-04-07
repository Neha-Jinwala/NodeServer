module.exports = (app) => {
    const policies = require('../controllers/policy.controller.js');
    
    app.get('/policies', policies.findAll);
    app.get('/policies_forcustomers/:EmailID', policies.findByEmailID);
}