const express = require('express');
const router = express.Router();

const { loginUser, signUpUser } = require('../controllers/users');
//const { resetPasswordRequestController, resetPasswordController } = require("../controllers/auth");

router.post('/signup', signUpUser);
router.post('/login', loginUser);
//router.post("/auth/requestResetPassword", resetPasswordRequestController);
//router.post("/auth/resetPassword", resetPasswordController);

module.exports = router;