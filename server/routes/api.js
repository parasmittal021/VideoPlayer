const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
var jwt = require('express-jwt');
require('dotenv').load();

var auth = jwt({
  secret:  process.env.SECRET_ID,
  userProperty: 'payload'
});

var ctrlProfile = require('../controllers/profile');
var ctrlAuth = require('../controllers/authentication');
var videoData=require('../controllers/videos');


console.log(process.env.USER);
console.log(process.env.PASSWORD);
const db="mongodb://"+process.env.USER+":"+process.env.PASSWORD+"@videoplayer-shard-00-00-8wjdv.mongodb.net:27017,videoplayer-shard-00-01-8wjdv.mongodb.net:27017,videoplayer-shard-00-02-8wjdv.mongodb.net:27017/VideoPlayerPro?ssl=true&replicaSet=Videoplayer-shard-0&authSource=admin&retryWrites=true";
mongoose.Promise=global.Promise;
mongoose.connect(db,function(err){
    if(err){
        console.error("Error! "+err);
    }
});



router.get('/',function(req,res){
    res.send('api works');
});

// profile
router.get('/profile', auth, ctrlProfile.profileRead);

// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);
router.post('/forgot_password', ctrlAuth.forgot_password);
router.post('/reset_password', ctrlAuth.reset_password);
router.post('/getToken',ctrlAuth.getToken);

//videoData
router.post('/videos',videoData.allVideos);
router.get('/videos/:id',videoData.videoById);
router.post('/video',videoData.postVideo);
router.put('/video/:id',videoData.updateVideo);
router.delete('/video/:id',videoData.deleteVideo);

module.exports=router;