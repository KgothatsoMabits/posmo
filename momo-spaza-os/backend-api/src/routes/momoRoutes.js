const express = require('express');
const router = express.Router();
const { initializeSandboxUser } = require('../controllers/momoController');

// Route to generate Sandbox credentials
router.post('/sandbox/init', initializeSandboxUser);

module.exports = router;