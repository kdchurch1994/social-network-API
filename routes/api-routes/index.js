const router = require('express').Router(); //Imports the use of the express router functionatlity

const userRoutes = require('./user-routes'); //Imports the use of the routes defined in the user-routes file and stores it as a const userRoutes
const thoughtRoutes = require('./thought-routes'); //Imports the use of the routes defined in the thought-routes file and stores it as a const thoughtRoutes

router.use('/users', userRoutes); //Allows us to use the routes defined in the user-routes file
router.use('/thoughts', thoughtRoutes); //Allows us to use the routes defined in the thought-routes file

module.exports = router; //Exports the use of the routes defined in the api-routes directory