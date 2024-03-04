const router = require('express').Router();

router.get('/', (req,res) => {
    res.status(200).send('Version 1')
})


router.use('/user', require('./user'))
router.use('/auth', require('./auth'))
router.use('/role', require('./role'))
router.use('/trip', require('./trip'))

module.exports = router