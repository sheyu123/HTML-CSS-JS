DOM 事件流
事件发生时会在元素节点之间按照特定的顺序传播，这个传播过程即DOM事件流。

1. Js 代码中只能执行捕获或者冒泡其中的一个阶段。

2. onclick 和attachEvent只能得到冒泡阶段。

3. addEventListener(type, listener[, usecapture])第三个参数如果是true，表示在事件捕获阶段调用事件处理程序;
如果是false(不写默认就是false )，表示在事件冒泡阶段调用事件处理程序。

4. 实际开发中我们很少使用事件捕获，我们更关注事件冒泡。

5. 有些事件是没有冒泡的，比如onblur、onfocus、onmouseenter、onmouseleave