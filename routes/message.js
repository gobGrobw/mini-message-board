const express = require('express');
const router = express.Router();

const message_controller = require('../controllers/messageController');

// Get all message from database
router.get('/', message_controller.details);

// GET request for posting message
router.get('/new', message_controller.new_message_GET);

// Process POST request
router.post('/new', message_controller.new_message_POST);

module.exports = router;

