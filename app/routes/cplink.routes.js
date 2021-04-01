module.exports = (app) => {
    const cplink = require('../controllers/cplink.controller.js');

    // Create a new cplinks
    app.post('/cplink', cplink.create);

    // Retrieve all cplinks
    app.get('/cplink', cplink.findAll);

    // Retrieve a single cplinks with EmailID and Account Number
    app.get('/cplink/byEmailID/:EmailID', cplink.findManyByEmailID);
    app.get('/cplink/byAccountNumber/:AccountNumber', cplink.findManyByAccountNumber);

    // Update a policies with EmailID
    //app.put('/cplink/:EmailID', cplink.update);

    // Delete a cplinks with EmailID and Account Number
    app.delete('/cplink/:AccountNumber', cplink.delete);
    
}