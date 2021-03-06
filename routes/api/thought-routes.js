const router = require('express').Router();

const {
	getAllThought,
	getThoughtById,
	createThought,
	updateThought,
	deleteThought,
	addReaction,
	deleteReaction,
} = require('../../controllers/thought-controller');

// const {
// 	addReaction,
// 	deleteReaction,
// } = require('../../controllers/reaction-controller');

router.route('/').get(getAllThought).post(createThought);

router
	.route('/:id')
	.get(getThoughtById)
	.put(updateThought)
	.delete(deleteThought);

// reaction routes
router
	.route('/:thoughtId/reaction')
	.post(addReaction);


router
	.route('/:thoughtId/:reactionId')
	.delete(deleteReaction);

module.exports = router;
