const express = require('express'); // Express app
const router = express.Router(); // Router logic
const { expressjwt: jwt } = require('express-jwt');
const auth = jwt({
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256'],
    requestProperty: 'payload'
});
// This is where we import the controllers we will route
const tripsController = require('../controllers/trips');
const authController = require('../controllers/authentication');

router
    .route('/login')
    .post(authController.login);

router
    .route('/register')
    .post(authController.register);

// define route for our trips endpoint
router
    .route('/trips')
    .get(tripsController.tripsList)// GET method routes tripList
    .post(auth, tripsController.tripsAddTrip); // POST Method Adds a Trip


// GET method routes tripsFindByCode - requires parameter
// PUT Method routes tripsUpdateTrip - requires parameter
router
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindByCode)
    .put(auth, tripsController.tripsUpdateTrip);

//express().use('/api',auth);

module.exports = router;