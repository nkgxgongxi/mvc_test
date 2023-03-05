//js
const express = require('express');
const {
    registerView, 
    registerUser,
    loginView
} = require('../controllers/loginController');

const router = express.Router();

router.get('/register', registerView);
router.get('/login', loginView);

router.post('/register', registerUser);
module.exports = router;