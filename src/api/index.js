const express = require('express');
const morgan = require('morgan');

const sample = require('./sample');

const router = express.Router();

router.use(morgan('dev'));

router.use('/sample', sample);

module.exports = router;