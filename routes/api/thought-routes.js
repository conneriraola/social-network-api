const router = require("express").Router();

const {
    postNewThought,
    getAllthoughts,
    getThoughtById,
    updateThoughtById,
    deleteThoughtById,
    postNewReaction,
    deleteReactionById,
} =require("../../controllers/thought-controller");


router.route("/").post(postNewThought).get(getAllthoughts);

router.route("/:id").get(getThoughtById).put(updateThoughtById).delete(deleteThoughtById).post(postNewReaction);

router.route("/userId/:thoughtId").put(updateThoughtById);

router.route("/:thoughtId/reaction/:reactionId").put(deleteReactionById);

module.exports = router;