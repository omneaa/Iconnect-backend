const{
   sendNotification
}=require('../controllers/SendNotification');
const ApiResponse=require('../utils/apiResponse');
const Post=require('../models/Post');
require('dotenv').config();
const { storage } = require('../storage/storage');
const multer = require('multer');
const upload = multer({ storage });
const {mongodb,ObjectId} = require('mongodb');
const { authorize } = require('passport');
const axios = require('axios');

const createPost= async(req,res)=>{
    
    try{

        const { description} = req.body;
        const Image = req.file ? req.file.path : null;
if( !description && !Image)
{
    return res.status(400).json({ message: "post can't be empty", data:"null"});
}
else{
    let newPost={
        description:req.body.description,
        image:Image,
        UserId:req.user._id
    }
    
    let result=await Post.create(newPost);
    newPost._id=result._id;


    return res.status(200).json({ message: "post created successfully", data:newPost});
    }
    
}
    catch(err)
    {
        return ApiResponse.error(res, 500, 'Internal Server Error');
    }
};

/*====================================================*/
const deletePost=async(req,res)=>{
    try{
        
        let validate=await Post.findById(req.params.PostId);
        if(validate.UserId===req.params.UserId){
        let result=await Post.findByIdAndDelete(req.params.PostId);
        return res.status(200).json({ message: "post deleted successfully", data:"null"});
        }
        else
        {
            return res.status(400).json({ message: "you don't have access to delete this post ", data:"null"}); 
        }
    }
    catch(err){
        return ApiResponse.error(res, 500, "Internal Server Error");
    }
};

/*====================================================*/
const userPosts=async(req,res)=>{
    try{
const posts=await Post.find({UserId: `${req.params.UserId}`},{"__v":false,"UserId":false});
return res.status(200).json({ message: "operation successful", data:posts});
    }
    catch(err){
        return ApiResponse.error(res, 500, 'Internal Server Error');
    }
}
/*====================================================*/
const updatePost=async(req,res)=>{
    try{
        let validate=await Post.findById(req.params.PostId);
        if(validate.UserId !==req.params.UserId){
            return res.status(400).json({ message: "you don't have access to edit this post", data:"null"}); 
        }
        else
        {
        let description = null;
        if(req.body.description){
            description =req.body.description ;
        }
        const Image = req.file ? req.file.path : null;
        if( !description && !Image)
{
    return res.status(400).json({ message: "post can't be empty", data:"null"});
}else
{
         let result=await Post.findByIdAndUpdate(req.params.PostId,{'description':description,'image':Image},{new: true, select:"UserId description image "});
    return res.status(200).json({ message: "post updated successfully", data:result});
    }
}
    }
    catch(err)
    {
        return ApiResponse.error(res, 500, 'Internal Server Error');
    }

};
/*====================================================*/
const specificPost=async(req,res)=>{
    try{
const post=await Post.findById(req.params.PostId,{"__v":false,"UserId":false});
return res.status(200).json({ message: "operation successful", data:post});
    }
    catch(err){
        return ApiResponse.error(res, 500, 'Internal Server Error');
    }
};

/*====================================================*/
const deleteComment=async(req,res)=>{
    try{
       
        console.log(req.params.commentID);
        const { postID, commentID } = req.params;
        const updatedPost = await Post.findOneAndUpdate(
            { _id: postID, "comments._id": commentID }, 
            { $pull: { comments: { _id: commentID } } }, 
            { new: true,"__v":false}
          );
         return res.status(200).json({ message: "comment deleted", data:updatedPost});
             }
             catch(err){
                console.error(err);
                 return ApiResponse.error(res, 500, 'Internal Server Error');
             }
};
/*====================================================*/
const editComment=async(req,res)=>{
    try{
       
        const {comment}=req.body;
        const Usercomment=await Post.findOneAndUpdate({'comments._id':req.params.commentID},
        { $set:{'comments.$.comment':comment}},{new:true,"__v":false});
        
         return res.status(200).json({ message: "comment edited", data:Usercomment});
             }
             catch(err){
                 return ApiResponse.error(res, 500, 'Internal Server Error');
             }
     
    };


