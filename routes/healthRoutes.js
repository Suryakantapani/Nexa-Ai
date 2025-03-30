const express = require('express');
const router = express.Router();
const healthController = require('../controllers/healthController');

router.post('/addHealthRecord', healthController.addHealthRecord);
router.get('/getHealthRecords/:userId', healthController.getHealthRecords);

module.exports = router;