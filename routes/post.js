const{
    createPost,deletePost,userPosts,updatePost,specificPost,addComment,editComment,deleteComment
}=require('../controllers/PostController');
const validateResource = require('../middlewares/validateResource');
require('dotenv').config();
const { storage } = require('../storage/storage');
const multer = require('multer');
const upload = multer({ storage });
const bodyParser = require('body-parser');


module.exports = (router,passport) => {
    router.use(bodyParser.json());
	 router.post('/addPost',passport.authenticate('jwt', { session: false }),upload.single('image'),createPost);
     router.post('/addComment/:UserID/:authorID/:postID',passport.authenticate('jwt', { session: false }),upload.single('comment'),addComment);
     router.patch('/editComment/:commentID',passport.authenticate('jwt', { session: false }),upload.single('comment'),editComment);
     router.delete('/deleteComment/:postID/:commentID',passport.authenticate('jwt', { session: false }),deleteComment);
     router.put('/updatePost/:PostId/:UserId',passport.authenticate('jwt', { session: false }),upload.single('image'),updatePost);
     router.delete('/deletePost/:PostId/:UserId',passport.authenticate('jwt', { session: false }),deletePost);
     router.get('/userPosts/:UserId',userPosts);
     router.get('/Post/:PostId',specificPost);

	return router;
};