// "use strict";
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
// var Promise = mongoose.Promise;
var co = require("co");
var libs = require('../../../libs/libs')
var errors = libs.errors;
const config = include('root/config')


var BaseTopicSchema = new Schema({
    title: { type: String },
    content: { type: String },
    img: { type: String },
    user: {
        author_id: Schema.Types.ObjectId,
        username: { type: String },
        nickname: { type: String }
    },
    create_at: { type: String, default: (new Date().getTime()) },  //创建时间
    update_at: { type: String, default: (new Date().getTime()) }
});


/**
 * Middlewares
 */
var topic_profile = require('./catoray/topic_profile')
BaseTopicSchema.plugin(topic_profile);

BaseTopicSchema.methods.userMatches = function *(user) {
  var this_user = this.user.author_id.toString();
  var that_user = user._id.toString()
  if (this_user === that_user)
    return true
  else {
    return false
  }
  // var topic = yield this.findOne({ _id: topic_id }).exec();
  // if (!topic) {
  //     return errors['10003'];
  // }
  // return topic;

};

BaseTopicSchema.statics.topicList = function *(start, end) {
    let pageSize = config.mongo.pageSize;
    if (!start) start = 0;
    if (!end) end = pageSize;
    var lists = yield this.find({},'title _id create_at update_at user',{skip:start, limit: end, sort: {create_at: -1}}).exec()
    return lists;
}


BaseTopicSchema.statics.topicMatchesId = function *(topic_id) {
  var topic = yield this.findOne({ _id: topic_id }).exec();
  if (!topic) {
      return errors['10003'];
  }
  return topic;

};

BaseTopicSchema.statics.deletTopicMatchesId = function *(topic_id, user) {
  try {
      var topic = yield this.findOne({ _id: topic_id }).exec();
      if (!topic) {
          return errors['10003'];
      }
      else {
          if (yield topic.userMatches(user)) {
            yield this.remove({ _id: topic_id }).exec();
            return true;
          }
          else {
            return errors['20003'];
          }
      }
  } catch (e) {
    console.log('============ delete');
    console.log(e);
  }
};

BaseTopicSchema.statics.updateTopicMatchesId = function *(topic_id, body, user) {
  try {
      var topic = yield this.findOne({ _id: topic_id }).exec();
      if (!topic) {
          return errors['10003'];
      }
      else {
          if (yield topic.userMatches(user)) {
              yield this.update({ _id: topic_id }, body, {}).exec()
              return true;
          }
          else {
              return errors['20003'];
          }
      }
  } catch (e) {
    console.log('============ update');
    console.log(e);
  }
};

// Model creation
mongoose.model("Topic", BaseTopicSchema);
