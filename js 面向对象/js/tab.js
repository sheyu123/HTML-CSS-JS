//创建类
var that;
class Tab {
    
    constructor(id) {
        that = this;
        this.main = document.querySelector(id); 
       
        this.add = this.main.querySelector('.tabadd');
        this.ul = this.main.querySelector('.fisrstnav ul:first-child');
        this.fsections = this.main.querySelector('.tabscon');
        
        this.init();// 调用init
        
    }
    //创建init 初始化绑定的事件
    init() {
        this.updateNode();//更新节点
        this.add.onclick = this.addTab;//调用添加样式方法
        //给 this.lis 循环添加点击事件
       for(var i = 0 ; i < this.lis.length; i++){
            this.lis[i].index = i;// 对象.属性 = 属性值;
            this.lis[i].onclick = this.toggleTab; //这里的this 指向lis
            //给所有删除按钮添加点击事件
            this.remove[i].onclick = this.removeTab;
            //给所有li 下的第一个span 添加点击事件
            this.spans[i].ondblclick = this.editTab;
            //给所有sections 添加点击事件
            this.sections[i].ondblclick = this.editTab; 
       }
    
    }
    //更新节点
    updateNode(){
        this.lis = this.main.querySelectorAll('li');//li 的集合
        this.sections = this.main.querySelectorAll('section'); //section 的集合
        this.remove = this.main.querySelectorAll('.icon-guanbi');//x
        this.spans = this.main.querySelectorAll('.fisrstnav li span:first-child');
        
    }

    //tab栏切换
    toggleTab() { 
       that.clearTab();
       this.className = 'liactive'; //给li 增加样式
       that.sections[this.index].className = 'conactive'; //给section 增加样式
    };
    
    
    //删除样式
    clearTab(){

        //循环清除所有样式
        for(var i = 0 ; i < this.lis.length ; i++){
            this.lis[i].className = '';
            this.sections[i].className = '';
        }
    }

    //添加
    addTab() { 
        var random = Math.random() ;
        that.clearTab(); //清除之前的元素

        //创建li元素并添加到ul
        var li = '<li class="liactive"><span>测试1</span><span class="iconfont icon-guanbi"></span></li>';
        that.ul.insertAdjacentHTML('beforeend',li);

        //创建seciton元素添加到div
        var fsections = '<section class="conactive">测试'+random+'</section>';
        that.fsections.insertAdjacentHTML('beforeend',fsections);

        //在调用一次init() 初始化更新节点，让后面添加的元素也绑定事件
        that.init();
    };

    //删除
    removeTab(e) { 
        e.stopPropagation(); //阻止冒泡，反之触发li 的点击事件
        var index = this.parentNode.index;
        console.log(index);
        that.lis[index].remove();  //remove 可以直接删除样式
        that.sections[index].remove();
        that.init();
        //点击删除时，判断当前的li是否有class = 'liactive',否则保持原来的li 不变
        if(document.querySelector('.liactive')) return;
        //当我们删除一个选项，让他的前一个li 添加点击事件来达到增加样式
        index--;
        that.lis[index] && that.lis[index].click(); //短路与（1为真返回2）
        
    };

    //修改
    editTab() { 
        //获取当前文本框的内容
        var str = this.innerHTML;
        
        //双击禁止选中文字
        window.getSelection? window.getSelection().removeAllRanges():document.selection.empty();
        //添加文本框
        this.innerHTML = '<input type="text">';
        //让当前的文本框文字处于选定状态
        var input = this.children[0];
        input.value = str;
        input.select(); //让文字处于全选状态
        
        //文本框失去焦点时，当文本框的内容重新赋值给span
        input.onblur = function(){  
            
            //判断input 框是否为空,为空时填充上一次的字符
            if(this.value == ''){
                this.value = str;
            }
            this.parentNode.innerHTML = this.value;
        }

        //当用户按下回车键时，也可以将文本框的值赋值给span
        input.onkeyup = function(e){
            
            if(e.keyCode === 13){
                //手动调用失去焦点事件
                this.blur();
            }
        }
    };

}
//实例化
new Tab('#tab');
