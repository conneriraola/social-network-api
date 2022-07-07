const { User, Thought } = require('../models');

const userController = {
    createUser(req, res) {
        User.create(req.body)
        .then((dbUserData) => res.json(dbUserData))
        .catch((err) => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId } },
            { new: true }
        )
        .populate({
            path: "thoughts",
            select: "-__v",
        })
        .select("-__v")
        .then((dbUserData) => {
            if (!dbUserData) {
                return res.status(404).json({ message: 'No user found with specidied id' });
            }
            res.json(dbUserData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },
    getUsers(req, res) {
        User.find()
        // .populate({
        //     path: "thoughts",
        //     select: "-__v",
        // })
        .select("-__v")
        .then((dbUserData) => res.json(dbUserData))
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },
    getSingleUser(req, res) {
        console.log(req.params.userId)
        User.findOne({ _id: req.params.userId })
        .select("-__v")
        .populate('friends')
        .populate('thoughts')
        .then((dbUserData) => {
            if (!dbUserData) {
                return res.status(404).json({ message: 'No user found with specified id' });
            }
            res.json(dbUserData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },
    updateUser(req, res) {
        console.log(req)
        User.findOneAndUpdate(
            { _id: req.params.userId },
            {
                $set: req.body,
            },
            {
            new: true,
            runValidators: true,
        })
        .then((dbUserData) => {
            if (!dbUserData) {
                return res.status(404).json({ message: 'No user found with specified id' });
            }
            res.json(dbUserData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
        .then((dbUserData) => {
            if (!dbUserData) {
                return res.status(404).json({ message: 'No user found with specified id' });
            }
        })
        .then(() => {
            res.json({ message: 'User has been deleted'})
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    removeFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.UserId },
            { $pull: { friends: params.friendId } },
            { new: true }
        )
        .then((dbUserData) => {
            if (!dbUserData) {
            return res.status(404).json({ message: 'No user with this id' });
        }
        res.json(dbUserData);
        })
      
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },
};

module.exports = userController;