/*====================================================*/
  const addComment=async(req,res)=>{

        try{
       const newComment={
        comment:req.body.comment,
        authorID:req.params.authorID,
       };
       const {comment}=req.body;
       const Usercomment=await Post.findByIdAndUpdate(req.params.postID,{$push:{ comments:newComment}},{new:true,"__v":false});

       const notificationData = {
        UserID:req.params.UserID,
        Description: "one commented to your post ", 
        Url: `Post/${req.params.postID}`, 
      };
  const response = await axios.post('https://webhook-test.com/714c803b2f8000cffc978e4f812284f4',notificationData);
  console.log(response);
  if (response.status === 200) {
      console.log("Notification sent successfully to user");
    } else {
      console.error("Error sending notification: ");
      
    }     


        return res.status(200).json({ message: "comment Added", data:Usercomment});
            }
            catch(err){
                return ApiResponse.error(res, 500, 'Internal Server Error');
            }
        };

        /*====================================================*/
        const like=async(req,res)=>{
            try{
            const {postID,reacterID}=req.params;
            const newReact={
                reacterID,
                reactType:1
            }
            let react = await Post.findOne(
                { _id: postID, "reacts.reacterID": reacterID });
                if(react===null)
                {
                react =await Post.findByIdAndUpdate(req.params.postID,{$push:{ reacts:newReact}},{new:true,"__v":false});
                const notificationData = {
                    UserID:req.params.UserID,
                    Description: "one liked your post", 
                    Url: `allReacts/${req.params.postID}`, 
                
                  };
              const response = await axios.post('https://webhook-test.com/714c803b2f8000cffc978e4f812284f4',notificationData);
              console.log(response);
              if (response.status === 200) {
                  console.log("Notification sent successfully to user");
                } else {
                  console.error("Error sending notification: ");
                }
                }
                
               else if(react.reacts[0].reactType===1)
               {
                react  = await Post.findOneAndUpdate(
                    { _id: postID, "reacts.reacterID": reacterID }, 
                    { $pull: { reacts: { reacterID: reacterID } } }, 
                    { new: true,"__v":false}
                  );
               }
               else if(react.reacts[0].reactType===-1)
               {
                react  = await Post.findOneAndUpdate(
                    { _id: postID, "reacts.reacterID": reacterID }, 
                    { $set:{'reacts.$.reactType':1}},{ new: true,"__v":false}
                  );
                  const notificationData = {
                    UserID:req.params.UserID,
                    Description: "one liked your post", 
                    Url: `allReacts/${req.params.postID}`, 
                
                  };
              const response = await axios.post('https://webhook-test.com/714c803b2f8000cffc978e4f812284f4',notificationData);
              console.log(response);
              if (response.status === 200) {
                  console.log("Notification sent successfully to user");
                } else {
                  console.error("Error sending notification: ");
                }
               }


              
            

                return res.status(200).json({ message: "like react", data:react});
                }
                catch(err){
                    return ApiResponse.error(res, 500, 'Internal Server Error');
                }
            };


/*====================================================*/
            const dislike=async(req,res)=>{
                try{
                    const {postID,reacterID}=req.params;
                    const newReact={
                        reacterID,
                        reactType:-1
                    }
                    let react = await Post.findOne(
                        { _id: postID, "reacts.reacterID": reacterID });
                        if(react===null)
                        {
                        react =await Post.findByIdAndUpdate(req.params.postID,{$push:{ reacts:newReact}},{new:true,"__v":false});
                        const notificationData = {
                            UserID:req.params.UserID,
                            Description: "one unliked your post", 
                            Url: `allReacts/${req.params.postID}`, 
                        
                          };
                      const response = await axios.post('https://webhook-test.com/714c803b2f8000cffc978e4f812284f4',notificationData);
                      console.log(response);
                      if (response.status === 200) {
                          console.log("Notification sent successfully to user");
                        } else {
                          console.error("Error sending notification: ");
                        }
                        }
                        
                       else if(react.reacts[0].reactType===-1)
                       {
                        react  = await Post.findOneAndUpdate(
                            { _id: postID, "reacts.reacterID": reacterID }, 
                            { $pull: { reacts: { reacterID: reacterID } } }, 
                            { new: true,"__v":false}
                          );
                       }
                       else if(react.reacts[0].reactType===1)
                       {
                        react  = await Post.findOneAndUpdate(
                            { _id: postID, "reacts.reacterID": reacterID }, 
                            { $set:{'reacts.$.reactType':-1}},{ new: true,"__v":false}
                          );
                          const notificationData = {
                            UserID:req.params.UserID,
                            Description: "one unliked your post", 
                            Url: `allReacts/${req.params.postID}`, 
                        
                          };
                      const response = await axios.post('https://webhook-test.com/714c803b2f8000cffc978e4f812284f4',notificationData);
                      console.log(response);
                      if (response.status === 200) {
                          console.log("Notification sent successfully to user");
                        } else {
                          console.error("Error sending notification: ");
                        }
                       }
   
                      

                        return res.status(200).json({ message: "dislike react", data:react});
                        }
                        catch(err){
                            return ApiResponse.error(res, 500, 'Internal Server Error');
                        }
                };

/*====================================================*/
                    const allReacts=async(req,res)=>{
                        try{
                        const {postID}=req.params;
                        const react = await Post.findOne(
                            { _id: postID});
                            return res.status(200).json({ message: "All reacts", data:react.reacts});
                        }
                            catch(err){
                                return ApiResponse.error(res, 500, 'Internal Server Error');
                            }
                        };
                
            


module.exports={
    createPost,deletePost,userPosts,updatePost,specificPost,addComment,editComment,deleteComment,like,dislike,allReacts
};
