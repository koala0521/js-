/**
 * Created by lijianwei on 2016/6/20.
 * pop window Elf.components.pop()
 *	@author 李见伟
 *	@parameters 
 *	options
 *		closeable:true|false default true;是否显示关闭按钮
 *		modal:true|false default true;是否显示遮罩
 *		onCloseDestroy 	true|false default true 当关闭时销毁，当配置了此项为true时，关闭后不能再次调用methods.show方法
 *		content:documentElement|htmlstring 窗口内容
 *		target：default body 窗口打印位置
 **/
(function(){
	function init(target,params){
		var opts=target.options;
		if(opts.modal){
			target.mask=Elf.controls.createElement("div","elf-pop-mask");
			Elf.controls.appendTo(target.mask,target);
		}
		
		target.popbody=Elf.controls.createElement("div","elf-pop-body flex-box flex-justify-center flex-align-items-center");
		target.content=Elf.controls.createElement("div","elf-pop-content");
		Elf.controls.appendTo(target.content,target.popbody);
		Elf.controls.appendTo(target.popbody,target);
		if(typeof opts.content =="object"){
			opts.content.popParent=target;
			Elf.controls.appendTo(opts.content ,target.content);
			//target.content=opts.content;
		}else{
			target.content.innerHTML=opts.content;
			//target.content=target.popbody.children[0];
		}
		//Elf.utils.addClass(target.content,"elf-pop-content");
		if(opts.closeable){
			target.closebtn=Elf.controls.createElement("span","elf-pop-close");
			Elf.xEvents.bind(target.closebtn,"click",function (event) {
				close(target);
			});
			if(opts.closeInContent){
				Elf.controls.appendTo(target.closebtn,target.content);
			}else{
				Elf.controls.appendTo(target.closebtn,target);
			}
		}		
		if(opts.target){
			Elf.controls.appendTo(target,opts.target);
		}
	}
	function close(target){
		Elf.effects.fadeOut(target,null,function(){
			if(target.options.onCloseDestroy){
				return Elf.utils.remove(target);
			}else{
				return Elf.utils.css(target,{display:"none"});
			}
		});
	}
	function show(target){
		Elf.utils.css(target,{display:""});
		Elf.effects.fadeIn(target,"fast",function(){
			return target;
		});
	}
	Elf.utils.extend(Elf.components,{
        pop:function(options,params){
            if (typeof options == 'string'){
                return Elf.components.pop.methods[options](params);
            }
            var me=Elf.controls.createElement("div","elf-pop");
            options = Elf.utils.extend({
            	modal:true,
				closeable:true,
				closeInContent:false,
				onCloseDestroy:true,
				content:"",
				target:document.body
			},Elf.components.pop.defaults,options);
            me.options=options;
            init(me,options);
            return me;
        }
    });
    Elf.components.pop.defaults={

    };
    Elf.components.pop.methods ={
		close:function(target){
			return close(target);
		},
		closeByContent:function(content){
			return close(content.popParent);
		},
		show:function (target){
			return show(target);
		}
	};
})(Elf);