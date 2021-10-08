const router = require('express').Router();

const {
    getAllUsers,
    getUserById,
    createUser
} = require('../../controllers/user-controller');

router
.route('/api/users')
.get(getAllUsers)
.get(getUserById)
.post(createUser)