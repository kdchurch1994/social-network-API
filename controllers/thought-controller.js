
const { Thought, User } = require('../models'); //Imports the use of the Thought and User models

const thoughtController = { //provides all the controllers for the various thought-routes

    //Controller function to get all thoughts
    getAllThoughts(req, res) {
        Thought.find({})
            .populate({
                path: 'reactions',
                select: '-__v',
            })
            .select('-__v')
            .then((dbThoughtData) => res.json(dbThoughtData))
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    //Controller function to get a thought by Id
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
            .then((dbThoughtData) => {
                if(!dbThoughtData) {
                    res.status(404).json({ message: 'No thought matches this Id' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch((err) => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    //Controller function to create a thought using a POST Route defined in the routes directory
    createAThought({ body }, res) {
        Thought.create(body)
            .then(dbThoughtData  => {
                User.findOneAndUpdate(
                    { _id: body.userId },
                    { $push: { thoughts: dbThoughtData._id } },
                    { new: true }
                )
                .then(dbUserData => {
                    if (!dbUserData) {
                        res.status(404).json({ message: 'No user matches this Id.' });
                        return;
                    }
                    res.json(dbUserData);
                })
                .catch(err => res.json(err));
            })
            .catch(err => res.status(400).json(err));
    },

    //Controller function to update a thought using a PUT Route defined in the routes directory
    updateAThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id}, body, {new: true, runValidators: true})
            .populate({path: 'reactions', select: '-__v'})
            .select('-__v')
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thoughts match this Id.' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.json(err));
    },

    //Controller to delete a thought using a DELETE route defined in the routes directory
    deleteAThought({ params}, res) {
        Thought.findOneAndDelete({_id: params.id})
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought matches this Id.' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch((err) => res.status(400).json(err));
        
    },

    //Controller function to add a reaction to a thought based off the ThoughtId (Uses a POST route defined in the thought-routes.js file)
    addAReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $addToSet: { reactions: body} },
            { new: true }
        )
            .then((dbThoughtData) => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought matches this Id.' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch((err) => res.json(err));
    },

    //Controller function to remove a rection to a thought based off the ThoughtId and ReactionId (Uses a delete route defined in the thought-routes.js file)
    removeAReaction({ params}, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId }}},
            { new: true }
        )
        .then((dbThoughtData) => res.json(dbThoughtData))
        .catch((err) => res.json(err));
    }

};

module.exports = thoughtController; //exports the use of the controllers defined in the thought model