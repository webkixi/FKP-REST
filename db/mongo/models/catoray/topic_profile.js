var mongoose = require("mongoose");
var Schema = mongoose.Schema;

/**
 * 给所有的 Model 扩展功能
 * http://mongoosejs.com/docs/plugins.html
 */

module.exports = function (schema) {
    schema.add({
        top: { type: Boolean, default: false }, // 置顶帖
        good: {type: Boolean, default: false}, // 精华帖
        lock: {type: Boolean, default: false}, // 被锁定主题
        reply_count: { type: Number, default: 0 },  //回复条数
        visit_count: { type: Number, default: 0 },  //访问次数
        collect_count: { type: Number, default: 0 },  //收藏次数
        last_reply: { type: Schema.Types.ObjectId },
        last_reply_at: { type: Date, default: Date.now },
        content_is_html: { type: Boolean },
        tab: {type: String},
        deleted: {type: Boolean, default: false},
    });

    // schema.index({email: 1}, {unique: true});
    // schema.index({score: -1});
    // schema.index({githubId: 1});


    // mixed
    // var AnySchema = new Schema({any:{}});    // sample person.anything = {x:[3,4,{y:'change'}]}
    // var AnySchema = new Schema({any:Schema.Types.Mixed});
};
