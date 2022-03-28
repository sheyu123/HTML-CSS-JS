//引入文件

//模块引入
import * as m1 from './m1.js';
import * as m2 from './m2.js';
import * as m3 from './m3.js';

/* console.log(m1);
console.log(m2);
console.log(m3); */

//改变方法时需要重新封装和打包
/* m1.fn();
m2.fn();
m3.default.change(); */

//修改背景颜色
import $ from 'jquery'//const $ = require('jquery')
$('body').css('background','pink');