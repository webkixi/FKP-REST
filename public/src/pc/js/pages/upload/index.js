var libs = require('libs/libs')
var Uploader = require('modules/upload/upload1')

React.render(
    <Uploader btn={'pic1'} type={1} cb={ccb}/>,
    document.getElementById('testupload')
)

function ccb(){
    console.log('hhhhhhh');
}
