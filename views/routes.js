const express = require('express');
const router = express.Router();
const { getRequest, storeQuestion, updateQuestion } = require('../controllers/controllers')

router.get('/question', getRequest);
router.post('/question', storeQuestion);
router.put('/question', updateQuestion)


module.exports = router;