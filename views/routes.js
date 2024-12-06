const express = require('express');
const router = express.Router();

const { getRequest } = require('../controllers/controllers')

router.get('/question', getRequest);


module.exports = router;