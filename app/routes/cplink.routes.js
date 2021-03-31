module.exports = (app) => {
    const cplink = require('../controllers/cplink.controller.js');

    // Create a new customers
    app.post('/cplink', cplink.create);

    // Retrieve all policies
    app.get('/cplink', cplink.findAll);

    // Retrieve a single policies with EmailID
    app.get('/cplink/:EmailID', cplink.findMany);

    // Update a policies with EmailID
    //app.put('/cplink/:EmailID', cplink.update);

    // Delete a policies with EmailID
    app.delete('/cplink/:EmailID', cplink.delete);
}