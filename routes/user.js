const{currentUser,DeleteUser,EditUser}=require('../controllers/UserController');
const validateResource = require('../middlewares/validateResource');
require('dotenv').config();
const { storage } = require('../storage/storage');
const multer = require('multer');
const upload = multer({ storage });
module.exports = (router, passport) => {
	
	router.get('/user/:Id',currentUser);
	router.delete('/user',passport.authenticate('jwt', { session: false }),DeleteUser);
	router.put('./user',passport.authenticate('jwt', { session: false }),EditUser);
	
	return router;
};
