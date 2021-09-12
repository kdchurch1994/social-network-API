const { User } = require('../models'); //Imports the User model

const userController = {

    //controller that will be used to get all users
    getAllUsers(req, res) {
        User.find({})
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .select('-__v')
            .sort({_id: -1})
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    //Controller to get a user by Id (Uses a GET route defined in the user-routes.js file)
    getUsersById({ params }, res) {
        User.findOne({ _id: params.id })
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .select('-__v')
            .then(dbUserData => {
                if(!dbUserData) {
                    res.status(404).json({ message: 'No user matches this Id.' });
                    return;
                }
                res.json(dbUserData)
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            })
    },

    //Controller to add a user (Uses a POST route defined in the user-routes.js file)
    addUser({ body }, res) {
        console.log(body);
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.status(400).json(err));
    },

    //Controller to update a user (Uses a PUT route defined in the user-routes.js file)
    updateUsers({params, body}, res) {
        User.findOneAndUpdate({ _id: params.id}, body, { new: true })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user matches this Id.'});
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    },

    //Controller to delete a user (Uses a DELETE route defined in the user-routes.js file)
    deleteUsers({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user matches this Id. '});
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    },

    //Controller to add a friend to a user (Uses a POST route defined in the user-routes.js file)
    addAFriend({ params}, res) {
        User.findByIdAndUpdate(
            { _id: params.userId },
            { $addToSet: {friends: params.friendId }},
            { new: true }
        )
            .then((dbUserData) => res.json(dbUserData))
            .catch((err) => res.status(400).json(err))
      
        
    },

    //Controller to remove a friend from a user (Uses a DELETE route defined in the user-routes.js file)
    removeAFriend({ params}, res) {
        User.findByIdAndUpdate(
            { _id: params.userId},
            { $pull: { friends: params.friendId }},
            { new: true }
        )
        .then((dbUserData) => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user matches this Id.' });
                return;
            }
            res.json(dbUserData);
        })
        .catch((err) => res.status(400).json(err));
    }
};

module.exports = userController; //exports the user of the functions defined in the controller