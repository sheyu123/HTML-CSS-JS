
    function animation(obj, target, callblack) { //callbakc (传入的回调函数)

        clearInterval(obj.timer); //进入方法前先清除所有定时器（类似排他思想）

        //obb.timer 相当于 对象.属性名 var num = {} ; num.name = '好运来';
        obj.timer = setInterval(function () { //每50毫秒移动一次

            //var  setTime = Math.ceil((target - obj.offsetLeft)/10); //每次都需要获得obj.offsetLeft的值，所以需要写在里面 (目标位置 - 现在的位置) / 任意数
            var setTime = (target - obj.offsetLeft) / 10;
            setTime = setTime > 0 ? Math.ceil(setTime) : Math.floor(setTime); //需要向上或向下取整

            //当offsetLeft大于 target 时清除定时器
            if (obj.offsetLeft == target) {
                clearInterval(obj.timer);

                //回调函数需要在清除定时器后使用
                if (callblack) {   //判断是否有回调函数传入
                    callblack();
                }

            } else {
                obj.style.left = obj.offsetLeft + setTime + 'px'; //赋值给left
            }
        }, 15)
    }

    
