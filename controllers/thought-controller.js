
const {  Thought, User } = require('../models');
const { populate } = require('../models/User');

const thoughtController = {
getAllThought(req, res){
    Thought.find({})
    .populate({
        path: 'reactions',
        select: '-__v'
    })

    .then((dbThoughtData) => res.json(dbThoughtData))
    .catch((err)=> {
        console.log(err);
        res.status(400).json(err);
    });
},
//get one Thought
getThoughtById({ params },  res){
    Thought.findOne({ _id: params.id })
    .then(dbThoughtData => res.json(dbThoughtData))
			.catch(err => {
			  console.log(err);
			  res.sendStatus(400);
			});
},

// create Thought POST /api/thought
createThought({body},res) {
    let info;
    Thought.create(body)
    .then((dbThoughtData) => {
        info = dbThoughtData;
       return User.findOneAndUpdate(
			// filter or where clause
			{ _id: body.userId },
			// add to set push into array
			{ $push: { thoughts: dbThoughtData._id } },
			{ new: true }
		)
        // res.json(dbThoughtData)
    })
    .then((data) => {

        res.json(data)
    })
    // an implicit return with curly braces lets us do more than one thing such as the console.log
    .catch((err) => {
        console.log(info);
        res.status(400).json(err)
    });
},

updateThought({ params,body}, res) {
    Thought.findOneAndUpdate({ _id: params.id }, body, {new: true})
    .then(dbThoughtData => {
        if(!dbThoughtData) {
            res.status(404).json({ message: 'no thought found with this id' })
            return;
        }
        res.json(dbThoughtData);
    })
    .catch(err => res.status(400).json(err));
},

//delete Thought
deleteThought({ params }, res){
    Thought.findOneAndDelete({ _id: params.id })
    .then(dbThoughtData => {
        if(!dbThoughtData){
            res.status(404).json({ message: 'no thought found with this id' })
            return;
        }
        res.json(dbThoughtData)
    })
    .catch(err => res.status(400).json(err));
},

// reactions -------------

	// create Reaction
    addReaction ({ params, body}, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: body } },
            { new: true, runValidators: true }
        )
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thought with this id!' });
                return;
            }
            res.json(dbThoughtData)
        })
        .catch(err => res.json(err));
    },

	

    //delete reaction
    deleteReaction({ params }, res){
    Thought.findOneAndUpdate(
        { _id: params.thoughtId },
        { $pull: { reactions: { reactionId: params.reactionId } } },
        {  new: true }     
    )
    .then(dbThoughtData => res.json(dbThoughtData))
    .catch(err => res.json(err));
},
  


};

module.exports = thoughtController;