const mongoose=require('mongoose');
const PostSchema=new mongoose.Schema({
    description:{
        type:String,
        default:"null"
    },
    image:{
        type:String,
        default:"null"
    },
     UserId:{
        type:String
     }
});
const Post=mongoose.model('Post',PostSchema);
module.exports=Post;