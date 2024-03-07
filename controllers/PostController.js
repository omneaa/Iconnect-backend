const ApiResponse=require('../utils/apiResponse');
const Post=require('../models/Post');
require('dotenv').config();
const { storage } = require('../storage/storage');
const multer = require('multer');
const upload = multer({ storage });
const {mongodb,ObjectId} = require('mongodb');
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
}


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
}


const userPosts=async(req,res)=>{
    try{
const posts=await Post.find({UserId: `${req.params.UserId}`},{"__v":false,"UserId":false});
return res.status(200).json({ message: "operation successful", data:posts});
    }
    catch(err){
        return ApiResponse.error(res, 500, 'Internal Server Error');
    }
}
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

}
module.exports={
    createPost,deletePost,userPosts,updatePost
};