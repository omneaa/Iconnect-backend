const mongoose=require('mongoose');
  const CommentSchema=new mongoose.Schema({
     authorID:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
     },
     comment: {
      type: String,
      // ref: 'User',
      required: true ,
    },
       
  });

  const ReactSchema=new mongoose.Schema({
    reacterID:{
     type: mongoose.Schema.Types.ObjectId,
     ref: 'User',
     required: true,
    },
    reactType: {
     type:Number,
     default:0
   },
      
 });

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
     
     comments: [CommentSchema],
     reacts:[ReactSchema]
     
});
const Post=mongoose.model('Post',PostSchema);
module.exports=Post;