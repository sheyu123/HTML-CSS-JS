window.addEventListener('load', function () {
    //获取事件源
    var foucs = document.querySelector('.foucs');//foucs
    var ul = foucs.querySelector('ul'); //ul

    var ol = foucs.children[1];

    //获取foucs的offsetWidth
    var foucsWidth = foucs.offsetWidth;


    //开启定时器
    var num = 0;
    var timer = setInterval(function () {
        num++; //计数器
        var translatex = -num * foucsWidth;
        
        ul.style.transition = 'all .3s';
        // ul.style.left = num * -foucsWidth +'px';
        ul.style.transform = 'translateX(' + translatex + 'px)'

    }, 2000);

    //动画过渡完成后移动图片
    ul.addEventListener('transitionend', function () {
        if (num >= 3) {
            num = 0;
            ul.style.transition = 'none'; //到达最后一张时清楚过渡属性
            var translatex = -num * foucsWidth; //获得最新的索引号 * 宽度来滚动图片
            ul.style.transform = 'translateX(' + translatex + 'px)';
        } else if (num < 0) {
            num = 2;
            ul.style.transition = 'none'; //到达最后一张时清楚过渡属性
            var translatex = -num * foucsWidth; //获得最新的索引号 * 宽度来滚动图片
            ul.style.transform = 'translateX(' + translatex + 'px)';
        }

        ol.querySelector('.current').classList.remove('current'); //删除li中的 current 类
        ol.children[num].classList.add('current');

    });

    //鼠标拖动事件
    var startX = 0; //初始
    var moveX = 0; //移动后
    var flag = false; //判断用户是否移动
    // 触摸事件
    ul.addEventListener('touchstart', function (e) {
        clearInterval(timer);//停止定时器
        startX = e.targetTouches[0].pageX;//获得初始坐标
    });

    //移动事件
    ul.addEventListener('touchmove', function (e) {
        moveX = e.targetTouches[0].pageX - startX;

        //移动盒子：盒子原来距离 + 手指一动距离 
        var translatex = -num * foucsWidth + moveX;
        ul.style.transition = 'none';
        ul.style.transform = 'translateX(' + translatex + 'px)';
        flag = true;
        e.preventDefault();//组织滚动屏幕的行为
    });
    //离开事件
    ul.addEventListener('touchend', function (e) {
        if(flag){
            if (Math.abs(moveX) > 50) {
                //当moveX 为正值时向左移动
                if (moveX > 0) {
                    num--;
                } else {
                    num++;
                }
                var translatex = -num * foucsWidth;
                ul.style.transition = 'all .3s';
                ul.style.transform = 'translateX(' + translatex + 'px)';
            } else {
                var translatex = -num * foucsWidth;
                ul.style.transition = 'all .1s';
                ul.style.transform = 'translateX(' + translatex + 'px)';
            } 
        }

        //清除定时器
        clearInterval(timer);
        //开启定时器
        timer = setInterval(function () {
            num++; //计数器
            var translatex = -num * foucsWidth;
            
            ul.style.transition = 'all .3s';
            // ul.style.left = num * -foucsWidth +'px';
            ul.style.transform = 'translateX(' + translatex + 'px)'

        }, 2000);
    });


})