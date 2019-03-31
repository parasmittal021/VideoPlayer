var mongoose = require( 'mongoose' );
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
require('dotenv').load();

var userSchema = new mongoose.Schema({
 
  email: {
    type: String,
    unique: true,
    required: true,
    match:/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  hash: String,
  salt: String,
  token:String
});

userSchema.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
};

userSchema.methods.validPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
  return this.hash === hash;
};

userSchema.methods.generateJwt = function() {
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return jwt.sign({
    _id: this._id,
    email: this.email,
    firstName: this.firstName,
    lastName: this.lastName,
    phone: this.phone,
    exp: parseInt(expiry.getTime() / 1000),
  }, process.env.SECRET_ID); // DO NOT KEEP YOUR SECRET IN THE CODE!
};

module.exports=mongoose.model('User', userSchema,'Users');