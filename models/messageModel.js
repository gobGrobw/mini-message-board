const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { DateTime } = require('luxon');

const MessageSchema = new Schema({
	username: {
		type: String,
		min: [1, 'Username is required'],
		max: [20, 'Username is too long'],
	},

	message: {
		type: String,
		min: [1, 'Message is required'],
		max: [100, 'Message is too long'],
	},

	date: {
		type: Date,
	},
});

MessageSchema.virtual('date_formatted').get(function() {
	return DateTime.fromJSDate(this.date).toLocaleString(DateTime.DATETIME_MED)
})

module.exports = mongoose.model('message', MessageSchema);

