const router = require('express').Router(); //Imports the express router functionality

const {
    getAllUsers, getUsersById, addUser, updateUsers, deleteUsers, addAFriend, removeAFriend
} = require('../../controllers/user-controller'); //Imports the use of the functions defined in the user-controller.js file

router.route('/').get(getAllUsers).post(addUser); //Provides a GET all users and POST route to add users at the /api/users path
//Uses the getAllUsers function and the addUser function defined in the user-controller.js file

router.route('/:id').get(getUsersById).put(updateUsers).delete(deleteUsers); //Provides a GET UserById route, a PUT updateUsers route, and a DELETE route to delete users
//Includes the getUserById, updateUsers, and deleteUsers functions defined in the user-controller.js file

router.route('/:userId/friends/:friendId').post(addAFriend).delete(removeAFriend); //Provides a POST and DELETE route at the /api/users/:userId/friends/:friendId path to add a friend and delete a friend
//Includes the addAFriend and removeAFriend functions defined in the user-controller.js file

module.exports = router; //Exports the use of these routes