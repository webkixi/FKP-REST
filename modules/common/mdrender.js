/**
 * markdown的扩展
 * 支持 link，img等等
*/
var marked = require('marked')
var render = new marked.Renderer();
var libs = require('../../libs/libs')

function customParse(str, spec){
    console.log('============ modules/common/mdrender.js\n');
    var re = /[\s]?\{(.*?)\}/;
    var re_g = / \{(.*)\}/g;
    var re_g_li = /<li>(\{.*?\})\s*<\/li>\s*/;

    var tmp_str = str;

    if (spec==='li'){
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

        var key,val,obj;
        var tmp = _str.match(re)   // "fjdskg  {abc: xxx} {xyz: yyy}"

        _str = _.trim(tmp[0])   // " {abc: xxx}" => "{abc: xxx}"
        _str = _str.replace('{','').replace('}','')   //"{abc: xxx}"=>abc: xxx
        if (_str.indexOf(':')>-1){
            obj = {}
            if (_str.indexOf(',')>-1){
                var tmp_ary = _str.split(',');
                tmp_ary.map(function(item, i){
                    if (item.indexOf(':')){
                        var tmp = item.split(':')
                        obj[_.trim(_.escape(tmp[0]))] = _.trim(_.escape(tmp[1]));
                    }
                })
            }
            else{
                var tmp = _str.split(':')
                obj[_.trim(_.escape(tmp[0]))] = _.trim(_.escape(tmp[1]));    //obj = {abc: xxx}对象
            }
        }

        if (!obj) obj = {}

        return obj
    }

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

  if (config.id) {
      id = " id=" + config.id
  }

  if (config.class) {
      cls = " class=" + config.class
  }

  var out = '<a'+ id + cls +' href="' + href + '"';

  if (title) {
    out += ' title="' + title + '"';
  }
  out += '>' + text + '</a>';
  return out;
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

  if (config.id) {
      id = " id=" + config.id
  }

  if (config.class) {
      cls = " class=" + config.class
  }

  var out = '<img' + id + cls + ' src="' + href + '" alt="' + text + '"';
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

    var config;

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

    var id = config.id || this.options.headerPrefix + raw.toLowerCase().replace(/[^\\w]+/g, '-')
    var cls = config.class ? ' class='+config.class : ''
    return '<h' + level + ' id="' + id + '"' + cls + '>' + text + '</h' + level + '>';
}

render.listitem = function(text) {
    var id='';
    var cls='';
    var config;

    // var config = text.match(/ \{(.*)\}/g)
    // if (config){
    //     text = text.replace(/ \{(.*)\}/g, '')
    //     var tmp = _.unescape(config[0])
    //     config = JSON.parse(tmp)
    // }
    // else {
    //     config = {}
    // }

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

    if (config.id) {
        id = ' id=' + config.id
    }
    if (config.class) {
        cls = ' class=' + config.class
    }
  return '<li' + id + cls +'>' + text + '</li>\n';
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
            var rtn = customParse(body, 'li')
            body = rtn[0]
            asset = rtn[1]
        }
        else {
            asset={}
        }
    }

    if (asset.id) {
        id = ' id=' + asset.id
    }

    if (asset.class) {
        cls = ' class=' + asset.class
    }

    var type = ordered ? 'ol' : 'ul';
    return '<' + type + id + cls +'>' + body + '</' + type + '>';
}


module.exports = render;
