// step 1 - setup a server to accept incoming requests
// request express
const express = require('express');
// instantiate the server
const app = express();

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


// step 2 - tell the server to listen for requests
app.listen(3002, () => {
    console.log(`API server now on port 3002`);
}) 