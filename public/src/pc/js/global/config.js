;(function(){

    if (window.ReactDOM){
        React.render = ReactDOM.render;
        React.unmountComponentAtNode = ReactDOM.unmountComponentAtNode;
        React.findDOMNode = ReactDOM.findDOMNode;
    }

})();
