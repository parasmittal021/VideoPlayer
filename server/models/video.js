const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const videoSchema=new Schema({
    userId:String,
    title:String,
    url:String,
    description:String
});

module.exports=mongoose.model('video',videoSchema,'Videos');
