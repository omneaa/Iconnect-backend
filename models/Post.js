const mongoose=require('mongoose');
const PostSchema=new mongoose.Schema({
    description:{
     type:String,
    },
    image:{
    type:String,
        
    },
     UserId:{
     type:String
     },
     comments:[{
type:mongoose.Schema.Types.ObjectId
     }]
     
});
const Post=mongoose.model('Post',PostSchema);
module.exports=Post;