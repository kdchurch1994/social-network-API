const router = require('express').Router();

const {
    getAllUsers, getUsersById, addUser, updateUsers, deleteUsers, addAFriend, removeAFriend
} = require('../../controllers/user-controller');

router.route('/').get(getAllUsers).post(addUser);

router.route(':/id').get(getUsersById).put(updateUsers).delete(deleteUsers);

router.route(':/id/friends/:friendId').post(addAFriend).delete(removeAFriend);

module.exports = router;