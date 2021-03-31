var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json())

// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');


 
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


// // Connecting to the database
// mongoose.connect(dbConfig.url, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(async () => {
//         console.log("Successfully connected to MongoDB.");   
//         const customers = [
//             { firstname: 'Jack', lastname: 'Smith', 
//                      emailid: 'jack@example.com'},
//             { firstname: 'Adam', lastname: 'Johnson', 
//             emailid: 'adam@example.com'},
//             { firstname: 'Dana', lastname: 'Bay', 
//             emailid: 'dana@example.com'},
//           ]

//         for(let i=0; i<customers.length; i++){

//             const customer = new Customer({
//                 firstname: customers[i].firstname,
//                 lastname: customers[i].lastname,
//                 emailid: customers[i].emailid
//               });

//             // Save a Customer in the MongoDB
//             await customer.save();
//         }
//     }).catch(err => {
//         console.log('Could not connect to MongoDB.');
//         process.exit();
//     });

//require('./app/routes/customer.routes.js')(app);
//require('./app/routes/customersold.routes.js')(app);
require('./app/routes/policy.routes.js')(app);
require('./app/routes/customers.routes.js')(app);

// listen for requests
app.listen(5001, () => {
  console.log("Server is listening on port 5001");
});
// // Create a Server
// var server = app.listen(5001, function () { 
//   var host = server.address().address
//   var port = server.address().port
 
//   console.log("App listening at http://%s:%s", host, port) 
// })