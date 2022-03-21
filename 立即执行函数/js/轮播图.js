window.addEventListener('load', function () {


    var box = document.querySelector('.box'); //显示窗口
    var lefts = document.querySelector('.lefts'); //左按钮
    var rights = document.querySelector('.rights'); //右按钮
    var ol = document.querySelector('.ols'); //ol
    var ul = box.querySelector('ul');//ul

    //1.移入显示窗口 box 时显示左右按钮
    box.addEventListener('mouseenter', function () {
        lefts.style.display = 'block';
        rights.style.display = 'block';
        //鼠标移入时清除定时器
        clearInterval(timer);
        timer = null; //清除定时变量
    });

    //1.1.移出显示窗口 box 时隐藏左右按钮
    box.addEventListener('mouseleave', function () {
        lefts.style.display = 'none';
        rights.style.display = 'none';

        //鼠标移出时启动定时器
        timer = setInterval(function () {
            rights.click(); //直接调用右按钮的方法，不用点击直接启动
        }, 2000); //每两秒调用一次

    });

    //1.2 动态生成小圆点（小圆点的数量是根据图片来决定的）

    for (var i = 0; i < ul.children.length; i++) {
        var li = document.createElement('li'); //创建元素li 标签
        //给每个li 给一个自定义属性index
        li.setAttribute('index', i);
        //将li 添加到ol 中
        ol.appendChild(li);

        //给每个新增的li 添加一个点击事件
        li.addEventListener('click', function () {
            //清除所有li的背景样式
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            this.className = 'black' //点击当前li 就获得样式

            var indexs = this.getAttribute('index'); //一定要写this
            //引入动画js 的方法
            animation(ul, -indexs * box.offsetWidth);

            num = indexs; //将点击小圆点的值赋值给num
            circle = indexs; //将点击小圆点的值赋值给num

        });
    }
    ol.children[0].className = 'black'; //默认第一个有背景颜色

    //3.0 克隆第一张图片用于前后交换
    var liss = ul.children[0].cloneNode(true); //由于是在创建li 标签后，所以不会产生圆点
    ul.appendChild(liss);

    //2. 给右侧按钮添加点击事件(移动的是ul，所以ul需要有定位来移动)
    var num = 0; //计数器
    var circle = 0; //圆点的计数器
    var flag = true; //设置节流阀
    rights.addEventListener('click', function () {
        if (flag) {
            flag = false; //进入后关闭节流阀
            //当移动到最后一张时，点击按钮立马回到第一张
            if (num == ul.children.length - 1) {
                ul.style.left = 0 + 'px'; // left清零
                num = 0;
            }
            num++;
            //引入动画js 的方法
            animation(ul, -num * box.offsetWidth,function(){
                flag = true; //通过回调函数控制节流阀
            });

            circle++;
            if (circle == ol.children.length) {
                circle = 0
            }
            //调用方法  --------------注意：一定要等circle 的值计算出来后才能调用方法
            getCircle();
            console.log(circle);
        }


    });
    //2. 给左侧按钮添加点击事件(移动的是ul，所以ul需要有定位来移动)
    lefts.addEventListener('click', function () {

        if (flag) {
            flag = false; //进入后关闭节流阀
            //当移动到最后一张时，点击按钮立马回到第一张
            if (num == 0) {
                num = ul.children.length - 1// left清零 num = 4
                ul.style.left = -num * box.offsetWidth + 'px'; //跳到倒数第二张
            }
            num--;
            console.log(num);
            //引入动画js 的方法
            animation(ul, -num * box.offsetWidth,function(){
                flag = true; //通过回调函数控制节流阀
            });

            circle--;
            // console.log(circle); // -1
            if (circle < 0) {
                //circle 等于 圆点的个数减1 ，直接跳到倒数第三张
                circle = ol.children.length - 1;
            }
            //调用方法 --------------注意：一定要等circle 的值计算出来后才能调用方法
            getCircle();
        }

    });

    //优化代码
    function getCircle() {
        //清除所有li的背景样式
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        ol.children[circle].className = 'black'; //让圆点背景随着右侧按钮点击发生变化
    }


    //添加定时器
    var timer = setInterval(function () {
        rights.click(); //直接调用右按钮的方法，不用点击直接启动
    }, 2000); //每两秒调用一次
})