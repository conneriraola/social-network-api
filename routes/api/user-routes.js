const router = require("express").Router();

const {
    getAllUsers,
    postNewUser,
    getUserById,
    updateUserById,
    deleteUserById,
    postNewFriend,
    deleteFriendById,
} = require("../../controllers/user-controller");

router.route("/").get(getAllUsers).post(postNewUser);

router
.route("/:id")
.get(getUserById)
.put(updateUserById)
.delete(deleteUserById);

router
.route("/:user Id/friends/:friendId")
.post(postNewFriend)
.delete(deleteFriendById);

module.exports = router;