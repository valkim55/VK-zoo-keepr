// step 1 - setup a server to accept incoming requests
// request express
const express = require('express');
// instantiate the server

// step 19 - in order to actually add a new animal object to the json file we will need to access file system
const fs = require('fs');
const path = require('path');


// step 9 - after creating heroku server which is here https://dry-reef-02487.herokuapp.com/
// heroku uses port 80 which is known as an environment, if for some reason that port is not available - use hardcoded 3002
const PORT = process.env.PORT || 3001;

const app = express();

//step 14 - parse incoming string or array data that was POSTed to the server
app.use(express.urlencoded({ extended: true }));
// parse incoming json data
app.use(express.json());

// step 24 - add another middleware to instruct the server to make files in 'public' folder readily available whenever the api is called
app.use(express.static('public')); 

// step 3 - create a route that the front-end can request data from
const {animals} = require('./data/animals.json')



// step 7 - create a function filterByQuery() that takes req.query as an argument and filters through the animals.json returning the new filtered array
// step 8 - in case querying property isn't just a string like: diet, species or name, but an array of elements like personalityTraits and we want to get specific trait
function filterByQuery(query, animalsArray) {
    // declare an array for personalityTraits for step 8
    let personalityTraitsArray = [];

    let filteredResults = animalsArray;
    if(query.personalityTraits) {
        // here, for step 8, check whether the user requested query is a string or an array (user requested just one trait or multiple)
        if(typeof query.personalityTraits === 'string') {
            // if user asked for ONE trait = requested query is a string - place it into an array
            personalityTraitsArray = [query.personalityTraits];
        } else {
            // if user asked for MULTIPLE traits = requested query is an array - the property is already an array
            personalityTraitsArray = query.personalityTraits;
        }

        /* loop through each element in personalityTraitsArray to check the trait against each animal in animalsArray,
        so at the end we have an array of animals that heave every one of the traits when the loop is finished*/
        personalityTraitsArray.forEach(trait => {
            filteredResults = filteredResults.filter(animal => animal.personalityTraits.indexOf(trait) !== -1);
        });
    };

    if(query.diet) {
        filteredResults = filteredResults.filter(animal => animal.diet === query.diet);
    }
    if(query.species) {
        filteredResults = filteredResults.filter(animal => animal.species === query.species);
    }
    if(query.name) {
        filteredResults = filteredResults.filter(animal => animal.name === query.name);
    }
    return filteredResults;
}

// step 12 - create function findById() that will take req.param (which is ID) and animals array and return a single animal based on its ID
function findById(id, animalsArray) {
    const result = animalsArray.filter(animal => animal.id === id)[0];
    return result;
}

// step 15 - handle taking the data from req.body and adding it to animals array
function createNewAnimal(body, animalsArray) {
    //console.log(body);
    // return finished code to post route for response
    //return body;

    // step 18 - after new animal object (body) was POSTed on the server and assigned with an id and wrapped into a variable - animal, push that new object to animals array
    const animal = body;
    animalsArray.push(animal);

    // step 20 - use 'fs' and 'path' modules to write the new object into json file
    fs.writeFileSync(
            path.join(__dirname, './data/animals.json'),
            JSON.stringify({animals: animalsArray}, null, 2) // updating existing json file, null means dont edit existing data, 2 means create white space between the values to make it readable
    );
    return animal;
}


// step 21 - validate the data that is being POSTed to the server, make sure: 1 - data exists, 2 - its the correct data type
function validateAnimal(animal) {
    if(!animal.name || typeof animal.name !== 'string') {
        return false;
    }
    if(!animal.species || typeof animal.species !== 'string') {
        return false;
    }
    if(!animal.diet || typeof animal.diet !== 'string') {
        return false; 
    }
    if(!animal.personalityTraits || !Array.isArray(animal.personalityTraits)) {
        return false;
    }
    return true;
}



// step 4 - add the route
// step 5 - replace send('Hello Poogeon') method in response with json(animals)
// step 6 - add query parameters to 'req' to retrieve specific data from the whole animals.json
// step 8 - call the filterByQuery() function
app.get('/api/animals', (req, res) => {
    let results = animals;
    if(req.query) {
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});

//step 11 - add another route based on request object's parameter, which is animals' ID. Since ID is unique there won't be any query and the result will be just one animal
// step 12 - add 404 error handling, in case there's no animal with requested id - response will show a 404 error, URL will be http://localhost:3002/api/animals/3
app.get('/api/animals/:id', (req, res) => {
    const result = findById(req.params.id, animals);
        if(result) {
            res.json(result);
        } else {
            res.send(404);
        }
});

// step 13 - add a post() method to enable users to store data in a server
app.post('/api/animals', (req, res) => {
    // req.body is where our incoming content will be
    //console.log(req.body);
    //res.json(req.body);

    // step 16 - set id based on what the next index of the array will be
    req.body.id = animals.length.toString();
    
    /* step 22 - before creating new data and adding it to a server, pass this data through validateAnimal function, where animal parameter is the content of req.body, 
    and the properties of 'animal' will run through a validation check*/
    // if any data in req.body is incorrect - send 404 back
    if(!validateAnimal(req.body)) {
        res.status(404).send('the animal is not properly formatted');
    } else {
        // step 17 - after a new animal has been added to the server and assigned an id in step 16 we can call the function that will update json file in ths directory by adding a new animal object
        const animal = createNewAnimal(req.body, animals);
        res.json(animal);
    }
});


// add a new route step 23 - make index.html served from Express server
// endpoint "/" brings you to the root route of the server, used to create a homepage for a server
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
})

// step 24 was to add the fetch request to script.js that communicates with app.post method

// step 25 - add routes  for other .html pages, the endpoint is /animals
app.get('/animals', (req, res) => {
    res.sendFile(path.join(__dirname, './public/animals.html'));
})

// step 26 - add the route for the zookeepers.html page
app.get('/zookeepers', (req, res) => {
    res.sendFile(path.join(__dirname, './public/zookeepers.html'));
})

// step 27 - add a 'wildcard' - any route that wasn't defined will fall under this request and will the homepage as response (/about, /contact, /membership will redirect to homepage)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
})


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



