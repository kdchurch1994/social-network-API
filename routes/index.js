const router = require('express').Router(); //Imports the use of the express router functionality
const apiRoutes = require('./api-routes'); //Imports the routes defined in api-routes and stores them as a const apiRoutes

router.use('/api', apiRoutes); //Allows use to use the Routes defined in the api-routes directory

router.use((req, res) => {
    res.status(404).send('<h1>404 Error</h1>'); //Provides an error message if the wrong route is used
});

module.exports = router; //Exports the use of the routes defined in the routes directory