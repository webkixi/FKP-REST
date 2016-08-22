# FKP大单页架构
之前开发过一年左右的android，将其中一部分概念挪移到FKP大单页系统中当中了。两个部分；  

![app](/images/demo/cat.gif)

1. 一次性载入  
所有页面一次性载入，再由fkp-router来控制显示活动页，页面由`page`模块控制，FKP有自有的`FKP-PAGES`模块（概念来自angular）  

2. 转页传递数据  
在android中，可以通过intent在页面间传递数据，通过FKP-ROUTER配合FKP-PAGE，我们在FKP单页开发中也可以使用类似的方法  
通过`router('xxx', data)`这样，将数据带入到下一个页面，并在page模块的`end`生命周期方法中做一些销毁处理。这样可以更加灵活的处理异步数据
