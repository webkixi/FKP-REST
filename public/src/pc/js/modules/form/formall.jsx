var Textarea = require('./_component/_textarea')()
var Select = require('./_component/_select')()
var Text = require('./_component/_text')()
var Checkbox = require('./_component/_checkbox')()

libs.addSheet([
    '/css/t/ui/form.css'
    ,'formform'
])

module.exports = {
    select: Select,
    text: Text,
    textarea: Textarea,
    checkbox: Checkbox
}
