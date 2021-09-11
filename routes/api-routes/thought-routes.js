const router = require('express').Router();

const { getAllThoughts, getThoughtById, createAThought, updateAThought, deleteAThought, addAReaction, removeAReaction 
} = require('../../controllers/thought-controller');

router.route('/').get(getAllThoughts);

router.route('/:id').get(getThoughtById).put(updateAThought).delete(deleteAThought);

router.route('/:userId').post(createAThought);

router.route('/:thoughtId/reactions').post(addAReaction);

router.route('/:thoughtId/reations/:reactionId').delete(removeAReaction);

module.exports = router;