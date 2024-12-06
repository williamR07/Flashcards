const express = require('express');
const router = express.Router();

const { getRequest } = require('../controlers/controlers')

router.get('/question', getRequest);


module.exports = router;