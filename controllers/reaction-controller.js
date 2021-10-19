
const {  Reaction } = require('../models');

const reactionController = {
getAllReaction(req, res){
    Reaction.find({})
    .then((dbReactionData) => res.json(dbReactionData))
    .catch((err)=> {
        console.log(err);
        res.status(400).json(err);
    });
},
//get one Reaction
getReactionById({ params }, res){
    Reaction.findOne({ _id: params.id })
    .then((dbReactionData) => {
        if(!dbReactionData) {
            res.status(404).json({ message: 'no Reaction found with that id' });
            return;
        }
    })
    .catch((err)=> {
        console.log(err);
        res.status(400).json(err);
    });
},

// create Reaction
createReaction({body},res) {
    Reaction.create(body)
    .then((dbReactionData)=> res.json(dbReactionData))
    .catch((err) => res.status(400).json(err));
},

updateReaction({ params,body}, res) {
    Reaction.findOneAndUpdate({ _id: params.id }, body, {new: true})
    .then(dbReactionData => {
        if(!dbReactionData) {
            res.status(404).json({ message: 'no Reaction found with this id' })
            return;
        }
        res.json(dbReactionData);
    })
    .catch(err => res.status(400).json(err));
},

//delete Reaction
deleteReaction({ params }, res){
    Reaction.findOneAndDelete({ _id: params.id })
    .then(dbReactionData => {
        if(!dbReactionData){
            res.status(404).json({ message: 'no Reaction found with this id' })
            return;
        }
        res.json(dbReactionData)
    })
    .catch(err => res.status(400).json(err));
}

};

module.exports = reactionController;