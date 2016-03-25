var libs = require('libs/libs')
var uploader = require('modules/upload/index')


function epiceditor(opts){

    libs.inject()
    .js(['/js/t/epic/js/epiceditor.js', 'epic'], initEpicEditor)
    // .css(['/css/t/simplemde.css', 'simplemdecss'])

    // 编辑器初始化
    function initEpicEditor(){
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
                bar: "auto"
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

        iframeDoc = find('editor')

        libs.inject(iframeDoc)
        .js(['/js/t/epic/js/test.js', 'iframeEditor'])



        var ed = {
            editor: editor,
            find: find
        }

        dealWithEditor.call(ed)
    }

    //编辑器处理
    function dealWithEditor(){
        var editor = this.editor;
        var find = this.find;

        var utilbar = $(find('epiceditor-utilbar'));  //工具栏
        var ed = $(find('editor'))
        var wrap = $(find('editorIframe'))

        //工具条按钮
        //自定义按钮
        $(utilbar).append('<button class="btn" id="clear_btn">清空</button>')
        $(utilbar).append('<button class="btn" id="add_md_btn">添加</button>')
        $(utilbar).append('<button class="btn" id="add_pic_btn">插图</button>')

        //自定义按钮方法
        // ========== 添加文章
        $(find('clear_btn')).click(function(){
            editor.open('clear')
        })

        //自定义按钮方法
        // ========== 添加文章
        $(find('add_md_btn')).click(function(){
            var cnt = JSON.parse(editor.exportFile(null,'json'))
            // var ddd = submitContent(cnt.content, editor)
            $('body').trigger('addTopic', {cnt: cnt.content, editor: editor})
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
}

function dealWith_epic(opts){
    epiceditor(opts)
}


module.exports = dealWith_epic
