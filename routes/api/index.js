const router = require('express').Router();
// import all of the API routers from /api/index.js (no need for index.js though since it's implied)

const userRoutes = require('./user-routes');
const thoughtRoutes = require('./thought-routes');

// add prefix of `/user` to routers created in `user-routes.js`

router.use('/user', userRoutes);
router.use('/thought', thoughtRoutes);

module.exports = router;