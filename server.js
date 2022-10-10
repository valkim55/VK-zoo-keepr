
// step 34 - add add the path to apiRoutes.js and htmlRoutes.js
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

// step 1 - setup a server to accept incoming requests
// request express
const express = require('express');
// instantiate the server
const app = express();

// step 19 - in order to actually add a new animal object to the json file we will need to access file system
const fs = require('fs');
const path = require('path');


// step 9 - after creating heroku server which is here https://dry-reef-02487.herokuapp.com/
// heroku uses port 80 which is known as an environment, if for some reason that port is not available - use hardcoded 3002
const PORT = process.env.PORT || 3001;




//step 14 - parse incoming string or array data that was POSTed to the server
app.use(express.urlencoded({ extended: true }));
// parse incoming json data
app.use(express.json());

//step 35 - 
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

// step 24 - add another middleware to instruct the server to make files in 'public' folder readily available whenever the api is called
app.use(express.static('public')); 

// step 3 - create a route that the front-end can request data from
const {animals} = require('./data/animals.json')




//step 28 - was to add a fetch api for POST method in script.js
// step 29 - create lib/ directory and add another animals.js file there
// step 30 - move filterByQuery(), findByID(), createNewAnimal(), validateAnimal() functions into newly created animals.js in lib/ directory
// step 31 - create routes/ directory, then apiRoutes/ inside and move animal API routes there, stripping /api from the path because those files are not in the server dir anymore
// step 32 - in animalRoutes.js replace app. with router. since app object was defined in the server.js and cannot be accessed outside of server.js
// step 33 - create htmlRoutes/ in routes/ directory and move all html APIs there, again replacing app. with router.


// step 2 - tell the server to listen for requests
/*
app.listen(3002, () => {
    console.log(`API server now on port 3001`);
}) 
*/
// step 10 - update the port that heroku hosts at and set hardcoded 3001 as a backup
app.listen(PORT, () => {
    console.log(`API server is now on port ${PORT}`);
})



