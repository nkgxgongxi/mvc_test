//js
const express = require('express');
const {
    registerView, 
    registerUser,
    loginView,
    loginUser
} = require('../controllers/loginController');
const { dashboardView } = require("../controllers/dashboardController");
const { protectRoute } = require("../auth/protect");



const router = express.Router();

router.get('/register', registerView);
router.get('/login', loginView);
// Dashboard
router.get("/dashboard", protectRoute, dashboardView);

router.post('/login', loginUser);
router.post('/register', registerUser);

module.exports = router;