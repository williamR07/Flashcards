const express = require('express');
const router = express.Router();

const { getRequest, storeQuestion } = require('../controllers/controllers')

router.get('/question', getRequest);
router.post('/question', storeQuestion);


module.exports = router;