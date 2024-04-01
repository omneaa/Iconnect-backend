const{friendRequest,friendRequestResponse,unfriend,suggestFriends }=require('../controllers/FriendsController');

const validateResource = require('../middlewares/validateResource');
require('dotenv').config();
const { storage } = require('../storage/storage');
const multer = require('multer');
const upload = multer({ storage });
const bodyParser = require('body-parser');


module.exports = (router,passport) => {
router.post('/friendRequest/:senderID/:receiverID',passport.authenticate('jwt', { session: false }),friendRequest);
router.post('/unfriend/:senderID/:receiverID',passport.authenticate('jwt', { session: false }),unfriend);
router.post('/friendRequestResponse/:senderID/:receiverID/:action',passport.authenticate('jwt', { session: false }),friendRequestResponse);
router.get('/suggestFriends',passport.authenticate('jwt', { session: false }),suggestFriends);
return router;
};