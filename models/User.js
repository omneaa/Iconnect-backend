const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new mongoose.Schema({
	firstname: {
		type: String,
		required: true,
	},
	lastname: {
		type: String,
		required: true,
	},
	username: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		unique: true,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	gender: {
		type: String,
		required: true,
	},
	phone: {
		type: String,
		required: true,
	},
	friendsNumber:{
		type: Number,
		default: 0	
	},
	profilePicture: {
		
		 type: String,
	 default:'null'
		
	},
	coverPicture: {
		type: String,
		default:'null'
			

	},
	resetToken: String,
	resetTokenExpiration: Date,
});
UserSchema.plugin(passportLocalMongoose);
const User = mongoose.model('User', UserSchema);
module.exports = User;
