/**
 * Created by lijianwei on 2016/4/29.
 */


/**
 * 阻尼组件,三种类型的组件，
 *  Elf.components.mask(options);
 *  @parameters
 *  options
 *      type String default up middle down
 *      opacity Number default .5 设置透明度
 *      target Element objext default document.body
 * */
/*Elf.components.mask=function(options) {

 options = Elf.utils.extend({
 type:"up",
 opacity:0.8,
 type:"global",// global win page
 target: document.body
 }, options);

 //
 var mask=Elf.controls({
 name: "div",className: "elf_mask"
 });

 if(options.target){
 options.target.appendChild(mask);
 }

 confirm.options=options;
 return mask;
 }*/
/**
 * 确认提示框组件
 *  Elf.components.confirm(options);
 *  @parameters
 *  options
 *      width Number default null
 *      height Number default null
 *      minWidth String default 200px 限制最小宽度，提示文字过少时，保证样式效果
 *      maxWidth String default 300px 限制最大宽度，提示文字过多时，保证样式效果
 *      maxHeight Number default null
 *      modle Boolean default true 是否显示遮罩
 *      title String default null 标题
 *      text String Not Null 提示文字
 *      buttons Objext key-value(key String ,value function) default {"确定":function(){}}
 *      opacity Number default 0 不设置，透明度（背景色透明度）
 *      target Element objext default document.body
 * */
Elf.components.confirm=function(options){
    options = Elf.utils.extend({
        width:"",
        minWidth:"200px",
        minHeight:"",
        maxWidth:"300px",
        maxHeight:"",
        height:"",
        modle:true,
        buttons:{"确定":function(){}},
        title:"",
        text:"温馨提示",
        align:"",
        opacity:0,
        target:document.body
    },options);
    //容器
    var confirm=Elf.controls({
        name: "div",className: "elf_confirm"
    });
    confirm.options=options;
    if(options.modle){
        confirm.mask=Elf.createChild(confirm,{
            name: "div",className: "elf_confirm_mask"
        });
    }
    //内容
    confirm.body=Elf.createChild(confirm,{
        name: "div",className: "elf_confirm_body"
    });

    //背景
    confirm.background=Elf.createChild(confirm.body,{
        name: "div",className: "elf_confirm_bg"
    });
    confirm.content=Elf.createChild(confirm.body,{
        name: "div",className: "elf_confirm_content"
    });
    //标题
    if(options.title){
        confirm.titleNode=Elf.createChild(confirm.content,{
            name: "h2",
            className: "elf_confirm_title"
        });
        confirm.titleNode.innerHTML=options.title;
    }
    //提示语
    if(options.text){
        confirm.textNode=Elf.createChild(confirm.content,{
            name: "p",
            className: "elf_confirm_text"
        });
        confirm.textNode.innerHTML=options.text;
    }
    //按钮区
    confirm.buttonGroup=Elf.createChild(confirm.body,{
        name: "div",
        className: "elf_confirm_buttonGroup"
    });
    if(options.buttons){
        confirm.btns=[];
        var i=0;
        for(var key in options.buttons){
            confirm.btns[i]=Elf.createChild(confirm.buttonGroup,{
                name: "a",
                className: "elf_confirm_button"
            });
            confirm.btns[i].innerHTML=key;
            Elf.xEvents.onXClick(confirm.btns[i],function (event){
                confirm.options.buttons[event.target.innerHTML].call(this);
                hidden();
            });
            i++;
        }
    }
    if(options.target){
        options.target.appendChild(confirm);
    }
    function hidden(){
        if(!!confirm){
            Elf.effects.hidden(confirm,300,close);
        }
    }
    function close(){
        Elf.utils.remove(confirm);
    }
    function init(){
        //var docWidth= document.documentElement.clientWidth||document.body.clientWidth;
        //var docHeight= document.documentElement.clientHeight||document.body.clientHeight;
        var width=confirm.body.clientWidth;
        var height=confirm.body.clientHeight;
        if(options.maxWidth){
            confirm.body.style.maxWidth=options.maxWidth;
        }
        if(options.minWidth){
            confirm.body.style.minWidth=options.minWidth;
        }
        if(options.width){
            confirm.body.style.width=options.width;
        }
        confirm.body.style="left:"+(width/2*-1)+"px;"+"top:"+(height/2*-1)+"px;";
        confirm.btns[0].focus();
    }
    init();
    return confirm;
};
/**
 * 自动消失提示组件
 *  Elf.components.toast(options);
 *  @parameters
 *  options
 *      width Number default null
 *      height Number default null
 *      minWidth String default 200px 限制最小宽度，提示文字过少时，保证样式效果
 *      maxWidth String default 300px 限制最大宽度，提示文字过多时，保证样式效果
 *      maxHeight Number default null
 *      holdtime Number default 1000 1秒 停留时间
 *      text String Not Null 提示文字
 *      opacity Number default 0 不设置，透明度（背景色透明度）
 *      target Element objext default document.body
 * */
