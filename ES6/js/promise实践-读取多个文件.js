//引入fs模块
const fs = require('fs');

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
const p = new Promise(function (resolve, reject) {
    fs.readFile('../md/为学.md', (err, data) => {
        resolve(data);
    });
});

p.then(function (value) {
    return new Promise((resolve, reject) => {
        fs.readFile('../md/春望.md', (err,data) => {
            resolve([value,data]);
        });
    });
}).then(value =>{
    return new Promise(function(resolve,reject){
        fs.readFile('../md/黄鹤楼.md',(err,data) =>{
            value.push(data);
            resolve(value);
        })
    });
}).then(value =>{
    console.log(value.join('\t\n'));
})