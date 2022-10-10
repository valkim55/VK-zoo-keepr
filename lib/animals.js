// filterByQuery(), findByID(), createNewAnimal(), validateAnimal() functions moved here from server.js

const fs = require('fs');
const path = require('path');

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
            path.join(__dirname, '../data/animals.json'),
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


module.exports = {
    filterByQuery,
    findById,
    createNewAnimal, 
    validateAnimal
};