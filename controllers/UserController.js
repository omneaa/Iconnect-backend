
const User = require('../models/User');
require('dotenv').config();
const { storage } = require('../storage/storage');
const multer = require('multer');
const upload = multer({ storage });
const currentUser = async (req, res) => {
	try{
	let user=await User.findById(req.params.Id,{"__v":false,"_id":false,"password":false});
	return res.status(200).json({ message: "Operation successful", data:user });
	}
	catch(err){
		return ApiResponse.error(res, 500, 'Internal Server Error');
	}
};
const DeleteUser = async (req, res) => {
	try{
		let UserEmail=req.user.email;
        let user=await User.deleteOne({ email: UserEmail });
		return res.status(200).json({ message: "Account deleted successfully", data:"null" });
		}
		catch(err){
			return ApiResponse.error(res, 500, 'Internal Server Error');
		}
};

const EditUser=async(req,res)=>{
	

}
module.exports={currentUser,DeleteUser,EditUser};