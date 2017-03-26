/**
 * Created by lijianwei on 2016/6/20.
 *	图像浏览器插件
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
 *
 **/
(function(){
	function init(target,params){
		initView(target,params);
		setCurrent(target,0);
		initEvents(target,params);
	}
	function setCurrent(target,params){
		if(params!=undefined){
			if(target.currentIndex==params){
				return;
			}
			target.currentIndex=params;
			var currentItem=target.items.childNodes[target.currentIndex];
			var currentHandle=target.handles.childNodes[target.currentIndex];
			Elf.utils.addClass(currentHandle,"current");
			Elf.utils.css(currentItem,{"display":""});
			Elf.utils.addClass(currentItem,"current");
			Elf.effects.fadeIn(currentItem,"",function(){
				Elf.utils.css(currentItem,{"display":""});
			});
			var otherItmes=Elf.utils.siblings(currentItem);
			var otherHandles=Elf.utils.siblings(currentHandle);

			Elf.utils.each(otherItmes,function(index,obj){
				Elf.utils.removeClass(otherItmes[index],"current");
			});
			Elf.utils.each(otherHandles,function(index,obj){
				Elf.utils.removeClass(otherHandles[index],"current");
			});
		}
	}
	function initView(target,param){
		var opts=target.options;
		target.items=Elf.controls.createElement("div","elf-xBanner-items");
		target.handles=Elf.controls.createElement("div","elf-xBanner-handles");
		target.length=opts.store.length;
		target.run="next";

		Elf.utils.each(opts.store,function(index,obj){
			var item=Elf.controls.createElement("div","elf-xBanner-item noselect");
			if(Elf.utils.isImage(obj)){
				Elf.controls.appendTo(Elf.controls.createElement("img",{src:obj}),item);
			}else if(typeof obj=="string"){
				item.innerHTML=obj;
			}else if(typeof obj =="object"){
				Elf.controls.appendTo(obj,item);
			}
			Elf.controls.appendTo(item,target.items);
			var handle=Elf.controls.createElement("i");
			Elf.controls.appendTo(handle,target.handles);
		});
		Elf.controls.appendTo(target.items,target);
		Elf.controls.appendTo(target.handles,target);
		if(opts.width){
			Elf.utils.css(target,{width:opts.width});
		}
		if(opts.height){
			Elf.utils.css(target,{height:opts.height});
		}
		return target;
	}
	function initEvents(target,params){
		var opts=target.options;
		Elf.utils.each(target.handles.childNodes,function(index,obj){
			Elf.xEvents.bind(obj,"mouseenter",function(e){
				setCurrent(target,index);
			});
		});
		if(opts.autoPlay){
			autoRun(target,opts.autoPlay);
			Elf.utils.each(target.items.childNodes,function(index,obj){
				Elf.xEvents.bind(obj,"mouseenter",function(e){
					if(target.interval){
						window.clearInterval(target.interval);
						target.interval=null;
					}
				});
			});
			Elf.utils.each(target.handles.childNodes,function(index,obj){
				Elf.xEvents.bind(obj,"mouseenter",function(e){
					if(target.interval){
						window.clearInterval(target.interval);
						target.interval=null;
					}
				});
			});
			Elf.utils.each(target.items.childNodes,function(index,obj){
				Elf.xEvents.bind(obj,"mouseleave",function(e){
					autoRun(target,opts.autoPlay);
				});
			});
			Elf.utils.each(target.handles.childNodes,function(index,obj){
				Elf.xEvents.bind(obj,"mouseleave",function(e){
					autoRun(target,opts.autoPlay);
				});
			});
		}
	}
	function autoRun(target,params){
		if(target.interval){
			window.clearInterval(target.interval);
			target.interval=null;
		}
		target.interval=window.setInterval(function(){
			if(target.run=="next"){
				if(target.currentIndex < target.length-1){
					next(target);
				}else{
					target.run="prev";
					prev(target);
				}
			}else{
				if(target.currentIndex > 0){
					prev(target);
				}else{
					target.run="next";
					next(target);
				}
			}
		},params);
	}
	function next(target){
		setCurrent(target,target.currentIndex+1);
	}
	function prev(target){
		setCurrent(target,target.currentIndex-1);
	}
	Elf.utils.extend(Elf.components,{
        xBanner:function(options,params){
            if (typeof options == 'string'){
                return Elf.components.xBanner.methods[options](params);
            }
            var me=Elf.controls.createElement("div","elf-xBanner");
            options = Elf.utils.extend({},Elf.components.xBanner.defaults,options);
            me.options=options;
            init(me,params);
            if(options.target){
                Elf.controls.appendTo(me,options.target);
            }
            return me;
        }
    });
    Elf.components.xBanner.defaults={
		width:"",
		height:"",
		autoPlay:0,
		prev:"",
		next:"",
		target:""
    };
    Elf.components.xBanner.methods ={

	};
})(Elf);