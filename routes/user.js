const{GetUser,EditUser,SearchAccount,DeleteUser}=require('../controllers/UserController');
const validateResource = require('../middlewares/validateResource');
require('dotenv').config();
const {storage} = require('../storage/storage');
const multer = require('multer');
const upload = multer({ storage });

module.exports = (router, passport) => {
	
	router.get('/user/:Id',GetUser);
	router.get('/searchUser/:Name',passport.authenticate('jwt', { session: false }),SearchAccount);
	router.delete('/user', passport.authenticate('jwt', { session: false }),DeleteUser);
	router.patch('/user',  passport.authenticate('jwt', { session: false }),upload.fields([{ name: 'profilePicture', maxCount: 1 }, { name: 'coverPicture', maxCount: 1 }]),EditUser);
	return router;
};
