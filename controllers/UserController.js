const User = require('../models/User');
const Post = require('../models/Post');
require('dotenv').config();
const ApiResponse=require('../utils/apiResponse');
const {storage} = require('../storage/storage');
const multer = require('multer');
const { UploadStream } = require('cloudinary');
const upload = multer({ storage });



const GetUser = async (req, res) => {
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

const SearchAccount=async(req,res)=>{
		
	
	try{
		let firstName= req.params.Name.split(' ')[0]; 
		let result=await User.find({firstname:firstName},{"__v":false,"UserId":false,"password":false,"_id":false, "email":false});
		return res.status(200).json({ message: "Operation successful", data:result });
	}
	catch(e){
		return res.status(500).json({ message: "Internal Server Error", data:"null" });
	}
}

const EditUser=async(req,res)=>{
		
	try{	

let profilePicture=req.user.profilePicture;
	    let coverPicture=req.user.coverPicture;
	if(req.files['coverPicture']){
		coverPicture=req.files['coverPicture'][0].path;
	}
	if(req.files['profilePicture']){
		profilePicture=req.files['profilePicture'][0].path;
	}
		let userEmail=req.user.email;
        let data =await User.findOneAndUpdate({ email: userEmail },{$set:req.body,"coverPicture":coverPicture,"profilePicture":profilePicture},
		{new: true,select: "firstname lastname username gender email phone profilePicture coverPicture"});
		// const userData = {
		// 	firstname: req.user.firstname,
		// 	lastname: req.user.lastname,
		// 	username: req.user.username,
		// 	email: req.user.email,
		// 	gender: req.user.gender,
		// 	phone: req.user.phone,
		// 	profilePicture:req.user.profilePicture,
		// 	coverPicture:req.user.coverPicture,
		// };
		return res.status(200).json({ message: "Operation successful", data:data});
		}
		catch(err){
			return ApiResponse.error(res, 500, 'Internal Server Error');
		}
}


const userTimeLine = async (req, res) => {
	try{
		const {userID}=req.params;
		const user = await User.findById(userID).populate('friends');
		const friendIds = user.friends.map(friend => friend._id);
		const posts = await Post.find({ authorID: { $in: friendIds } });
	return res.status(200).json({ message: "Time Line", data:posts });
	}
	catch(err){
		return ApiResponse.error(res, 500, 'Internal Server Error');
	}
};




module.exports={GetUser,DeleteUser,EditUser,SearchAccount,userTimeLine};