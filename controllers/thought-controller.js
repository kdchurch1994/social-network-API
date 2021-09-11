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
    }
};

module.exports = thoughtController;