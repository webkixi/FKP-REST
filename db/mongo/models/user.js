// "use strict";
var bcrypt = require('bcryptjs');
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
// var Promise = mongoose.Promise;
var co = require("co");
var libs = require('libs/libs')
var errors = libs.errors;
libs.clog('db-model-user.js')

var BaseUserSchema = new Schema({
    id: { type: String, required: true, unique: true, lowercase: true },
  username: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  nickname: { type: String, default: ''},
  phone: {type: String, default: ''},
  create_at: { type: String, default: (new Date().getTime()) },   //Date.now 带格式
  update_at: { type: String, default: (new Date().getTime()) },
  accessToken: {type: String}
}, {
  toJSON: {
    transform: function(doc, ret, options) {
      delete ret.password;
      delete ret._id;
      delete ret.__v;
      delete ret.create_at;
      delete ret.update_at;
    },
  },
});

/**
* Index 索引
*/
BaseUserSchema.index({username: 1}, {unique: true});
BaseUserSchema.index({accessToken: 1});

/**
 * Middlewares
 */
 var user_profile = require('./catoray/user_profile')
 BaseUserSchema.plugin(user_profile);

/**
 * Middlewares
 */
BaseUserSchema.pre("save", function(done) {
  // only hash the password if it has been modified (or is new)
  if (!this.isModified("password")) {
    return done();
  }

  co.wrap(function*() {
    try {
      var salt = bcrypt.genSaltSync(10);
      var hash = bcrypt.hashSync(this.password, salt);
      this.password = hash;
      done();
    } catch (err) {
      done(err);
    }
  }).call(this).then(done);
});

/**
 * Methods
 */
BaseUserSchema.methods.comparePassword = function *(candidatePassword) {
  return bcrypt.compareSync(candidatePassword, this.password);
};

/**
 * Statics
 */

BaseUserSchema.statics.passwordMatches = function *(username, password) {
  var user = yield this.findOne({ username: username.toLowerCase() }).exec();
  if (!user) {
    // throw new Error(errors['10001']);
    return errors['10001']
  }

  if (yield user.comparePassword(password)) {
    return user;
  }
  else{
    //   throw new Error(errors['10002']);
      return errors['10002']
  }

};

BaseUserSchema.statics.userMatches = function *(username, password) {
  var user = yield this.findOne({ username: username.toLowerCase() }).exec();
  if (user) {
      return errors['10003'];
  }
  return true;

};

BaseUserSchema.statics.hasUserMatches = function *(username, password) {
  var user = yield this.findOne({ username: username.toLowerCase() }).exec();
  if (user) {
      return user
  }
  return false
};

// Model creation
mongoose.model("User", BaseUserSchema);
