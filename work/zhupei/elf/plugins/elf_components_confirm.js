/**
 * Created by lijianwei on 2016/5/13.
 *
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
 **/
Elf.components.confirm=function(options){
    options = Elf.utils.extend({
        width:"",
        minWidth:"200px",
        minHeight:"",
        maxWidth:"80%",
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
    function hidden(){
        if(!!confirm){
            Elf.effects.hidden(confirm,300,close);
        }
    }
    function close(){
        confirm.triggerElement.focus();
        Elf.utils.remove(confirm);
    }
    function init(){
        confirm.triggerElement =document.activeElement;
        confirm.triggerElement.blur();
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
                    hidden();
                    confirm.options.buttons[event.target.innerHTML].call(this);
                });
                i++;
            }
        }
        if(options.target){
            options.target.appendChild(confirm);
        }
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
        confirm.body.style.top=(height/2*-1)+"px";
    }
    init();
    return confirm;
};