const { User, Thought } = require('../models');

const userController = {
	getAllUser(req, res) {
		User.find({})
			.then((dbUserData) => res.json(dbUserData))
			.catch((err) => {
				console.log(err);
				res.status(400).json(err);
			});
	},
	//get single user |  GET /api/user/:id
	getUserById({ params }, res) {
		User.findOne({
			 _id: params.id
			})
			// populate or show all thought and friend data
			.populate({
				path: 'thoughts',
				path: 'friends',
				select: '-__v'
			})
			.select('-__v')
			.then(dbUserData => res.json(dbUserData))
			.catch(err => {
			  console.log(err);
			  res.sendStatus(400);
			});
	},

	// create user |  POST /api/user
	createUser({ body }, res) {
		User.create(body)
			.then((dbUserData) => res.json(dbUserData))
			.catch((err) => res.status(400).json(err));
	},
	// update user |  PUT /api/users
	updateUser({ params, body }, res) {
		User.findOneAndUpdate({ _id: params.id }, body, { new: true })
			.then((dbUserData) => {
				if (!dbUserData) {
					res.status(404).json({ message: 'no user found with this id' });
					return;
				}
				res.json(dbUserData);
			})
			.catch((err) => res.status(400).json(err));
	},

	//delete user |  DELETE /api/user/:id
	deleteUser({ params }, res) {
		User.findOneAndDelete({ _id: params.id })
			.then((dbUserData) => {
				if (!dbUserData) {
					res.status(404).json({ message: 'no user found with this id' });
					return;
				}
				res.json(dbUserData);
			})
			.catch((err) => res.status(400).json(err));
	},
	//add a new friend |  POST /api/user/:userId/friends/:friendId
	addFriend({ params }, res) {
		// The $addToSet operator adds a value to an array unless the value is already present,
		// in which case $addToSet does nothing to that array.
		User.findOneAndUpdate(
			// filter or where clause
			{ _id: params.userId },
			// add to set push into array
			{ $addToSet: { friends: params.friendId } },
			{ new: true }
		)
			.then((dbUserData) => {
				if (!dbUserData) {
					res
						.status(404)
						.json({ message: 'no user found with this id, friend' });
					return;
				}
				res.json(dbUserData);
			})
			.catch((err) => res.status(400).json(err));
	},
	//delete friend | DELETE api/user/:userId/friends/:friendId
	deleteFriend({ params }, res) {
		// The $pull operator removes from an existing array all instances of a value or values that match a specified condition.
		// remove friendId
		User.findOneAndUpdate(
			{ _id: params.userId },
			{ $pull: { friends: params.friendId } },
			{ new: true, runValidators: true }
		)
			.then((dbUserData) => {
				if (!dbUserData) {
					res.status(404).json({ message: 'no user found with this id' });
					return;
				}
				// remove userId
				User.findOneAndUpdate(
					{ _id: params.friendId },
					{ $pull: { friends: params.userId } },
					{ new: true, runValidators: true }
				)
					.then((dbUserData) => {
						if (!dbUserData) {
							res.status(404).json({ message: 'No user found with this friendId' });
							return;
						}

						res.json({ message: 'Success, you have deleted your friend' });
					})

					.catch((err) => res.status(400).json(err));
			})
			.catch((err) => res.status(400).json(err));
	},
};

module.exports = userController;
