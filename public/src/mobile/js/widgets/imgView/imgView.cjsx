###
# imgView.
# @author remiel.
# @module imgView
# @example imgView
#
#   jsx:
#   <imgView extClass callback></imgView>
#
# @param options {Object} the options
# @option extClass {String} add a class to the wrapper for style
# @option onLoadCallback {Function} 
#
###

ImgView = React.createClass
    propTypes:
        extClass: React.PropTypes.string
        onLoadCallback: React.PropTypes.func

    getInitialState: ->
        # console.log 'getInitialState~', @props
        {}

    componentDidMount: ->
        # console.log 'componentDidMount~'
        @img = @refs.img.getDOMNode()

        if @img.complete
            @handleLoaded()
        else
            @img.onload = =>
                @handleLoaded()

    handleLoaded: () ->
        # console.log onLoad
        @width = @img.width
        @height = @img.height
        @props.onLoadCallback.call @, @img if typeof @props.onLoadCallback is 'function'


    render: ->
        # console.log 'render~', @props
        cx = React.addons.classSet
        extClass = if @props.extClass then @props.extClass else ''
        classes = cx('ui-img-view', extClass);

        <img
            ref='img'
            className={classes}
            {...this.props}
        />

module.exports = ImgView
