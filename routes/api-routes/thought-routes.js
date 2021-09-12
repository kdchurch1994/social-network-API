const router = require('express').Router(); //Imports the use of the express router functionality

const { getAllThoughts, getThoughtById, createAThought, updateAThought, deleteAThought, addAReaction, removeAReaction 
} = require('../../controllers/thought-controller'); //Imports the functions defined in the thought-controller.js file that will be called by the various routes in this file

router.route('/').get(getAllThoughts).post(createAThought); //Provides a GET route at the "/" path to get all thoughts using the getAllThoughts function and creates a POST route at the "/" path using the createAThought function

router.route('/:id').get(getThoughtById).put(updateAThought).delete(deleteAThought); //Provides the routes at the /api/thoughts/:id path, which uses the ThoughtId. 
//The defined routes include a GET route using the getThoughtById function to get thoughts based off id, a PUT route that uses the updateAThought function to update a thought, and a DELETE route that uses the deleteAThought function to delete a thought

router.route('/:thoughtId/reactions').post(addAReaction); //Provides the routes at the /api/thoughts/:thoughtId/reactions path that includes a POST route that uses the addAReaction function to add a reaction to a thought based off the Thought Id. 

router.route('/:thoughtId/reactions/:reactionId').delete(removeAReaction); //Provides the DELETE route at the /api/thoughts/:thoughtId/:reactionId path to delete a reaction from a thought 

module.exports = router; //Exports the use of these routes