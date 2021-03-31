module.exports = (app) => {
    const policies = require('../controllers/policy.controller.js');

    // Create a new policies
    app.post('/policies', policies.create);

    // Retrieve all policies
    app.get('/policies', policies.findAll);

    // Retrieve a single policies with policiesId
    app.get('/policies/:policiesId', policies.findOne);

    // Update a policies with policiesId
    app.put('/policies/:policiesId', policies.update);

    // Delete a policies with policiesId
    app.delete('/policies/:policiesId', policies.delete);
}