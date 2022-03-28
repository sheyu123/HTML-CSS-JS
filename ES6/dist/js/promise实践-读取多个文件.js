'use strict';

//引入fs模块
var fs = require('fs');

//读取文件(回调地狱)
/* fs.readFile('../md/为学.md',(err1,data1) =>{
    fs.readFile('../md/黄鹤楼.md',(err2,data2) =>{
        fs.readFile('../md/春望.md',(err3,data3) =>{
            let result = data1+'\r\n'+data2+'\r\n'+data3;
            console.log(result.toString());
        });
    });
}); */

//promise封装读取多个文件
var p = new Promise(function (resolve, reject) {
    fs.readFile('../md/为学.md', function (err, data) {
        resolve(data);
    });
});

p.then(function (value) {
    return new Promise(function (resolve, reject) {
        fs.readFile('../md/春望.md', function (err, data) {
            resolve([value, data]);
        });
    });
}).then(function (value) {
    return new Promise(function (resolve, reject) {
        fs.readFile('../md/黄鹤楼.md', function (err, data) {
            value.push(data);
            resolve(value);
        });
    });
}).then(function (value) {
    console.log(value.join('\t\n'));
});