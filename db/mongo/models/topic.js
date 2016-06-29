// "use strict";
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
// var Promise = mongoose.Promise;
var co = require("co");
var libs = require('../../../libs/libs')
var errors = libs.errors;
var config = require('db/config')


var BaseTopicSchema = new Schema({
    title: { type: String },
    content: { type: String },
    img: { type: String },
    cats: { type: String, default: '默认'},
    // tags: { type: String, default: '' },
    tags: [String],
    user: {
        id: { type: String },
        author_id: { type: String },
        username: { type: String },
        nickname: { type: String },
        avatar: { type: String }
    },
    create_at: { type: String, default: (new Date().getTime()) },  //创建时间
    update_at: { type: String, default: (new Date().getTime()) }
});

BaseTopicSchema.index({tags: 1});
BaseTopicSchema.index({title: 1});



/**
 * Middlewares
 */
var topic_profile = require('./catoray/topic_profile')
BaseTopicSchema.plugin(topic_profile);

BaseTopicSchema.methods.userMatches = function *(user) {
    var this_user = this.user.username.toString();
    var that_user = user.username.toString()
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

BaseTopicSchema.statics.topicList = function *(start, end, tag, cat) {
    let query = {}
    let pageSize = config.mongo.pageSize;
    if (!start) start = 0;
    if (!end) end = pageSize;

    if (tag && typeof tag==='string'){
        query.tags = decodeURI(tag)
    }

    if (cat && typeof cat==='string'){
        query.cats = cat
    }

    var lists = yield this.find(query,'title _id tags create_at update_at img user visit_count',{skip:start, limit: end, sort: [{update_at: -1, create_at: -1}] }).exec()
    return lists;
}

//获取topic
BaseTopicSchema.statics.topicMatchesId = function *(topic_id) {
  var topic = yield this.findOne({ _id: topic_id }).exec();
  console.log('匹配文章id-----------');
  console.log(topic);
  if (!topic) {
      return errors['20004'];
  }
  return topic;

};

//topic的count
BaseTopicSchema.statics.topicCount = function *(topic_id) {
  var topic = yield this.findOne({ _id: topic_id }).exec();
  console.log('文章统计计数-----------');
  console.log(topic);
  if (!topic) {
      return errors['20004'];
  }
  var _count = topic.visit_count;
  var stat = {
      $set: {
          visit_count: _count+1
      }
  }
  yield this.update({ _id: topic_id }, stat, {}).exec()
  return true;

};

BaseTopicSchema.statics.deletTopicMatchesId = function *(topic_id, user) {
  try {
      var topic = yield this.findOne({ _id: topic_id }).exec();
      console.log('删除文章----------');
      console.log(topic);
      if (!topic) {
          return errors['20004'];
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
      console.log('更新文章---------');
      console.log(topic);
      if (!topic) {
          return errors['20004'];
      }
      else {
          if (yield topic.userMatches(user)) {
              body.update_at = new Date().getTime();
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
