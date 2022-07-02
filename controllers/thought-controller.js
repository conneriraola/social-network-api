const { Thought, User } = require("../models");

const thoughtController = {

    postNewThought({ params, body }, res) {
        console.log(body);
        Thought.create(body)
        .then(({ _id }) => {
            return User.findOneAndUpdate(
                { username: body.username },
                { $push: { thoughts: _id } },
                { new: true }
            );
        })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(dbPizzaData);
        })
        .catch(err => res.json(err));
    },

    postNewReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.id },
            { $push: { reactions: body } },
            { new: true, runValidators: true }
        )
        .then((dbUserData) => {
            if (!dbUserData) {
                res
                .status(404)
                .json({ message: "The specified Thought ID does not exist"});
                return;
            }
            res.json(dbUserData);
        })
        .catch((err) => res.json(err));
    },

    getAllthoughts(req, res) {
        Thought.find({})
        .populate({
            path: "reactions",
            select: "-__v",
        })
        .select("-__v")
        .sort({ _id: -1 })
        .then((dbPizzaData) => res.json(dbPizzaData))
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
          .populate({
            path: "reactions",
            select: "-__v",
          })
          .select("-__v")
          .sort({ _id: -1 })
          .then((dbThoughtData) => res.json(dbThoughtData))
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    updateThoughtById({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
        .then((dbThoughtData) => res.json(dbThoughtData))
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    deleteThoughtById({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
        .then((dbThoughtData) => res.json(dbThoughtData))
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    deleteReactionById({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: {reactions: { _id: params.reactionId } } },
            { new: true }
        )
        .then((dbThoughtdata) => res.json(dbThoughtData))
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },
};

module.exports = thoughtController;