Elf.components.toast=function(options){
    options = Elf.utils.extend({
        width:"",
        minWidth:"60px",
        maxWidth:"80%",
        minHeight:"",
        maxHeight:"",
        height:"",
        holdtime:1000,
        text:"温馨提示",
        opacity:0,
        target:document.body
    },options);
    //容器
    var toast=Elf.controls({
        name: "div",className: "elf_toast"
    });
    toast.body=Elf.createChild(toast,{
        name: "div",className: "elf_toast_body"
    });
    toast.bg=Elf.createChild(toast.body,{
        name: "div",className: "elf_toast_bg"
    });
    toast.body.text=Elf.createChild(toast.body,{
        name: "div",className: "elf_toast_text"
    });
    toast.body.text.innerHTML=options.text;
    if(options.target){
        options.target.appendChild(toast);
    }
    setTimeout(function(){
        Elf.effects.hidden(toast,300,remove);
    },options.holdtime);
    function remove(){
        Elf.utils.remove(toast);
    }
    return toast;
};

/**
 * loading组件
 *  Elf.components.loading(options);
 *  @parameters
 *  options
 *      width Number default null
 *      height Number default null
 *      minWidth String default 200px 限制最小宽度，提示文字过少时，保证样式效果
 *      maxWidth String default 300px 限制最大宽度，提示文字过多时，保证样式效果
 *      maxHeight Number default null
 *      holdtime Number default 1000 1秒 停留时间
 *      text String Not Null 提示文字
 *      opacity Number default 0 不设置，透明度（背景色透明度）
 *      target Element objext default document.body
 * */
(function(){
    function init(){
        Elf.components.loading.root=Elf.controls({
            name: "div",className: "elf_loading"
        });
        Elf.components.loading.mask=Elf.createChild(Elf.components.loading.root,{
            name: "div",className: "elf_loading_mask"
        });
        Elf.components.loading.position=Elf.createChild(Elf.components.loading.root,{
            name: "div",className: "elf_loading_position"
        });
        Elf.components.loading.frames=Elf.createChild(Elf.components.loading.position,{
            name: "ul",className:"elf_loading_frames rotate shadow"
        });
        Elf.components.loading.frames
        for(var i=1;i<=12;i++){
            Elf.createChild(Elf.components.loading.frames,{
                name: "li",
                className:"elf_loading_frames_"+i
            });
        }
    }
    Elf.utils.extend(Elf.components,{
        loading:function(options,param){
            if (typeof options == 'string'){
                return Elf.components.loading.methods[options](this,param);
            }
            options = Elf.utils.extend({
                width:"64",
                height:"64",
                color:"#03b4fa",
                target:document.body
            },options);
            if(!Elf.components.loading.root){
                init(options,param);
                if(options.target){
                    options.target.appendChild(Elf.components.loading.root);
                }
            }
            Elf.components.loading.count=Elf.components.loading.count>=0?Elf.components.loading.count:0;
            Elf.components.loading.count+=1;
        }
    });
    Elf.components.loading.count=0;
    Elf.components.loading.methods = Elf.utils.extend({},{
        close:function(){
            Elf.components.loading.count-=1;
            if(Elf.components.loading.count<=0 && !!Elf.components.loading.root){
                Elf.effects.hidden(Elf.components.loading.root,null,function(){
                    Elf.components.loading.root=Elf.utils.remove(Elf.components.loading.root);
                    //Elf.components.loading.root=null;
                    console.info(Elf.components.loading.root);
                });
            }
        }
    });
})(Elf);

/**
 * 树形菜单
 * */
(function(){
    function init(target,options,param){
        target.root=Elf.controls({name: "div",className: "elf_treeview"});
        if(options.target){
            options.target.appendChild(target.root);
        }
    }
    Elf.utils.extend(Elf.components,{
        tree:function(options,param){
            if (typeof options == 'string'){
                return Elf.components.treeView.methods[options](param);
            }
            var _this={root:""};
            _this.options = Elf.utils.extend({
                autoOpen:true,/*自动打开*/
                store:{},/*菜单配置Json数据*/
                closable:false,/*是否可关闭*/
                closAction:"hide", /*关闭时的动作-关闭方式destroy,hide*/
                collapsible:true, /*是否可折叠*/
                collapseDirection:true,/*折叠方向，top,bottom,left,right*/
                checkable:true,/*是否有复选框*/
                autoDestroy:true, /*关闭时删除节点*/
                yes:"ps",//勾选时，关联父(parent-p)，关联子(son-s)
                not:"ps",//取消勾选时，关联父(parent-p)，关联子(son-s)
                target:document.body,border:"",
                onChange:function(v){}
            },options);
            init(_this,_this.options,param);
            return _this;
        }
    });
    Elf.components.treeView.methods = Elf.utils.extend({},{
        get:function(param){}
    });
})(Elf);