module.exports = (app) => {
    const customers = require('../controllers/customersold.controller.js');

    // Create a new customers
    app.post('/customers', customers.create);

    // Retrieve all policies
    app.get('/customers', customers.findAll);

    // Retrieve a single policies with EmailID
    app.get('/customers/:EmailID', customers.findOne);

    // Update a policies with EmailID
    app.put('/customers/:EmailID', customers.update);

    // Delete a policies with EmailID
    app.delete('/customers/:EmailID', customers.delete);
}