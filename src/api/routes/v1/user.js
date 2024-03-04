const router = require('express').Router();
const userController = require('../../controllers/auth.controller');
const bodyValidator = require('../../middlewares/body-validator.middleware');

router.route('/')
.post(bodyValidator('user'),userController.createUser)


module.exports = router