//引入
const fs = require('fs');

//调用读取文件的方法
/* fs.readFile('../md/为学.md',function(err,data){
    //文件读取失败
    if(err) throw err;
    //文件读取成功
    console.log(data.toString());
});
 */

//利用promise构造函数封装
const p = new Promise(function(resolve,reject){
    fs.readFile('../md/为学.md',(err,data) =>{
        if(err) reject(err);
        resolve(data);
    });
});

//调用promise 方法
p.then(function(value){
    console.log(value.toString());
},function(reason){
    console.log(reason);
});