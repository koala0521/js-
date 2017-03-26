/**
 * Created by lijianwei on 2016/6/20.
 *	弹框
 *	@author 李见伟
 *	@parameters 
 *	options
 *		width:number default:null 播放器的宽度，默认情况下,播放器的宽度自适应外层标签的宽度，如果设置了高度，图片播放器的宽度设定，当图片宽度超出设置宽度时，图片按比例缩放，
 *		height:number default:null 播放器的高,默认情况下，高随图片的高度，或者调整后的高度自动，如果设置了高度，图片播放器的高度设定，当图片的宽、高超出的情况，图片按比例缩放，如果图片宽高都不超出，图片显示到中央区域，
 *		store:[] 用来加载图像列表，标准JSon对象数据
 *		showThumb:true|false default true;设置是否加载缩略图
 *		thumbSize:auto|  default:null 缩略图列表分页个数，
 *		thumbWidth:""
 *		thumbHeight:""
 **/
(function(){
	function init(target,params){
		target.triggerElement =document.activeElement;
		target.triggerElement.blur();
		var opts=target.options;
		if(opts.modal){
			target.mask=Elf.controls.createElement("div","elf-dialog-mask");
			Elf.controls.appendTo(target.mask,target);
		}
		target.contentBody=Elf.controls.createElement("div","elf-dialog-body elf-content shadow-r elf-fixed");
		target.tbar=Elf.controls.createElement("div","elf-tbar");
		target.dialogTitle=Elf.controls.createElement("h2","elf-dialog-title");
		target.closebtn=Elf.controls.createElement("span","elf-dialog-closeIcon");
		Elf.xEvents.bind(target.closebtn,"click",function (event) {
			if(target.options.onPreClose && typeof target.options.onPreClose=="function"){
				target.options.onPreClose(target,function(can){
					if(can){
						close(target);
					}
				});
			}else{
				close(target);
			}
		});
		Elf.controls.appendTo(target.dialogTitle,target.tbar);
		Elf.controls.appendTo(target.closebtn,target.tbar);
		Elf.controls.appendTo(target.tbar,target.contentBody);
		var scrollContent=Elf.controls.createElement("div","elf-content elf-dialog-content");
		target.dialogContent=Elf.controls.createElement("div","elf-content-body elf-dialog-content-body");
		Elf.controls.appendTo(target.dialogContent,scrollContent);
		Elf.controls.appendTo(scrollContent,target.contentBody);
		if(opts.dialogClass){
			Elf.utils.addClass(target,opts.dialogClass);
		}
		if(opts.width){
			Elf.utils.css(target.contentBody,{width:opts.width+"px"});
		}
		if(opts.height){
			Elf.utils.css(target.contentBody,{height:opts.height+"px"});
		}
		if(opts.title){
			target.dialogTitle.innerHTML=opts.title;
		}
		if(opts.content && typeof opts.content=="string"){
			target.dialogContent.innerHTML=opts.content;
		}else if(typeof opts.content =="object"){
			opts.content.dialog=target;
			Elf.controls.appendTo(opts.content ,target.dialogContent);
		}
		Elf.controls.appendTo(target.contentBody,target);
		if(opts.target){
			Elf.controls.appendTo(target,opts.target);
		}
	}
	function close(target){
		//Elf.effects.fadeOut(target,"null",function(){
			target.triggerElement.focus();
			if(target.options.onCloseDestroy){
				Elf.utils.remove(target);
			}else{
				Elf.utils.css(target,{display:"none"});
			}
			if(target.options.onClose){
				target.options.onClose(target);
			}
		//});
	}
	function show(target){
		Elf.utils.css(target,{display:""});
		Elf.effects.fadeIn(target,"fast",function(){
			return target;
		});
	}
	Elf.utils.extend(Elf.components,{
        dialog:function(options,params){
            if (typeof options == 'string'){
                return Elf.components.dialog.methods[options](params);
            }
            var me=Elf.controls.createElement("div","elf-dialog flex-box flex-justify-center flex-align-items-center");
            options = Elf.utils.extend({
				width:"",
				height:"",
				closeable:true,
				modal:true,
				dialogClass:"",
				onCloseDestroy:true,
				content:"",
				target:document.body
			},Elf.components.dialog.defaults,options);
            me.options=options;
            init(me,params);
            return me;
        }
    });
    Elf.components.dialog.defaults={};
    Elf.components.dialog.methods ={
		show:function(target){
			return show(target);
		},
		close:function(target){
			return close(target);
		}
	};
})(Elf);