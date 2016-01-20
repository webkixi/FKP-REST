var marked = require('marked')
var render = new marked.Renderer();
var libs = require('../../libs/libs')
var _ = libs.$lodash;

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
      config = title.match(/ \{(.*)\}/g)
      if (config){
          title = title.replace(/ \{(.*)\}/g, '')
          var tmp = _.unescape(config[0])
          config = JSON.parse(tmp)
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

  if (title) {
      config = title.match(/ \{(.*)\}/g)
      if (config){
          title = title.replace(/ \{(.*)\}/g, '')
          var tmp = _.unescape(config[0])
          config = JSON.parse(tmp)
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
    var config = raw.match(/ \{(.*)\}/g)
    if (config){
        text = text.replace(/ \{(.*)\}/g, '')
        config = JSON.parse(config[0])
    }
    else {
        config = {}
    }

    var id = config.id || this.options.headerPrefix + raw.toLowerCase().replace(/[^\\w]+/g, '-')
    var cls = config.class ? ' class='+config.class : ''
    return '<h' + level + ' id="' + id + '"' + cls + '>' + text + '</h' + level + '>';
}

render.listitem = function(text) {
    var id='';
    var cls='';
    var config = text.match(/ \{(.*)\}/g)
    if (config){
        text = text.replace(/ \{(.*)\}/g, '')
        var tmp = _.unescape(config[0])
        config = JSON.parse(tmp)
    }
    else {
        config = {}
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

    body = _.unescape(body)
    var config = body.match(/<li>(\{.*?\})<\/li>([\s]*)?/)
    // var config = body.match(/\* (\{.*?\})([\s]*)/)

    // [
    //     '* {"id":"list","class":"list"}  \n',
    //     '{"id":"list","class":"list"}',
    //     '  \n',
    //     index: 0,
    //     input: '* {"id":"list","class":"list"}  \n* abc  \n* ccc  '
    // ]

    if (config && config.length) {
        body = body.replace(config[0],'')
        asset = JSON.parse(config[1])
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
