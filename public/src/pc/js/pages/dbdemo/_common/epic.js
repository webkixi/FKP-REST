var libs = require('libs/libs')
var uploader = require('modules/upload/index')


function epiceditor(options){

    if ($('#epic').length){
      dealWithEditor(options)
    }
    else {
      libs.inject()
      .js(['/js/t/epic/js/epiceditor.js', 'epic'], initEpicEditor)
      // .css(['/css/t/simplemde.css', 'simplemdecss'])
    }


    function initEpicEditor(){
        if (!window._epic_ed){
            // 编辑器初始化
            var opts = {
                container: 'epiceditor',
                textarea: null,
                basePath: '/js/t/epic',
                clientSideStorage: true,
                localStorageName: 'epiceditor',
                useNativeFullscreen: true,
                parser: marked,
                file: {
                    name: 'epiceditor',
                    defaultContent: '',
                    autoSave: 100
                },
                theme: {
                    base: '/themes/base/epiceditor.css',
                    preview: '/themes/preview/bartik.css',
                    editor: '/themes/editor/epic-light.css'
                },
                button: {
                    preview: true,
                    fullscreen: true,
                    bar: "show"
                },
                focusOnLoad: false,
                shortcut: {
                    modifier: 18,
                    fullscreen: 70,
                    preview: 80
                },
                string: {
                    togglePreview: 'Toggle Preview Mode',
                    toggleEdit: 'Toggle Edit Mode',
                    toggleFullscreen: 'Enter Fullscreen'
                },
                autogrow: false
            }

            var editor = new EpicEditor(opts).load();
            editor.reflow()
            var find = function(name){
                return editor.getElement(name);
            }

            var iframeDoc = find('editor')

            libs.inject(iframeDoc)
            .js(['/js/t/epic/js/test.js', 'iframeEditor'])

            var ed = {
                editor: editor,
                find: find
            }
            window._epic_ed = ed
            dealWithEditor.call(ed, options)
        }
        else {
            dealWithEditor.call(window._epic_ed, options)
        }

    }

    //编辑器处理
    function dealWithEditor(options){
        var stat_editor = 'add';
        var editor = this.editor;
        var find = this.find;


        var utilbar = $(find('epiceditor-utilbar'));  //工具栏
        var ed = $(find('editor'))
        var wrap = $(find('editorIframe'))

        if (options && options.content && options._id){
          // window.localStorage.setItem('_tmp', options.content)
          // editor.open('_tmp')
          stat_editor = 'edit'
          editor.open('clear')
          editor.importFile('_tmp',options.content)
        }

        //工具条按钮
        //自定义按钮
        if (!$(find('clear_btn')).length){
            $(utilbar).append('<button class="btn" id="clear_btn">清空</button>')
            $(utilbar).append('<button class="btn" id="add_pic_btn">插图</button>')
            $(utilbar).append('<button class="btn add" id="add_md_btn">添加</button>')

            if (stat_editor === 'add'){
              $(find('add_md_btn')).text('添加')
            }
            if (stat_editor === 'edit'){
              $(find('add_md_btn')).text('修改')
            }

            // ========== 添加文章
            //自定义按钮方法
            $(find('clear_btn')).click(function(){
              editor.open('clear')
            })

            // ========== 上传组件
            //使用自定义的样式上传
            uploader.custom(
              // 促发上传
              function(){
                var me = this;
                $(find('add_pic_btn')).click(function(e){
                  me.trigger('upfile')
                })
              },

              //上传成功后的回调
              function(file, ret){
                libs.msgtips('上传完成')
                editor.focus()
                //在光标处插入文本
                libs.insertCaret(wrap[0].contentWindow, '!['+file.name+'](/uploader/'+ret.message+')')
              }
            )
          }
          else{
            if (stat_editor === 'add'){
              $(find('add_md_btn')).text('添加')
            }
            if (stat_editor === 'edit'){
              $(find('add_md_btn')).text('修改')
            }
          }

          // ========== 添加文章
          //自定义按钮方法
          $(find('add_md_btn')).off('click').click(function(){
            var cnt = JSON.parse(editor.exportFile(null,'json'))
            cnt.content = cnt.content.replace(/\/uploader/g, 'http://www.agzgz.com/uploader')
            if (stat_editor === 'add'){
                $('body').trigger('addTopic', {cnt: cnt.content, editor: editor})
            }
            if (stat_editor === 'edit'){
                $('body').trigger('addTopic', {cnt: cnt.content, editor: editor, upid: options._id})
            }
          })

          // 便捷区域的body的paddingBottom为30px；
          // 空出utilbar空间，以免遮挡
          ed[0].body.style.paddingBottom = '20px'
      }
}

function dealWith_epic(opts){
    epiceditor(opts)
}


module.exports = dealWith_epic
