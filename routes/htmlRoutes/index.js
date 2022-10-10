const path = require('path');
const router = require('express').Router();
const animalRoutes = require('../apiRoutes/animalRoutes');
// moved here from server.js

router.use(animalRoutes);

// add a new route step 23 - make index.html served from Express server
// endpoint "/" brings you to the root route of the server, used to create a homepage for a server
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'));
})

// step 24 was to add the fetch request to script.js that communicates with app.post method

// step 25 - add routes  for other .html pages, the endpoint is /animals
router.get('/animals', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/animals.html'));
})

// step 26 - add the route for the zookeepers.html page
router.get('/zookeepers', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/zookeepers.html'));
})

// step 27 - add a 'wildcard' - any route that wasn't defined will fall under this request and will the homepage as response (/about, /contact, /membership will redirect to homepage)
router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'));
});



module.exports = router;
