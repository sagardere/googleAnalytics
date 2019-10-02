//Require all routes
const express = require('express');
const router = express.Router();
const userController = require('./user')();

router.get('/', (req, res) => {
  res.render('index');
});

//user
router.post('/userRegistration', userController.registration);

//export router
module.exports = router;