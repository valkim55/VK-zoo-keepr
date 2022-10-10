// animals APIs were moved here from server.js

const router = require('express').Router();
const {filterByQuery, findById, createNewAnimal, validateAnimal} = require('../../lib/animals');
const {animals} = require('../../data/animals.json');

// step 4 - add the route
// step 5 - replace send('Hello Poogeon') method in response with json(animals)
// step 6 - add query parameters to 'req' to retrieve specific data from the whole animals.json
// step 8 - call the filterByQuery() function
router.get('/animals', (req, res) => {
    let results = animals;
    if(req.query) {
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});

//step 11 - add another route based on request object's parameter, which is animals' ID. Since ID is unique there won't be any query and the result will be just one animal
// step 12 - add 404 error handling, in case there's no animal with requested id - response will show a 404 error, URL will be http://localhost:3002/api/animals/3
router.get('/animals/:id', (req, res) => {
    const result = findById(req.params.id, animals);
        if(result) {
            res.json(result);
        } else {
            res.send(404);
        }
});

// step 13 - add a post() method to enable users to store data in a server
router.post('/animals', (req, res) => {
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


module.exports = router;