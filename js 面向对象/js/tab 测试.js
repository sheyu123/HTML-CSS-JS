var that; //全局变量
class Main {
    constructor(id) {
        that = this;
        //获取事件源
        this.main = document.querySelector(id); //<div class="tabsbox" id="tab">


        this.add = this.main.querySelector('.tabadd')//添加按钮
        this.ul = this.main.querySelector('.fisrstnav ul')//ul
        this.tabcon = this.main.querySelector('.tabscon');//tabscon
        // console.log(this.ul);

        //调用init方法
        this.init();
    }
    //初始化事件源
    init() {

        //更新样式
        this.update();

        // 给添加按钮增加点击事件
        this.add.onclick = this.addTab;

        //遍历li的集合
        for (var i = 0; i < this.lis.length; i++) {
            //给每个li 设置index
            this.lis[i].index = i;
            //给所有lis 绑定点击事件
            this.lis[i].onclick = this.tabggleTab;
            //给所有删除按钮绑点击事件
            this.removes[i].onclick = this.removeTab;
            //给所有span 添加双击事件
            this.spans[i].ondblclick = this.modify;

        }
    }

    // 更新样式
    update() {
        this.lis = this.main.querySelectorAll('.fisrstnav ul li');//li 的集合
        this.sections = this.main.querySelectorAll('section');//section 的集合
        this.removes = this.main.querySelectorAll('.icon-guanbi');//删除按钮
        this.spans = this.main.querySelectorAll('.fisrstnav li span:first-child');//li下的所有第一个span

    }

    //添加样式
    tabggleTab() {

        //排他样式
        that.eliminate();

        //给点击的li 添加class 样式
        this.className = 'liactive';
        //获得当前的index
        var index = this.index;
        
        that.sections[index].className = 'conactive';
    }


    //排他样式
    eliminate() {
        //lis循环清除所有样式
        for (var i = 0; i < this.lis.length; i++) {
            this.lis[i].className = '';
        }

        //sections循环清除所有样式
        for (var i = 0; i < this.sections.length; i++) {
            this.sections[i].className = '';
        }
    }

    //添加事件
    addTab() {

        //排他样式
        that.eliminate();
        //创建li 元素 插入ul 元素的最后面

        /*  var li = document.createElement('li');
         li.innerHTML = '<span>测试1</span><span class="iconfont icon-guanbi"></span>';
         var lis = that.ul.appendChild(li); */
        //随机数生成
        var random = Math.random();
        var li = '<li class="liactive"><span>测试1</span><span class="iconfont icon-guanbi"></span></li>';
        //插入元素
        that.ul.insertAdjacentHTML('beforeend', li);

        var section = '<section class="conactive">测试' + random + '</section>';
        //插入元素
        that.tabcon.insertAdjacentHTML('beforeend', section);

        //更新元素
        that.init();

    }

    //删除事件
    removeTab(e) {
        e.stopPropagation(); //阻止冒泡，反之触发li 的点击事件
        var index = this.parentNode.index;//获得父元素index  
        that.lis[index].remove();
        that.sections[index].remove();
        
        that.init();
        //点击删除时，判断当前的li是否有class = 'liactive',否则保持原来的li 不变
        if(document.querySelector('.liactive')) return

        //删除后
        index--;
        //给上一个按钮触发点击事件
        that.lis[index] && that.lis[index].click();
        console.log();

    }

    //修改事件
    modify(){
        //获得span 中的value
        var str = this.innerHTML;
        
        //双击时给span添加input框
        this.innerHTML = '<input type="text">';
        //将span 中的value值赋值给input
        var input = this.children[0];
        input.value = str;
        //让文字处于选中状态
        input.select();
        
        
        //失去焦点时保存值
        input.onblur = function(){
            //判断input 是否为空
            if(this.value == ''){
                
                this.value = str;
            }
            //把input中之前的值赋值给他
            this.parentNode.innerHTML = this.value;
        }

        //键盘事件(键盘弹起事件)
        input.onkeyup = function(e){
            //判断用户是否按下回车
            if(e.keyCode === 13){
                //调用失去焦点事件
               this.blur();
            }
        }
    }


}

//实例化对象
new Main('#tab');
