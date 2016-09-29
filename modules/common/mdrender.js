/**
 * markdown的扩展
 * 支持 link，img等等
*/
var marked = require('marked')
var render = new marked.Renderer();
var libs = require('../../libs/libs');
var co = require('co')

var whiteListPropsAry = ['id', 'class', 'div', 'excute'];

function customParse(str, spec){
    console.log('============ modules/common/mdrender.js\n');
    var re = /[\s]?\{(.*?)\}/;    // "fjdskg  {abc: xxx} {xyz: yyy}" 取 " {....}"
    var re_g = / \{(.*)\}/g;
    var re_g_li = /<li>(\{.*?\})\s*<\/li>\s*/;
    var re_whiteList = /(id|class|div|excute):[\w@;: \-_]+/ig;    //只允许id 和 class

    var tmp_str = str;

    if (spec==='ul'){
        str = _.unescape(str)
        var config = str.match(re_g_li)
        if (config && config.length) {
            str = str.replace(config[0],'')
            tmp_str = str
            var _obj = getAsset(config[1])
            return [tmp_str, _obj]
        }
    }else{
        tmp_str = tmp_str.replace(re_g, '')
        var _obj = getAsset(str);
        return [tmp_str, _obj];
    }

    function getAsset(_str){

        var key, val, obj={},
            tmp = _str.match(re),
            _tmp = _(tmp[0])
                    .chain()
                    .thru(function(val){
                      return val.match(re_whiteList);
                    })
                    .value()

        if (_tmp && _tmp.length){
          _tmp.map(function(item, i){
            var kv = item.split(':');
            if (kv[0]==='id' && kv[1].indexOf(' ')>-1){
              obj[kv[0]] = _.split(_.trim(kv[1]), ' ', 1);
            }
            else{
              obj[kv[0]] = _.trim(kv[1]);
            }
          })
        }
        return obj
    }
}

function whiteListProps(props, type){
  var str = '';
  for (var item in props){
    switch (item) {
      case 'div':
        break;
      default:
        if (whiteListPropsAry.indexOf(item)>-1){
          str += ' '+item+'="'+props[item]+'"';
        }
    }
  }
  return str;
}

render.link = function(href, title, text) {
  var config = {}
  var id = ""
  var cls = ""

  if (this.options.sanitize) {
    try {
      var prot = decodeURIComponent(unescape(href))
        .replace(/[^\w:]/g, '')
        .toLowerCase();
    } catch (e) {
      return '';
    }
    if (prot.indexOf('javascript:') === 0 || prot.indexOf('vbscript:') === 0) {
      return '';
    }
  }

  if (title) {
      if (title.indexOf(' {')>-1){
          var rtn = customParse(title)
          title = rtn[0]
          config = rtn[1]
      }
      else {
          config={}
      }
  }

  var out = '<a'+ whiteListProps(config) +' href="' + href + '"';

  if (title) {
    out += ' title="' + title + '"';
  }
  out += '>' + text + '</a>';
  return out;
};

render.hr = function() {
  return this.options.xhtml ? '<hr/>\n' : '<hr>\n';
};

render.image = function(href, title, text) {
  var config = {}
  var id = ""
  var cls = ""

  // if (title) {
  //     config = title.match(/ \{(.*)\}/g)
  //     if (config){
  //         title = title.replace(/ \{(.*)\}/g, '')
  //         var tmp = _.unescape(config[0])
  //         config = JSON.parse(tmp)
  //     }
  //     else {
  //         config={}
  //     }
  // }

  if (title) {
      if (title.indexOf(' {')>-1){
          var rtn = customParse(title)
          title = rtn[0]
          config = rtn[1]
      }
      else {
          config={}
      }
  }

  var out = '<img' + whiteListProps(config) + ' src="' + href + '" alt="' + text + '"';
  if (title) {
    out += ' title="' + title + '"';
  }
  out += this.options.xhtml ? '/>' : '>';
  return out;
};

render.heading = function (text, level, raw) {
    // var config = raw.match(/ \{(.*)\}/g)
    // if (config){
    //     text = text.replace(/ \{(.*)\}/g, '')
    //     config = JSON.parse(config[0])
    // }
    // else {
    //     config = {}
    // }

    // 官方
    // Renderer.prototype.heading = function(text, level, raw) {
    //   return '<h'
    //     + level
    //     + ' id="'
    //     + this.options.headerPrefix
    //     + raw.toLowerCase().replace(/[^\w]+/g, '-')
    //     + '">'
    //     + text
    //     + '</h'
    //     + level
    //     + '>\n';
    // };

    var config={};

    if (raw) {
        if (raw.indexOf(' {')>-1){
            var rtn = customParse(raw)
            text = rtn[0]
            config = rtn[1]
        }
        else {
            config={}
        }
    }

    // var id = config.id || this.options.headerPrefix + raw.toLowerCase().replace(/[^\\w]+/g, '-')
    var id;
    if (/[\u4e00-\u9fa5]/g.test(raw)){
        id = config.id || _.uniqueId('fkp-')
    }
    else {
        id = config.id || this.options.headerPrefix + raw.toLowerCase().replace(/[^\\w]+/g, '-')
    }
    if (!id || id==='-'){
        id=_.uniqueId('fkp-');
    }

    var cls = config.class ? ' class="'+config.class+'"' : ''
    return '<h' + level + ' id="' + id + '"' + cls + '>' + text + '</h' + level + '>';
}

render.listitem = function(text) {
    var id='';
    var cls='';
    var config;

    if (text) {
        if (text.indexOf(' {')>-1){
            var rtn = customParse(text)
            text = rtn[0]
            config = rtn[1]
        }
        else {
            config={}
        }
    }

    var ckboxStr = '';
    if (text.indexOf('[]')===0){
      text = text.replace('[]','');
      ckboxStr = '<input type="checkbox">';
    }
    if (text.indexOf('[x]')===0){
      text = text.replace('[x]','');
      ckboxStr = '<input type="checkbox" checked>';
    }

    return '<li' + whiteListProps(config) +'>' + ckboxStr + text + '</li>\n';
};

render.list = function (body, ordered) {
    var asset = {}
    var id='';
    var cls='';

    // body = _.unescape(body)
    // var config = body.match(/<li>(\{.*?\})<\/li>([\s]*)?/)
    //
    // if (config && config.length) {
    //     body = body.replace(config[0],'')
    //     asset = JSON.parse(config[1])
    // }


    if (body) {
        if (body.indexOf('<li>{')>-1){
            var rtn = customParse(body, 'ul')
            body = rtn[0]
            asset = rtn[1]
        }
        else {
            asset={}
        }
    }

    var type = ordered ? 'ol' : 'ul';
    var template = '';

    if (asset.div){
      template = '<' + type +'>' + body + '</' + type + '>';
      if (body){
        template = '<div '+ whiteListProps(asset, 'ul') +'>' + template + '</div>';
      }
      else {
        template = '<div '+ whiteListProps(asset, 'ul') +'></div>';
      }
      return template;

    }
    else if(asset.excute){
      if (_.has(Excute, asset.excute)){
        let _id = _.uniqueId('excute')
        let tmp = {}
        tmp[_id] = Excute[asset.excute]
        SAX.append('Excute', tmp)
        template = '<div '+ whiteListProps(asset, 'ul') +'>~~'+_id+'~~</div>';
        return template
      }
    }
    else {
      template = '<' + type + whiteListProps(asset) +'>' + body + '</' + type + '>';
      return template;

    }

}


module.exports = render;
