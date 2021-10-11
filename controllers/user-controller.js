
const {  User } = require('../models');

const userController = {
getAllUser(req, res){
    User.find({})
    .then((dbUserData) => res.json(dbUserData))
    .catch((err)=> {
        console.log(err);
        res.status(400).json(err);
    });
},
//get one user
getUserById({ params }, res){
    User.findOne({ _id: params.id })
    .then((dbUserData) => {
        if(!dbUserData) {
            res.status(404).json({ message: 'no user found with that id' });
            return;
        }
    })
    .catch((err)=> {
        console.log(err);
        res.status(400).json(err);
    });
},

// create user
createUser({body},res) {
    User.create(body)
    .then((dbUserData)=> res.json(dbUserData))
    .catch((err) => res.status(400).json(err));
},

updateUser({ params,body}, res) {
    User.findOneAndUpdate({ _id: params.id }, body, {new: true})
    .then(dbUserData => {
        if(!dbUserData) {
            res.status(404).json({ message: 'no user found with this id' })
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => res.status(400).json(err));
},

//delete user
deleteUser({ param }, res){
    User.findOneAndDelete({ _id: params.id })
    .then(dbUserData => {
        if(!dbUserData){
            res.status(404).json({ message: 'no user found with this id' })
            return;
        }
        res.json(dbUserData)
    })
    .catch(err => res.status(400).json(err));
}

};

module.exports = userController;