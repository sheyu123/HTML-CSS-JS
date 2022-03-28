//引入fs 模块
const fs = require('fs');

//封装三个文件
function fn1() {
    //返回promise 结果
    return new Promise((resolve, reject) => {
        //调用读取文件方法
        fs.readFile('./md/为学.md', (err, data) => {
            if (err) reject(err);
            resolve(data);
        });
    });
}
function fn2() {
    //返回promise 结果
    return new Promise((resolve, reject) => {
        //调用读取文件方法
        fs.readFile('./md/黄鹤楼.md', (err, data) => {
            if (err) reject(err);
            resolve(data);
        });
    });
}
function fn3() {
    //返回promise 结果
    return new Promise((resolve, reject) => {
        //调用读取文件方法
        fs.readFile('./md/春1望.md', (err, data) => {
            if (err) reject(err);
            resolve(data);
        });
    });
}

//创建async 函数
async function str() {
        //利用await 表达式获取promise的返回值
        let s1 = await fn1();
        let s2 = await fn2();
        let s3 = await fn3();
        console.log(`${s1.toString()}\n`);
        console.log(`${s2.toString()}\n`);
        console.log(`${s3.toString()}\n`);
}
//调用函数
str();