const router = require('express').Router();

const {
    getAllReaction,
    getReactionById,
    createReaction,
    updateReaction,
    deleteReaction
} = require('../../controllers/reaction-controller');

router
.route('/')
.get(getAllReaction)
.post(createReaction);

router
.route('/:id')
.get(getReactionById)
.put(updateReaction)
.delete(deleteReaction);



module.exports = router;