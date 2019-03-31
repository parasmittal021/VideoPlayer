const express=require('express');
const bodyParser=require('body-parser');
const path=require('path');
const port=process.env.PORT||8080;
const app=express();
const api=require('./server/routes/api');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var cors = require('cors');
var passport = require('passport');



// Passport config after model is defined
require('./server/config/passport');
app.use(cookieParser());
app.use(cors());
app.use(logger('dev'));

// Initialise Passport before using the route middleware
app.use(passport.initialize());



app.use(express.static(path.join(__dirname,'dist/VideoPlayer')));

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use('/api',api);
app.get('*',(req,res)=>{
 res.sendFile(path.join(__dirname,'dist/VideoPlayer/index.html'))

 });

app.listen(port,function(){
    console.log("server running on localhost:"+port);
});