// "use strict";
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
// var Promise = mongoose.Promise;
var co = require("co");
var libs = require('../../../libs/libs')
var errors = libs.errors;

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


BaseTopicSchema.statics.topicList = function *(start, end) {
    if (!start) start = 0;
    if (!end) end = 20;
    var lists = yield this.find({},'title _id create_at update_at user',{skip:start, limit: end, sort: {create_at: -1}}).exec()
    return lists;
}

BaseTopicSchema.statics.userMatches = function *(userid) {
  // var user = yield this.findOne({ username: username.toLowerCase() }).exec();
  // if (user) {
  //     return errors['10003'];
  // }
  // return true;

};

BaseTopicSchema.statics.topicMatchesId = function *(topic_id) {
  var topic = yield this.findOne({ _id: topic_id }).exec();
  if (!topic) {
      return errors['10003'];
  }
  return topic;

};

BaseTopicSchema.statics.deletTopicMatchesId = function *(topic_id) {
  var topic = yield this.findOne({ _id: topic_id }).exec();
  if (!topic) {
      return errors['10003'];
  }
  else {
      yield this.remove({ _id: topic_id }).exec();
      return true;
  }
};

// Model creation
mongoose.model("Topic", BaseTopicSchema);
