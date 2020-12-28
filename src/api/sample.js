const express = require('express');
const SampleController = require('../controllers/SampleController');
const router = express.Router();


router.get('/', SampleController.sampleMethod);

module.exports = router;