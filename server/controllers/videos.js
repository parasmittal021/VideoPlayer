const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const Video=require('../models/video');
var jwt = require('express-jwt');

exports.allVideos = function(req, res) {
    console.log('Get request for all videos');
Video.find({userId: req.body.userId})
.exec(function(err,videos){
    if(err){
        console.log('Error retrieving videos');
    res.status(500).json({
       error:err ,
       message:"Error retrieving videos",
    });

    }
    else{
        res.json(videos);
    }

});
};


exports.videoById=function(req,res){
    console.log('Get request for single video');
    Video.findById(req.params.id)
    .exec(function(err,video){
        if(err){
            console.log('Error retrieving video');
            res.status(500).json({
               error:err ,
               message:"Error retrieving video",
            });
        }
        else{
            res.json(video);
        }
    
    });
    };


exports.postVideo=function(req,res){
    console.log('Post a video');
var newVideo=new Video();
newVideo.userId=req.body.userId;
newVideo.title=req.body.title;
newVideo.description=req.body.description;
newVideo.url=req.body.url;
newVideo.save(function(err,insertedVideo){
if(err){
    console.log('Error in posting video');
    res.status(500).json({
       error:err ,
       message:"Error in posting video",
    });
}
else{
    res.json(insertedVideo);
}
});
  
    };



exports.updateVideo=function(req,res){
    console.log('Updating a video');
    Video.findByIdAndUpdate(req.params.id,
    {
        $set:{userId:req.body.userId,title:req.body.title,url:req.body.url,description:req.body.description}
    },
    {
        new:true
    },function(err,updatedVideo){
        if(err){
            console.log('Error in updating video');
            res.status(500).json({
               error:err ,
               message:"Error in updating video",
            });
        }
        else{
            res.json(updatedVideo);
        }
    }
    );
      
        };


exports.deleteVideo=function(req,res){
    console.log('Deleting a video');
    Video.findByIdAndRemove(req.params.id,function(err,deletedVideo){
        if(err){
            console.log('Error in deleting video');
            res.status(500).json({
               error:err ,
               message:"Error in deleting video",
            });
        }
        else{
            res.json(deletedVideo);
        }
    });
};