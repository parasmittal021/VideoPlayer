var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');
const express=require('express');
var path = require('path');
var hbs = require('nodemailer-express-handlebars');
var nodemailer = require('nodemailer');
var   async = require('async');

 require('dotenv').load();

var email = process.env.MAILER_EMAIL_ID || 'auth_email_address@gmail.com';
var pass = process.env.MAILER_PASSWORD || 'auth_email_pass';

var fullUrl;

var smtpTransport = nodemailer.createTransport({
  service: process.env.MAILER_SERVICE_PROVIDER || 'Gmail',
  auth: {
    user: email,
    pass: pass
  },
  tls: {
    rejectUnauthorized: false
}
});


var handlebarsOptions = {
  viewEngine: {
    extname: '.html',
    partialsDir : path.resolve('./server/partials')
},
  viewPath: path.resolve('./server/templates/'),
  extName: '.html'
};

smtpTransport.use('compile', hbs(handlebarsOptions));


/**
 * Forgot password
 */
exports.forgot_password = function(req, res) {
  fullUrl  = req.protocol + '://' + req.get('host') ;
  var token;
  async.waterfall([
    function(done) {
      User.findOne({
        email: req.body.email
      }).exec(function(err, user) {
        if (user) {
          token=user.token;
          done(err, user);
        } else {
          done('User not found.');
        }
      });
    },
  
    function( user, done) {
      var data = {
        to: user.email,
        from: email,
        template: 'forgot-password-email',
        subject: 'Password help has arrived!',
        context: {
          url:  fullUrl+'/reset_password?token=' + token+'&email='+user.email,
          name: user.firstName
        }
      };
    
      smtpTransport.sendMail(data, function(err) {
        if (!err) {
          return res.json({ message: 'Kindly check your email for further instructions' });
        } else {
          return  res.status(422).json({ message: "Mail Cannot be sent" });
        }
      });
    }
  ], function(err) {
    console.log(err);
    return res.status(401).json({ message: "User not found" });
  });
};

/**
 * Reset password
 */
exports.reset_password = function(req, res, next) {
  User.findOne({
    email: req.body.email
  }).exec(function(err, user) {
    if (!err && user) {
      if (req.body.newPassword === req.body.confirmPassword) {
        user.setPassword(req.body.newPassword);
        var token;
        token = user.generateJwt();
       user.token=token;
        user.save(function(err) {
          if (err) {
            return res.status(422).send({
              message: "Some error occured"
            });
          } else {
            
            var data = {
              to: user.email,
              from: email,
              template: 'reset-password-email',
              subject: 'Password Reset Confirmation',
              context: {
                name: user.firstName
              }
            };

            smtpTransport.sendMail(data, function(err) {
              if (!err) {
                return res.json({ "token":token });
              } else {
                return done.status(422).send({
                  message: "Some error occured"
                });
              }
            });
           
          }
        });
      } else {
        return res.status(422).send({
          message: 'Passwords do not match'
        });
      }
    } else {
      console.log(err);
      return res.status(400).send({
        message: 'Some error occured.'
      });
    }
  });
};


var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

/*
Register
*/
module.exports.register = function(req, res) {
 
   if(!req.body.firstName || !req.body.email || !req.body.password || !req.body.lastName || !req.body.phone) {
    sendJSONresponse(res, 400, {
      "message": "All fields required"
    });
    return;
   }

   User.find({
    email:req.body.email
})
.exec().
then(user=>{
    if(user.length>=1){
        return res.status(409).json({
           message:"Mail exits" 
        });
    }
  
    else{
  var user = new User();

  user.email = req.body.email;
  user.firstName=req.body.firstName;
  user.lastName=req.body.lastName;
  user.phone=req.body.phone;

  user.setPassword(req.body.password);
  var token;
  token = user.generateJwt();
  user.token=token;
  user.save(function(err) {
   
  
if(!err){
    res.status(200);
    res.json({
      "token" : token,
      "message":"User Created",
      "userId":user._id
    });
  }
  else{
    console.log(err);
    res.status(500).json({
       error:err 
    });
  }
  });
    }
  });
};

/*
Login
*/
module.exports.login = function(req, res) {

  if(!req.body.email || !req.body.password) {
    sendJSONresponse(res, 400, {
      "message": "All fields required"
    });
    return;
  }

  passport.authenticate('local', function(err, user, info){
    var token;

    // If Passport throws/catches an error
    if (err) {
      res.status(404).json(err);
      return;
    }

    // If a user is found
    if(user){
      token = user.generateJwt();
      user.token=token;
      user.save(function(err) {   

      });
      res.status(200);
      res.json({
        "token" : token,
         "userId":user._id
      });
    } else {
      // If user is not found
      res.status(401).json(info);
    }
  })(req, res);

};


module.exports.getToken = function(req, res) {
  User.findOne({
    email: req.body.email
  }).exec(function(err, user) {
    if (!err && user) {
      var token=user.token;
      res.status(200);
    res.json({
      "token" : token
    });
    }
    else{
      console.log(err);
      return res.status(400).send({
        message: 'Error in authentication'
      });
    }
    });

  }
