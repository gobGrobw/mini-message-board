const Message = require('../models/messageModel');
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');

// Render all messages from database
exports.details = asyncHandler(async (req, res, next) => {
	const allMessages = await Message.find().sort({ date: -1 }).exec();

	res.render('index', {
		title: 'Mini Message Board',
		messages: allMessages,
	});
});

// Process GET request to post a message
exports.new_message_GET = (req, res, next) => {
	res.render('message_form', {
		title: 'Post a message',
	});
};

// Process POST message request
exports.new_message_POST = [
	body('username', 'Invalid Username').trim().isLength({ min: 1 }).escape(),
	body('message', 'Invalid Message').trim().isLength({ min: 1 }).escape(),

	asyncHandler(async (req, res, next) => {
		const errors = validationResult(req);

		const message = new Message({
			username: req.body.username,
			message: req.body.message,
			date: new Date(),
		});

		if (!errors.isEmpty()) {
			res.render('message_form', {
				title: 'Post a message',
				message: message,
				errors: errors.array(),
			});
		} else {
			await message.save();
			res.redirect('/message');
		}
	}),
];

