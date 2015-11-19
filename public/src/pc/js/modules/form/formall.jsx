var Textarea = require('./_component/_textarea')()
var Select = require('./_component/_select')()
var Text = require('./_component/_text')()
var Date = require('./_component/_date')()
var Number = require('./_component/_number')()
var Checkbox = require('./_component/_checkbox')()
var Radio = require('./_component/_radio')()

libs.addSheet([
    '/css/t/ui/form.css'
    ,'formform'
])

module.exports = {
    select: Select,
    text: Text,
    date: Date,
    number: Number,
    textarea: Textarea,
    checkbox: Checkbox,
    radio: Radio
}
