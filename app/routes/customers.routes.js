module.exports = (app) => {
    const customers = require('../controllers/customers.controller.js');

    // Create a new customers
    app.post('/customer_create', customers.create);

    app.get('/customer_getall', customers.findAll);

    app.get('/customer_getbyemailid/:EmailID', customers.findByEmailID);

    app.put('/customer_update', customers.update);

    app.delete('/customer_delete/:_id', customers.delete);
}