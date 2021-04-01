module.exports = (app) => {
    const policies = require('../controllers/policy.controller.js');
    
    app.get('/policies', policies.findAll);
        
}