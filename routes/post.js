const{
    createPost,deletePost,userPosts,updatePost
}=require('../controllers/PostController');
const validateResource = require('../middlewares/validateResource');
require('dotenv').config();
const { storage } = require('../storage/storage');
const multer = require('multer');
const upload = multer({ storage });
module.exports = (router,passport) => {
	 router.post('/addPost',passport.authenticate('jwt', { session: false }),upload.single('image'),createPost);
     router.put('/updatePost/:PostId/:UserId',passport.authenticate('jwt', { session: false }),upload.single('image'),updatePost);
     router.delete('/deletePost/:PostId/:UserId',passport.authenticate('jwt', { session: false }),deletePost);
     router.get('/userPosts/:UserId',userPosts);

	return router;
};