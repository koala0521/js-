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
	function init(options){
		var _this=Elf.controls.createElement("div","elf-picv",options.target);
		_this.triggerElement =document.activeElement;
		_this.triggerElement.blur();
		_this.options=options;
		initView(_this,options);
		_this.rate=1;
		setCurrent(_this,0);
		initEvents(_this,options);
		return _this;
	}
	function setCurrent(target,index){
		var opts=target.options;
		if(index>=0){
			target.currentIndex=index;
			target.currentView=target.wraper.children[index];
		}
	}
	function getCurrent(target){
		return target.options.store(target.currentIndex);
	}
	function close(target){
		target.triggerElement.focus();
		if(target.options.onCloseDestroy){
			Elf.utils.remove(target);
		}else{
			Elf.utils.css(target,{display:"none"});
		}
		if(target.options.onClose && typeof target.options.onClose =="function"){
			target.options.onClose(target);
		}
	}
	function togleZoom(target){
		if(Elf.utils.attr(target.currentView,"data-zoom")-0 > 1){
			zoom(target,1);
		}else{
			zoom(target,4);
		}
	}
	function zoom(target,rate){
		var zimg=target.currentView.zoomView.querySelector("img");
		Elf.utils.css(zimg,{"transform":"scale("+rate+")"});
		Elf.utils.attr(target.currentView,"data-zoom",rate);
	}
	function xrotate(){
		
	}
	function xskew(){
		
	}
	function xscale(target,rate){
		
	}
	function xtranslate(){
		
	}
	function xtransformation(target,rotate,skew,scale,translate){
		
	}
	function initView(target,options){
		Elf.controls.createElement("div","elf-picv-bg",target);//背景
		target.wraper=Elf.controls.createElement("div","elf-picv-wraper",target);
		target.length=options.store.length;
		Elf.utils.each(options.store,function(index,item){
			var _view=Elf.controls.createElement("div","elf-picv-view",target.wraper);
			_view.zoomView=Elf.controls.createElement("div","elf-picv-zoom",_view);
			var zoomImg=Elf.controls.createElement("img",{src:item.url},_view.zoomView);
			/*Elf.xEvents.bind(zoomImg,"dblclick",function(evt){
				//console.log("dblclick");
				Elf.components.toast({text:"dblclick"});
			});*/
			//var _desc=Elf.controls.createElement("div","elf-picv-zoom",target.wraper);
		});
	}
	function initEvents(target,param){
		//下一张
		Elf.xEvents.bind(target,"click",function(evt){
			var tt=evt.target;
			if(tt.nodeName=="IMG"){
				
			}else if(Elf.utils.hasClass(tt,"elf-picv-view")){
				
			}else if(Elf.utils.hasClass(tt,"elf-picv-zoom")){
				//点击非图片区域关闭
				close(target);
			}
		});
		Elf.xEvents.bind(target,"dblclick",function(evt){
			//console.log("dblclick");
			var tt=evt.target;
			if(tt.nodeName=="IMG"){
				togleZoom(target);
				//Elf.components.toast({text:"dblclick!!!"});
			}
		});
		Elf.xEvents.bind(target,"mousewheel",function(evt){
			var tt=evt.target;
			var rate=evt.wheelDelta>0?(target.rate + evt.wheelDelta/100<=target.options.maxRate?target.rate + evt.wheelDelta/100:target.options.maxRate):(target.rate + evt.wheelDelta/100>=1?target.rate + evt.wheelDelta/100:1);
			target.rate=rate;
			zoom(target,rate);
            //next(target,param);
		});
		var startTouches,moveTouchs,endTouches,isZooming=false;
		Elf.xEvents.bind(target,"touchstart",function(evt){
			startTouches=evt.touches;
		});
		Elf.xEvents.bind(target,"touchmove",function(evt){
			moveTouches=evt.touches;
			if(evt.touches.length==2){
				console.info("scaling");
			}
			/*
			moveTouches.distanceX=(moveTouches[0].clientX-startTouches[0].clientX);
			
			acceleration=(moveTouches[0].clientX-startTouches[0].clientX)/(moveTouches.time-startTouches.time);
			isHorizontal=Math.abs(moveTouches[0].clientX-startTouches[0].clientX)>Math.abs(moveTouches[0].clientY-startTouches[0].clientY)?true:false;
			if(isHorizontal || isMoving){
				e.preventDefault();
				if(moveTouches.distanceX < 0 && moveTouches[0].clientX>=0){
					//向左
					if(Elf.utils.hasClass(Book.catalogView,'elf-active')){
						isMoving=true;
						//console.log(viewport.offsetWidth-Math.abs(moveTouches.distanceX));
						Elf.utils.addClass(Book.chapterView,'moving');
						Elf.utils.css(Book.chapterView,{"left":viewport.offsetWidth-Math.abs(moveTouches.distanceX)+"px"});
					}
				}else if(moveTouches.distanceX >0){
					//向右
					if(Elf.utils.hasClass(Book.chapterView,'elf-active')){
						isMoving=true;
						Elf.utils.addClass(Book.chapterView,'moving');
						Elf.utils.css(Book.chapterView,{"left":Math.abs(moveTouches.distanceX)+"px"});
					}
				}
			}*/
		});
		Elf.xEvents.bind(target,"touchend",function(evt){
			endTouches=evt.changedTouches;
			console.info(endTouches);
			/*endTouches=e.changedTouches;
			endTouches.time=new Date().getTime();
			endTouches.distanceX=(endTouches[0].clientX-startTouches[0].clientX);
			acceleration=Math.abs(endTouches[0].clientX-startTouches[0].clientX)/(endTouches.time-startTouches.time);
			if(isMoving){
				if(endTouches.distanceX < 0){
					//向左
					if(Elf.utils.hasClass(Book.catalogView,'elf-active')){
						if(acceleration>0.3 || (Math.abs(endTouches.distanceX) > viewport.offsetWidth/2)){
							Book.chapterViewToLeft();
						}else{
							Book.chapterViewCancelToLeft();
						}
					}
					Elf.utils.removeClass(Book.chapterView,'moving');
				}else if(moveTouches.distanceX >0){
					//向右
					if(Elf.utils.hasClass(Book.chapterView,'elf-active')){
						if(acceleration > 0.3 || Math.abs(endTouches.distanceX) > viewport.offsetWidth/2){
							Book.chapterViewToRight();
						}else{
							Elf.utils.css(Book.chapterView,{"left":"0"});
						}
					}
					Elf.utils.removeClass(Book.chapterView,'moving');
				}
				isMoving=false;
			}*/
		});
	}
	Elf.utils.extend(Elf.components,{
        pictureViewer:function(options,param){
            if (typeof options == 'string'){
                return Elf.components.pictureViewer.methods[options](param);
            }
            options = Elf.utils.extend({target:document.body},Elf.components.pictureViewer.defaults,options);
            return init(options);
        }
    });
    Elf.components.pictureViewer.defaults={
    	store:[],//数据列表
    	zoom:true,//是否支持放大
    	maxRate:4,//最多放大率
    	showText:false,//是否显示说明
		onCloseDestroy:true
    };
    Elf.components.pictureViewer.methods ={
    	close:function(target){
			return close(target);
		}
    };
})(Elf);