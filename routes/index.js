// const router = require('express').Router();
// const userRoutes = require('./userRoutes');
// const thoughtRoutes = require('./thoughtRoutes');


// router.use('/users', userRoutes);
// router.use('/thoughts', thoughtRoutes);

// router.use((req, res) => res.send('Wrong route!'));

// module.exports = router;

const router = require('express').Router();
// const userRoutes = require('./userRoutes');
// const thoughtRoutes = require('./thoughtRoutes');
const apiRoutes = require('./api')

router.use('/api', apiRoutes);
// router.use('/thoughts', thoughtRoutes);

// router.use((req, res) => res.send('Wrong route!'));

module.exports = router;