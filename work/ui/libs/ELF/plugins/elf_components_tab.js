/**
 * Created by lijianwei on 2016/7/4.
 *
 * tab标签
 *
 **/
(function(){
    function initView(target,param){
        var opts=target.options;
        target.tabGroup=Elf.controls.createElement("ul","elf-tab-group");
        target.tabContainer=Elf.controls.createElement("div","elf-tab-container");
        target.tabContents=Elf.controls.createElement("div","elf-tab-contents",target.tabContainer);
        target.tabCount=opts.tabs.length;
        Elf.utils.each(opts.tabs,function(index,item){
            var _li=Elf.controls.createElement("li",target.tabGroup);
            Elf.controls.createElement("span",{innerHTML:item.name,"data-id":index+""},_li);
            var tabContent=Elf.controls.createElement("div","elf-tab-content",{"data-id":index},target.tabContents);
            if(item.current){
                target.currentIndex=index;
            }
            if(typeof item.content=="string"){                
                _content.innerHTML=item.content;
            }else if(item.content.nodeType && (item.content.nodeType==1||item.content.nodeType==9 || item.content.nodeType==11)){
                Elf.controls.appendTo(item.content,tabContent);
            }
        });
        //setCuttent(target,target.currentIndex||0);
        if(opts.tabsRender){
            Elf.controls.appendTo(target.tabGroup,opts.tabsRender);
        }else{
            Elf.controls.appendTo(target.tabGroup,opts.target);
        }
        if(opts.tabContentRander){
            Elf.controls.appendTo(target.tabContainer,opts.tabContentRander);
        }else{
            Elf.controls.appendTo(target.tabContainer,opts.target);
        }
    }
    function setCuttent(target,param){
    	var opts=target.options;
    	param=param||0;
    	var currenttab=target.tabHeader.children[param];
    	var siblingsTab=Elf.utils.siblings(currenttab);
    	Elf.utils.addClass(currenttab,"current");
    	Elf.utils.removeClass(siblingsTab,"current");
    	if(target.tabContent){
    		var currentItem=target.tabContent.children[param];
    		var itemSiblings=Elf.utils.siblings(currentItem);
    		Elf.utils.addClass(currentItem,"current");
        	Elf.utils.removeClass(itemSiblings,"current");
    	}
    }
    function initEvent(target,param){
        var opts=target.options;
        if(Elf.utils.support.touch){
            console.info("support touch");
            var timeout;
            var start={};
            var move={};
            var end={};
            var isMoving=false;
            var scrollLeft=0;
            Elf.xEvents.bind(target.tabContainer,"touchstart",function(evt){
                start.touch=evt.touches[0];
                start.time=new Date().getTime();
                //start.left=this.scrollLeft;
            });
            Elf.xEvents.bind(target.tabContainer,"touchmove",function(evt){
                move.touch=evt.touches[0];
                move.time=new Date().getTime();
                move.distanceX=(move.touch.clientX-start.touch.clientX);
                var acceleration=(move.touch.clientX-start.touch.clientX)/(move.time-start.time);
                var isHorizontal=Math.abs(move.touch.clientX-start.touch.clientX)>Math.abs(move.touch.clientY-start.touch.clientY)?true:false;//是否水平移动
                if(isHorizontal || isMoving){
                    //evt.preventDefault();
                    if(move.distanceX < -1 && move.touch.clientX>=0){
                        //向左
                        var tx=move.distanceX;
                        //var 
                        Elf.effects.transition(target.tabContents,200);
                        Elf.effects.transform(target.tabContents,'translate3d(' + tx + 'px,'+'0, 0)');
                        //target.tabContents.style.
                        //target.tabContents.scrollLeft=;
                    }else if(move.distanceX >1){
                        //向右
                        target.tabContents.scrollLeft=start.left+move.distanceX;
                        /*f(Elf.utils.hasClass(Book.chapterView,'elf-active')){
                            isMoving=true;
                            Elf.utils.addClass(Book.chapterView,'moving');
                            Elf.utils.css(Book.chapterView,{"left":Math.abs(moveTouches.distanceX)+"px"});
                        }*/
                    }
                }
            });
            Elf.xEvents.bind(target.tabContainer,"touchend",function(evt){
                end.touch=evt.changedTouches;
                end.time=new Date().getTime();
                end.distanceX=(end.touch.clientX-start.touch.clientX);
                var acceleration=Math.abs(end.touch.clientX-start.touch.clientX)/(end.time-start.time);
                if(isMoving){
                    if(end.distanceX < -1){
                        //向左
                        /*if(Elf.utils.hasClass(Book.catalogView,'elf-active')){
                            if(acceleration>0.3 || (Math.abs(end.distanceX) > target.tabContainer.offsetWidth/2)){
                               // Book.chapterViewToLeft();
                            }else{
                                //Book.chapterViewCancelToLeft();
                            }
                        }*/
                        //Elf.utils.removeClass(Book.chapterView,'moving');
                    }else if(end.distanceX >1){
                        //向右
                        /*if(Elf.utils.hasClass(Book.chapterView,'elf-active')){
                            if(acceleration > 0.3 || Math.abs(endTouches.distanceX) > target.tabContainer.offsetWidth/2){
                                //Book.chapterViewToRight();
                            }else{
                                //Elf.utils.css(Book.chapterView,{"left":"0"});
                            }
                        }*/
                        //Elf.utils.removeClass(Book.chapterView,'moving');
                    }
                    isMoving=false;
                }
            });


        }else{
            console.info("not support touch");
        }
        
    }
    function init(target,param){
        initView(target,param);
        initEvent(target,param);
    }
    Elf.utils.extend(Elf.components,{
        tab:function(options,param){
            if (typeof options == 'string'){
                return Elf.components.tab.methods[options](param);
            }
            var me=document.createDocumentFragment();
            me.options = Elf.utils.extend({
                tabs:[],
                items:[],
                onTabClick:function(event){},
                tabsRender:"",
                itemsRander:"",
                target:document.body
            },Elf.components.tab.defaults,options);
            init(me,param);
            return me;
        }
    });
    Elf.components.tab.defaults={
    	current:0
    };
    Elf.components.tab.methods = Elf.utils.extend({},{
    	setCuttent:function(target,param){
    		return setCuttent(target,param);
    	}
    });
})(Elf);