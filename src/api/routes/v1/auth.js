const router = require('express').Router();
const authController = require('../../controllers/auth.controller');
const bodyValidator = require('../../middlewares/body-validator.middleware');

router.post('/login',bodyValidator('user'),authController.logIn);
router.post('/logout',authController.logOut)

module.exports = router;