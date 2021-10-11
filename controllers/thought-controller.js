
const {  Thought } = require('../models');

const thoughtController = {
getAllThought(req, res){
    Thought.find({})
    .then((dbThoughtData) => res.json(dbThoughtData))
    .catch((err)=> {
        console.log(err);
        res.status(400).json(err);
    });
},
//get one Thought
getThoughtById({ params }, res){
    Thought.findOne({ _id: params.id })
    .then((dbThoughtData) => {
        if(!dbThoughtData) {
            res.status(404).json({ message: 'no Thought found with that id' });
            return;
        }
    })
    .catch((err)=> {
        console.log(err);
        res.status(400).json(err);
    });
},

// create Thought
createThought({body},res) {
    Thought.create(body)
    .then((dbThoughtData)=> res.json(dbThoughtData))
    .catch((err) => res.status(400).json(err));
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
deleteThought({ param }, res){
    Thought.findOneAndDelete({ _id: params.id })
    .then(dbThoughtData => {
        if(!dbThoughtData){
            res.status(404).json({ message: 'no thought found with this id' })
            return;
        }
        res.json(dbThoughtData)
    })
    .catch(err => res.status(400).json(err));
}

};

module.exports = thoughtController;