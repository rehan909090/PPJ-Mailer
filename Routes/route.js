const router = require('express').Router();

const { signup, getbill } = require('../controller/appController.js')

router.post('/user/signup', signup );
router.post('/product/getBill', getbill );

module.exports = router;