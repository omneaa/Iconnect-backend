const {
	register,
	login,
	forgotPassword,
	resetPassword,
	logout
	
} = require('../controllers/AuthController');

const validateResource = require('../middlewares/validateResource');
const { registerSchema, loginSchema, forgotPasswordSchema, resetPasswordSchema } = require('../schema/auth');


module.exports = (router, passport) => {
	router.post('/register', validateResource(registerSchema), register);
	router.post('/login', validateResource(loginSchema), login);
	router.post('/forgot-password', validateResource(forgotPasswordSchema), forgotPassword);
	router.post('/reset-password/:token', validateResource(resetPasswordSchema), resetPassword)
	router.post('/logout',passport.authenticate('jwt', { session: false }),logout);
	return router;
};

	
	
