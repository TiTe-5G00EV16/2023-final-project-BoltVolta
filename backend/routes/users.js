const express = require('express');
const router = express.Router();

const { loginUser, signUpUser, getUsers, getUserById } = require('../controllers/users');
//const { resetPasswordRequestController, resetPasswordController } = require("../controllers/auth");

router.post('/signup', signUpUser);
router.post('/login', loginUser);
router.get('/', getUsers);
router.get('/:id', getUserById);
//router.post("/requestResetPassword", resetPasswordRequestController);
//router.post("/resetPassword", resetPasswordController);





module.exports = router;