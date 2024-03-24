const ApiResponse = require('../utils/apiResponse');
const User = require('../models/User');
const { issueToken } = require('../utils/helpers');
const sendEmail = require('../utils/sendEmail');
const bcrypt = require('bcryptjs');
const { JsonWebTokenError } = require('jsonwebtoken');
//const jwtDecode = require("jwt-decode");
const { jwtDecode } = require('jwt-decode');

const register = async (req, res) => {
	const { firstname, lastname, username, email, password, gender, phone } = req.body;

	const hashedPassword = await bcrypt.hash(password, 10);
	User.register(
		new User({
			firstname,
			lastname,
			username,
			email,
			password: hashedPassword,
			gender,
			phone,
		}),
		password,
		function (err, user) {
			if (err) {
				res.send(err);
			} else {
				const responseData = {
					firstname: user.firstname,
					lastname: user.lastname,
					username: user.username,
					email: user.email,
					gender: user.gender,
					phone: user.phone,
					id:user.id,
					profilePicture:"https://res.cloudinary.com/dlcrve4vm/image/upload/v1709451005/CloudinaryDemo/mpspjraezkrvyfby8uvq.webp",
					coverPicture:"https://res.cloudinary.com/dlcrve4vm/image/upload/v1709758933/CloudinaryDemo/w0xmbgz3nj4tu8fyuwam.jpg",
					token: issueToken(user),
				};

				return ApiResponse.success(res,responseData,201,'You are registered successfully'
				);
			}
		}
	);
};

const login = async (req, res) => {
	try {
		const user = await User.findOne({ email: req.body.email });

		if (!user) {
			return ApiResponse.error(res, 404, 'User Not Found');
		}
		// Check if the entered password matches the stored password
		const isPasswordValid = await bcrypt.compare(
			req.body.password,
			user.password
		);
		if (!isPasswordValid) {
			return ApiResponse.error(res, 401, 'Invalid Password');
		}
		const userData = {
			firstname: user.firstname,
			lastname: user.lastname,
			username: user.username,
			email: user.email,
			gender: user.gender,
			phone: user.phone,
			profilePicture:user.profilePicture,
			coverPicture:user.coverPicture,
			id:user.id,
		};

		return ApiResponse.success(
			res,
			{
				...userData,
				token: issueToken(user),
			},
			200,
			'Login successful'
		);
	} catch (err) {
		return ApiResponse.error(res, 500, 'Internal Server Error');
	}
};

const forgotPassword = async (req, res) => {
	const user = await User.findOne({ email: req.body.email });

	if (!user) {
		return ApiResponse.error(res, 404, 'User Not Found');
	}

	const token = issueToken(user);
	user.resetToken = token;
	user.resetTokenExpiration = Date.now() + 3600000; // 1 hour
	await user.save();

	const resetLink = `http://127.0.0.1:3000/auth/reset-password/${token}`;

	const subject = 'Password Reset';
	const message = `Click the following link to reset your password: ${resetLink}`;
	const send_to = user.email;
	const sent_from = process.env.EMAIL_USER;
	await sendEmail(subject, message, send_to, sent_from);
	return ApiResponse.success(res, {token}, 200, `Reset link has been sent to ${send_to}, check it!`);
};

const resetPassword = async (req, res) => {
	const user = await User.findOne({ email: req.body.email });

	if (!user) {
		return ApiResponse.error(res, 404, 'User Not Found');
	}
	const { token } = req.params;
	const { newPassword } = req.body;

	const validToken = await User.findOne({
		resetToken: token,
		resetTokenExpiration: { $gt: Date.now() },
	});

	if (!validToken) {
		return ApiResponse.error(res, 404, 'Invalid or expired token');
	}
    
	user.password = await bcrypt.hash(newPassword, 10);
	user.resetToken = undefined;
	user.resetTokenExpiration = undefined;
	await user.save();

	return ApiResponse.success(res, [], 200, 'Password reset successful');
}
const logout = async (req, res) => {
	//client will delete the jwt
	return ApiResponse.success(res, [], 200,'loged out successful');
	
	
}
module.exports = { register, login, forgotPassword, resetPassword, logout };
