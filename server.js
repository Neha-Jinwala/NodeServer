const express = require('express');
const bodyParser = require('body-parser');

// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// parse requests of content-type - application/json
app.use(bodyParser.json())

// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');
const passport = require('passport');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// Passport middleware
app.use(passport.initialize());

// Passport config
require('./config/passport')(passport);

// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to NodeJS Customer DataBase"});
});

// Require Policy routes
require('./app/routes/policy.routes.js')(app);
require('./app/routes/customers.routes.js')(app);
require('./app/routes/cplink.routes.js')(app);
require('./app/routes/users.routes.js')(app);
//require('./app/routes/customer_policy_link.routes.js')(app);

// listen for requests
const portNum =5001
app.listen(portNum, () => {
    console.log("Server is listening on port "+portNum);
});
