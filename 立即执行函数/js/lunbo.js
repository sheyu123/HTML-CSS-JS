window.addEventListener('load', function () {
    //获得事件源
    var box = document.querySelector('.box');//大窗口
    var lefts = document.querySelector('.lefts');//左按钮
    var rights = document.querySelector('.rights');//右按钮
    var ul = box.querySelector('ul');//ul
    var ol = box.querySelector('.ols');//ol

    //1.鼠标移入 box 时显示左右按钮
    box.addEventListener('mouseenter', function () {
        lefts.style.display = 'block';
        rights.style.display = 'block';
        //鼠标移入时清除定时器
        clearInterval(timers);
        timer = null; //清除定时变量
    });
    //1.1.鼠标移出 box 时隐藏左右按钮
    box.addEventListener('mouseleave', function () {
        lefts.style.display = 'none';
        rights.style.display = 'none';
        //鼠标移出时开启定时器
        timers = setInterval(function () {
            rights.click();//调用后自动启动右按钮点击事件
        }, 2000);
    });

    //2.动态生成小圆点(小圆点的数量是与图片对应)
    // 循环ul 的子元素img
    for (var i = 0; i < ul.children.length; i++) {
        //通过createElement  创建li标签
        var li = document.createElement('li');
        //给 li 添加自定义属性 index
        li.setAttribute('index', i);
        //给ol 添加子元素 li
        ol.appendChild(li);


        //给创建的每个li 创建一个点击事件(异步任务)
        li.addEventListener('click', function () {
            //利用排他思想
            for (var i = 0; i < ol.children.length; i++) {
                //清除所有li 的className
                ol.children[i].className = '';
            }

            //点击当前按钮，按钮就添加样式变色
            this.className = 'black';
            //获得自定义属性index
            var index = this.getAttribute('index');
            // console.log(index);
            animation(ul, -index * box.offsetWidth)

            num = index;
            circle = index;
        });
    }

    //默认给第一个li 添加 className = 'black';
    ol.children[0].className = 'black';

    //2.1 克隆第一个ul的子元素
    var lis = ul.children[0].cloneNode(true);
    ul.appendChild(lis);


    //3.给右按钮添加点击事件
    var num = 0;
    var circle = 0;//小圆点计数器
    var flag = true; //设置节流阀
    rights.addEventListener('click', function () {

        if (flag) {
            flag = false; //进入后关闭节流阀

            //当计数器等于图片长度减 1 时，立马回到前面
            if (num == ul.children.length - 1) {
                //回到起点
                ul.style.left = 0 + 'px';
                num = 0;
            }
            num++;
            console.log(num);
            animation(ul, num * -box.offsetWidth, function () {
                flag = true; //利用回调函数控制节流阀
            });


            //小圆点计数器
            circle++;
            //当计数器等于小圆点的长度时，计数器恢复0
            if (circle == ol.children.length) {
                circle = 0;
            }

            //调用方法
            getTimers();
        }

    });

    //4.给左按钮添加点击事件
    lefts.addEventListener('click', function () {

        if (flag) {
            flag = false; //进入后关闭节流阀
            if (num == 0) {
                num = ul.children.length - 1;
                //回到起点
                ul.style.left = -num * box.offsetWidth + 'px';
            }
            num--;

            animation(ul, num * -box.offsetWidth, function () {
                flag = true; //利用回调函数控制节流阀
            });


            //小圆点计数器
            circle--;
            //当计数器等于小圆点的长度时，计数器恢复0
            if (circle < 0) {
                circle = ol.children.length - 1;
            }

            //调用方法
            getTimers();
        }
    });

    function getTimers() {
        //利用排他思想
        for (var i = 0; i < ol.children.length; i++) {
            //清除所有li 的className
            ol.children[i].className = '';
            ol.children[circle].className = 'black';
        }
    }

    //定时器
    var timers = setInterval(function () {
        rights.click();//调用后自动启动右按钮点击事件
    }, 2000);

});