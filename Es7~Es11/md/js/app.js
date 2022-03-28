//默认引入
// import * as m1 from './hello.js';

//获取button
const ipt = document.querySelector('button');
//注册事件
ipt.addEventListener('click',function(){
    //弹出事件
    // m1.fn();

    //动态import (返回一个promise对象)
    import('./hello.js').then(value =>{
        //调用方法弹出hello
        value.fn();
    })

});