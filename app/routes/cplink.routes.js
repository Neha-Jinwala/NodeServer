module.exports = (app) => {
    const cplink = require('../controllers/cplink.controller.js');

    // Create a new cplinks
    app.post('/cplink_create', cplink.create);

    // Retrieve all cplinks
    app.get('/cplink_getall', cplink.findAll);

    app.get('/cplink_getbyemailid/:EmailID', cplink.findByEmailID);
       
    app.put('/cplink_update', cplink.update);

    app.delete('/cplink_delete/:_id', cplink.delete);
    
}