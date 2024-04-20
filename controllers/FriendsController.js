const ApiResponse=require('../utils/apiResponse');
const User=require('../models/User');
require('dotenv').config();
const { storage } = require('../storage/storage');
const multer = require('multer');
const upload = multer({ storage });
const {mongodb,ObjectId} = require('mongodb');
const { authorize } = require('passport');
const friendRequest=async(req,res)=>{
    try{
        const {senderID,receiverID}=req.params;

       

            const notificationData = {
             UserID:req.params.receiverID,
             Description: "you have new friend request ", 
             Url: `user/${senderID}`, 
         
           };
       const response = await axios.post('https://webhook-test.com/714c803b2f8000cffc978e4f812284f4',notificationData);
       console.log(response);
       if (response.status === 200) {
           console.log("Notification sent successfully to user");
         } else {
           console.error("Error sending notification: ");
         }
     
         return res.status(200).json({ message: "request sent", data:"null"});
    }
    catch(e){
  return ApiResponse.error(res, 500, 'Internal Server Error');
    }
};
const friendRequestResponse=async(req,res)=>{
    try{
        const {senderID,receiverID,action}=req.params;
       
if(action=="1")
{
   
    const sender=await User.findByIdAndUpdate(senderID,{$push:{friends:receiverID},$inc:{friendsNumber:1}},{new:true,"__v":false});
    const receiver=await User.findByIdAndUpdate(receiverID,{$push:{friends:senderID},$inc:{friendsNumber:1}},{new:true,"__v":false});
    
    const notificationData = {
        UserID:req.params.receiverID,
        Description: "wow you have a new friend ", 
        Url: `user/${senderID}`,
      };


  const response = await axios.post('https://webhook-test.com/714c803b2f8000cffc978e4f812284f4',notificationData);


  console.log(response);
  if (response.status === 200) {
      console.log("Notification sent successfully to user");
    } else {
      console.error("Error sending notification: ");
    }



     res.status(200).json({ message:"you have new friend wow!!" , data:""});
     

}
     
    }
    catch(e){
  return ApiResponse.error(res, 500, 'Internal Server Error');
    }
};


const unfriend=async(req,res)=>{
    try{
        const {senderID,receiverID}=req.params;
        const sender=await User.findByIdAndUpdate(senderID,{$pull:{friends:receiverID},$inc:{friendsNumber:-1}},{new:true,"__v":false});
        const receiver=await User.findByIdAndUpdate(receiverID,{$pull:{friends:senderID},$inc:{friendsNumber:-1}},{new:true,"__v":false});
        return res.status(200).json({ message: `you now unfriended ${receiver.firstname}`, data:"null"});
    }
    catch(e){
  return ApiResponse.error(res, 500, 'Internal Server Error');
    }
};

const suggestFriends=async(req,res)=>{
    try{
        
        const suggestFriends=await User.find();

        return res.status(200).json({ message:"suggest friends", data:suggestFriends });
    }
    catch(e){
  return ApiResponse.error(res, 500, 'Internal Server Error');
    }
};

module.exports={
    friendRequest,friendRequestResponse,unfriend,suggestFriends
};