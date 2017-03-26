/**
 * Created by lijianwei on 2016/5/13.
 * 自动消失提示组件
 *  Elf.components.toast(options);
 *  @parameters
 *  options
 *      width Number default null
 *      height Number default null
 *      minWidth String default 200px 限制最小宽度，提示文字过少时，保证样式效果
 *      maxWidth String default 300px 限制最大宽度，提示文字过多时，保证样式效果
 *      maxHeight Number default null
 *      holdtime Number default 1000 停留时间（单位毫秒）
 *      text String Not Null 提示文字
 *      opacity Number default 0 不设置，透明度（背景色透明度）
 *      target Element objext default document.body
 **/
Elf.components.toast=function(options){
    options = Elf.utils.extend({
        width:"",
        minWidth:"60px",
        maxWidth:"80%",
        minHeight:"",
        maxHeight:"",
        height:"",
        holdtime:3000,
        text:"温馨提示",
        html:"",
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
    if(options.html){
        toast.body.innerHTML = options.html;
    }else{
        toast.bg=Elf.createChild(toast.body,{
            name: "div",className: "elf_toast_bg"
        });
        toast.body.text=Elf.createChild(toast.body,{
            name: "div",className: "elf_toast_text"
        });
        toast.body.text.innerHTML=options.text;
    }
    if(options.target){
        options.target.appendChild(toast);
    }
    if(options.holdtime){
        setTimeout(function(){
            Elf.effects.hidden(toast,300,remove);
        },options.holdtime);
    }
    function remove(){
        Elf.utils.remove(toast);
        if(typeof options.callback==="function"){
            options.callback.call(this);
        }
    }
    return toast;
};