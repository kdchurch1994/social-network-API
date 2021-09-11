const { builtinModules } = require('module');
const { Thought, User } = require('../models');

const thoughtController = {
    getAllThoughts(req, res) {
        Thought.find({})
            .populate({
                path: 'reactions',
                select: '-__v',
            })
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .select('-__v')
            .then((dbThoughtData) = res.json(dbThoughData))
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
            .then((dbThoughtData) => {
                if(!dbThoughtData) {
                    res.status(404).json({ message: 'No thought matches this Id' });
                    return;
                }
                res.json(dbThoughData);
            })
            .catach((err) => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    createAThought({ body}, res) {
        Thought.create(body)
            .then(({ userThoughtData }) => {
                return User.findOneAndUpdate(
                    { _id: body.userId },
                    { $push: { thoughts: userThoughtData._id}},
                    { new: true }
                );
            })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user matches this Id.' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },
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
    addAReaction({ params, body }, res) {
        Thought.findOneandUpdate(
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

module.exports = thoughtController;