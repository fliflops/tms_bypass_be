const router = require('express').Router();

router.get('/', (req,res) => {
    res.status(200).send('Version ')
})


module.exports = router