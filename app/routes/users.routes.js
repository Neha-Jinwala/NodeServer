module.exports = (app) => {
    const users = require('../controllers/users.controllers');
    const login = require('../controllers/login.controllers');

    // Create a new user
    app.post('/signup', users.create);

    app.get('/signin', login.find);
}