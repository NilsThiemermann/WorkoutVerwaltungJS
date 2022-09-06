const express = require('express');
const router = express.Router();
const userController = require('../../controllers/userController');
const isAuth = require('../../middleware/is_auth');

router.post('/register', userController.createUser);

router.post('/login', userController.login);

router.post('/logout', isAuth, userController.logout);

module.exports = router;