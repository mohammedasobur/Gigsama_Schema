// routes/aiRoutes.js
const express = require('express');
const aiController = require('../controllers/aiController');

const router = express.Router();

router.post('/', aiController.generateSchema);

module.exports = router;