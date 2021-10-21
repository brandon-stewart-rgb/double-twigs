const {  Thought } = require('../models');

const reactionController = {
	
	// create Reaction
	addReaction({ body }, res) {
        let info;
		Thought.create(body)
        .then((dbReactionData) => {
            info = dbReactionData;
            return Thought.findOneAndUpdate(
                {_id: body.thoughtId },
                {$push: { reactions: dbReactionData._id }},
                {new: true}
            )
        })
        .then((data)=> {
            res.json(data)
        })
        .catch((err)=> {
            console.log(info);
            res.status(400).json(err)
        })
		
	}, 

	//delete Reaction
	deleteReaction({ params }, res) {
		Thought.findOneAndDelete({ _id: params.id })
			.then((dbReactionData) => {
				if (!dbReactionData) {
					res.status(404).json({ message: 'no Reaction found with this id' });
					return;
				}
				res.json(dbReactionData);
			})
			.catch((err) => res.status(400).json(err));
	},
};

module.exports = reactionController;
