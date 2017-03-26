Elf.xEvents = function () {};
Elf.xEvents.DefaultScalingDistance=5000.0;
Elf.xEvents.DefaultScalingRoll=0.05;
Elf.xEvents.DefaultTransformDistance=10;
Elf.xEvents.MinTouchSpan=50;//ms
Elf.xEvents.MinMoveDistance=5;
Elf.xEvents.MaxDoubleTouchSpan=300;//ms
Elf.xEvents.MaxSwipeTouchSpan=400;//ms
Elf.xEvents.isEventing=false;
/*修复浏览器兼容事件*/
/*
 * Elf.xEvents.transitionEndCallback 记录绑定的事件回调，
 * create from 2.0
 * TODO 需要重新设计
 **/
Elf.xEvents.transitionEndCallback={};
Elf.xEvents.PrefixTransitionEnd =function(){    //css3过度完成事件
    var style=document.createElement("div").style,
        transition="transition";
    var transitionEndEventNames = {
        WebkitTransition: 'webkitTransitionEnd',
        MozTransition: 'transitionend',
        OTransition: 'oTransitionEnd otransitionend',
        transition: 'transitionend'
    };
    for(var s in transitionEndEventNames){
        if(typeof style[s] === "string"){
            return transitionEndEventNames[s]
        }
    }
};
Elf.xEvents.PrefixAnimationend =function(){     //CSS3动画完成事件
    var style=document.createElement("div").style,
        transition="transition";
    //webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend
    var animationEndEventNames = {
        webkitAnimationEnd: 'webkitAnimationEnd',
        mozAnimationEnd: 'mozAnimationEnd',
        MSAnimationEnd: 'MSAnimationEnd',
        oanimationend:'oanimationend',
        animationend: 'animationend'
    };
    for(var s in animationEndEventNames){
        if(typeof style[s] === "string"){
            return animationEndEventNames[s];
        }
    }
};
Elf.xEvents.preventEvent=function(){
    Elf.xEvents.isEventing=true;
    setTimeout(function(){
        Elf.xEvents.isEventing=false;
    },Elf.effects.DefaultDuration*1000*1.1);
};
Elf.xEvents.getDistance=function(x1,y1,x2,y2){
    return Math.sqrt(Math.pow((x1-x2),2)+Math.pow((y1-y2),2));
};

Elf.xEvents.eventDispatcher=function(obj){  //自定义事件
    obj.isDispatcherBinded=true;

    obj.fireClick=function(){
        var ev=document.createEvent("Event");
        ev.initEvent("xClick",true,true);
        obj.dispatchEvent(ev);
    };
    obj.fireDblClick=function(){
        var ev=document.createEvent("Event");
        ev.initEvent("xDblClick",true,true);
        obj.dispatchEvent(ev);
    };
    obj.fireDrag=function(distance){
        var args={
            draggedX: distance.x,
            draggedY: distance.y
        };
        var ev=document.createEvent("Event");
        ev.initEvent("xDragging",true,true);
        ev.args=args;
        obj.dispatchEvent(ev);
    };
    obj.fireDragEnd=function(){
        var ev=document.createEvent("Event");
        ev.initEvent("xDragEnd",true,true);
        obj.dispatchEvent(ev);
    };
    obj.fireSwipe=function(distance){
        var args={
            draggedX: distance.x,
            draggedY: distance.y
        };
        var ev=document.createEvent("Event");
        ev.initEvent("xSwipe",true,true);
        ev.args=args;
        obj.dispatchEvent(ev);
    };
    obj.fireScale=function(rate){
        var args={
            scaleRate:rate
        };
        var ev=document.createEvent("Event");
        ev.initEvent("xScale",true,true);
        ev.args=args;
        obj.dispatchEvent(ev);
    };

    if(Elf.terminalInfo.IsMobile){  //移动端事件
        obj.TouchStarts = [];
        obj.TouchMoves = [];
        obj.TouchEnds = [];
        obj.isTouchMoving=false;
        obj.isTouchScaling=false;
        obj.addEventListener("touchstart", function (event) {
            //event.preventDefault();
            var e = Elf.getEvent(event);
            Elf.stopPop(e);
            //Elf.xEvents.stopPop(event);

            var startInfo={};
            startInfo.fingersCount=event["touches"].length;
            startInfo.touches=[];
            for(var i=0;i<event["touches"].length;i++){
                var touchInfo={
                    x:event["touches"][i].pageX,
                    y:event["touches"][i].pageY
                };
                startInfo.touches.push(touchInfo);
            }
            startInfo.time=(new Date()).getTime();
            startInfo.prev=obj.TouchStarts[obj.TouchStarts.length-1];
            obj.TouchStarts.push(startInfo);
        });
        obj.addEventListener("touchmove", function (event) {
            //event.preventDefault();
            var e = Elf.getEvent(event);
            Elf.stopPop(e);
            //Elf.xEvents.stopPop(event);

            var moveInfo={};
            moveInfo.fingersCount=event["touches"].length;

            moveInfo.moveDistances=[];
            moveInfo.touches=[];
            for(var i=0;i<event["touches"].length;i++){
                var distance={
                    x:event["touches"][i].pageX-obj.TouchStarts[obj.TouchStarts.length-1].touches[i].x,
                    y:event["touches"][i].pageY-obj.TouchStarts[obj.TouchStarts.length-1].touches[i].y
                };
//                alert(distance.x+"--"+distance.y);
                if(Math.pow(distance.x,2)+Math.pow(distance.y,2)>Elf.xEvents.MinMoveDistance){
                    obj.isTouchMoving=true;
                }
                moveInfo.moveDistances.push(distance);
                var touchInfo={
                    x:event["touches"][i].pageX,
                    y:event["touches"][i].pageY
                };
                moveInfo.touches.push(touchInfo);
            }
            moveInfo.time=(new Date()).getTime();
            moveInfo.prev=obj.TouchMoves[obj.TouchMoves.length-1];
            obj.TouchMoves.push(moveInfo);

//            obj.isTouchMoving=true;

            if(moveInfo.fingersCount==1){//fire drag
                if(!obj.isTouchScaling){
                    obj.fireDrag(moveInfo.moveDistances[0]);
                }
            }
            else if(moveInfo.fingersCount==2){//fire scale
                var currentDistance=Elf.xEvents.getDistance(moveInfo.touches[0].x,moveInfo.touches[0].y,moveInfo.touches[1].x,moveInfo.touches[1].y);
                var oriTouchInfo=obj.TouchStarts[obj.TouchStarts.length-1];
                var oriDistance=Elf.xEvents.getDistance(oriTouchInfo.touches[0].x,oriTouchInfo.touches[0].y,oriTouchInfo.touches[1].x,oriTouchInfo.touches[1].y);
                var span=currentDistance-oriDistance;
                var rate=span/Elf.xEvents.DefaultScalingDistance;
                obj.fireScale(rate);
                obj.isTouchScaling=true;
            }
            else{
                // support in the future
            }
        });
        obj.addEventListener("touchend", function (event) {
            //event.preventDefault();
            var e = Elf.getEvent(event);
            Elf.stopPop(e);
            //Elf.xEvents.stopPop(event);

            var endInfo={};
            endInfo.fingersCount=event["changedTouches"].length;
            endInfo.touches=[];
            for(var i=0;i<event["changedTouches"].length;i++){
                var touchInfo={
                    x:event["changedTouches"][i].pageX,
                    y:event["changedTouches"][i].pageY
                };
                endInfo.touches.push(touchInfo);
            }
            endInfo.time=(new Date()).getTime();
            endInfo.prev=obj.TouchEnds[obj.TouchEnds.length-1];
            obj.TouchEnds.push(endInfo);

            var remainFingersCount=event["touches"].length;

//            alert(remainFingersCount);
            if(remainFingersCount==0){
                if(obj.isTouchMoving){
                    if(endInfo.time-obj.TouchStarts[obj.TouchStarts.length-1].time<Elf.xEvents.MaxSwipeTouchSpan){//fire swipe
                        var distance={
                            x:endInfo.touches[0].x - obj.TouchStarts[obj.TouchStarts.length-1].touches[0].x,
                            y:endInfo.touches[0].y - obj.TouchStarts[obj.TouchStarts.length-1].touches[0].y
                        };
                        obj.fireSwipe(distance);
                    }
                    //fire drag end
                    obj.fireDragEnd();
                }
                else{
                    if(endInfo.prev){
                        var timeSpan=endInfo.time-endInfo.prev.time;
                        if(timeSpan<Elf.xEvents.MinTouchSpan){
                            //ignore
                        }
                        else if(timeSpan<Elf.xEvents.MaxDoubleTouchSpan){//fire double click
                            obj.fireDblClick();
                        }
                        else{//fire click
                            obj.fireClick();
                        }
                    }
                    else{//fire click
                        obj.fireClick();
                    }
                }

                obj.isTouchMoving=false;
                obj.isTouchScaling=false;
            }
        });
    }
    else{
        obj.starts = [];
        obj.mouseDownMoves = [];
        obj.ends = [];
        obj.IsMouseDown = false;
        obj.isMouseDownMoving=false;
        obj.addEventListener("mousedown", function (event) {
            var e = Elf.getEvent(event);
            Elf.stopPop(e);
            var startInfo={};
            startInfo.x=e.pageX;
            startInfo.y=e.pageY;
            startInfo.time=(new Date()).getTime();
            startInfo.prev=obj.starts[obj.starts.length-1];
            obj.starts.push(startInfo);

            obj.IsMouseDown = true;

        });
        obj.addEventListener("mousemove", function (event) {
            var e = Elf.getEvent(event);
            Elf.stopPop(e);
            if(obj.IsMouseDown){
                var moveInfo={};
                moveInfo.distance={
                    x:e.pageX - obj.starts[obj.starts.length-1].x,
                    y:e.pageY - obj.starts[obj.starts.length-1].y
                };
                moveInfo.time=(new Date()).getTime();
                moveInfo.prev=obj.mouseDownMoves[obj.mouseDownMoves.length-1];
                obj.mouseDownMoves.push(moveInfo);

                if(Math.pow(moveInfo.distance.x,2)+Math.pow(moveInfo.distance.y,2)>Elf.xEvents.MinMoveDistance){
                    obj.isMouseDownMoving=true;
                }
                obj.fireDrag(moveInfo.distance);
            }
        });
        obj.addEventListener("mouseup", function (event) {
            var e = Elf.getEvent(event);
            Elf.stopPop(e);
            var endInfo={};
            endInfo.x=e.pageX;
            endInfo.y=e.pageY;
            endInfo.time=(new Date()).getTime();
            endInfo.prev=obj.ends[obj.ends.length-1];
            obj.ends.push(endInfo);

            if(obj.isMouseDownMoving){
                if(endInfo.time-obj.starts[obj.starts.length-1].time<Elf.xEvents.MaxSwipeTouchSpan){//fire swipe
                    var distance={
                        x:endInfo.x - obj.starts[obj.starts.length-1].x,
                        y:endInfo.y - obj.starts[obj.starts.length-1].y
                    };
                    obj.fireSwipe(distance);
                }
                //fire drag end
                obj.fireDragEnd();
            }
            else{
                if(endInfo.prev){
                    var timeSpan=endInfo.time-endInfo.prev.time;
                    if(timeSpan<Elf.xEvents.MinTouchSpan){
                        //ignore
                    }
                    else if(timeSpan<Elf.xEvents.MaxDoubleTouchSpan){//fire double click
                        obj.fireDblClick();
                    }
                    else{//fire click
                        obj.fireClick();
                    }
                }
                else{//fire click
                    obj.fireClick();
                }
            }

            obj.IsMouseDown = false;
            obj.isMouseDownMoving=false;

        });
        obj.addEventListener("DOMMouseScroll", function (event) {// Firefox scroll
            var e = Elf.getEvent(event);
            Elf.stopPop(e);
            //Elf.xEvents.stopPop(event);

            var rate;
            if(e.detail<0){
                rate=Elf.xEvents.DefaultScalingRoll;
            }
            else{
                rate=Elf.xEvents.DefaultScalingRoll*(-1);
            }

            obj.fireScale(rate);
        });
        obj.addEventListener("mousewheel", function (event) {// Others scroll
            var e = Elf.getEvent(event);
            Elf.stopPop(e);
            //Elf.xEvents.stopPop(event);

            var rate;
            if(e.wheelDelta>0){
                rate=Elf.xEvents.DefaultScalingRoll;
            }
            else{
                rate=Elf.xEvents.DefaultScalingRoll*(-1);
            }

            obj.fireScale(rate);
        });
    }
};

Elf.xEvents.bindDispatcher=function(obj){
    if(!obj.isDispatcherBinded){
        Elf.xEvents.eventDispatcher(obj);
    }
};
/*
 * 绑定 xClick事件 建议使用  Elf.xEvents.bind
 * TODO delete from 2.0 
 **/
Elf.xEvents.onXClick = function (obj, action) {
    obj.addEventListener("xClick",action);
    Elf.xEvents.bindDispatcher(obj);
};
/*
 * 绑定 xDblClick事件 建议使用  Elf.xEvents.bind
 * TODO delete from 2.0 
 **/
Elf.xEvents.onXDblClick = function (obj, action) {
    obj.addEventListener("xDblClick",action);
    Elf.xEvents.bindDispatcher(obj);
};
/*
 * 绑定 xDragging事件 建议使用  Elf.xEvents.bind
 * TODO delete from 2.0 
 **/
Elf.xEvents.onXDragging = function (obj, action,end) {
    obj.addEventListener("xDragging",action);
    obj.addEventListener("xDragEnd",end);
    Elf.xEvents.bindDispatcher(obj);
};
/*
 * 绑定 xSwipe事件 建议使用  Elf.xEvents.bind
 * TODO delete from 2.0 
 **/
Elf.xEvents.onXSwipe = function (obj, action) {
    obj.addEventListener("xSwipe",action);
    Elf.xEvents.bindDispatcher(obj);
};
/*
 * 绑定 xScale事件 建议使用  Elf.xEvents.bind
 * TODO delete from 2.0 
 **/
Elf.xEvents.onXScaling = function (obj, action) {
    obj.addEventListener("xScale",action);
    Elf.xEvents.bindDispatcher(obj);
};
Elf.xEvents.stopPop=function(event){
    var e = Elf.getEvent(event);
    Elf.stopPop(e);
};
/*
 * 绑定事件（支持自定义事件，xDragging，xClick，xDblClick，xSwipe，transitionend）
 * create from 2.0
 **/
Elf.xEvents.bind=function(el,types,handler){
    el.binded=el.binded||{};    
    switch (types) {
        case 'xDragging':
            if(handler.length>1){
                el.addEventListener("xDragging",handler[0]);
                el.addEventListener("xDragEnd",handler[1]);
            }else{
                el.addEventListener("xDragging",handler);
            }
            Elf.xEvents.bindDispatcher(el);
            break;
        case 'xClick':
            el.addEventListener(types,handler);
            Elf.xEvents.bindDispatcher(el);
            break;
        case 'xDblClick':
            el.addEventListener(types,handler);
            Elf.xEvents.bindDispatcher(el);
            break;
        case 'xSwipe':
            el.addEventListener(types,handler);
            Elf.xEvents.bindDispatcher(el);
            break;
        case 'xScale':
            el.addEventListener(types,handler);
            Elf.xEvents.bindDispatcher(el);
            break;
        case 'transitionend':
            var transitionend =Elf.xEvents.PrefixTransitionEnd();
            el.addEventListener(transitionend,handler);
            break;
        default:
            types=types.split(" ");
            Elf.utils.each(types,function(index,type){
                /*var oldHander=handler;
                if(type=="click"){
                    handler=function(){
                        Elf.xEvents.delayClick.set(oldHander,arguments[0]);
                    };
                }
                if(type=="dblclick"){
                    handler=function(){
                        Elf.xEvents.delayClick.clear();
                        oldHander.call(this,arguments[0]);
                    };
                }*/
                el.binded[type]=handler;
                if(el.addEventListener){
                    el.addEventListener(type,handler,false);                    
                }else if(el.attachEvent){
                    el.attachEvent(type,handler);
                }else{
                    el["on"+type]=handler;
                }
            });
            /*if(types.split(" ").length>1){
                types=types.split(" ");
                Elf.utils.each(types,function(index,obj){
                    el.addEventListener(obj,handler);
                });
            }else{
                el.addEventListener(types,handler);
            }*/
            break;
    }
};
/*
 * 取消绑定事件
 * create from 2.0
 * TODO 绑定事件需要添加元素已绑定的事件列表（事件类型，回调函数）然后执行解绑动作，如果没有传事件类型，则解绑所有绑定的方法，
 **/
Elf.xEvents.unBind=function(el,types,handler){
    switch (types) {
        case 'transitionend':
            var transitionend =Elf.xEvents.PrefixTransitionEnd();
            if (el.removeEventListener ) {
                el.removeEventListener( types, handler );
            }
            break;
        default:
            el.removeEventListener(types,handler);
            break;
    }
};
Elf.xEvents.addEvent=function(el,eventType,handler){
    if(el.addEventListener){
        //这个表示在做兼容测试。非ie下有这个属性。所以有这个属性的就是非ie浏览器
        el.addEventListener(eventType,handler,false);
        //非ie下添加事件
    }else{
        //else情况下，就说明当前的浏览器是ie浏览器
        if(el.attachEvent){
            //这个if语句可以去掉。。它也是在做测试，测试当前的浏览器是否有这个属性
            eventType="on"+eventType;//ie浏览器下的事件都要用一个on，
            el.attachment(eventType,handler);//这个貌似是自己写的函数。。不知道用来做说明的
        }else{
            el["on"+eventType]=handler;//ie下的事件添加
        }
    }
};
Elf.xEvents.delayClick={
    _t:null,
    set:function(fn,args){
        this.clear();
        this._t=window.setTimeout(function(){fn.call(this,args);},Elf.xEvents.MaxDoubleTouchSpan);
    },
    clear:function(){
        if(this._t){
            this._t=window.clearTimeout(this._t);
        }
    }
};
Elf.xEvents.one=function(el,types,handler){
    el.bindedHandler=handler;
    var once=function(evt){
        if(this.binded[types]){
            Elf.xEvents.unBind(this,evt.type,once);
            delete this.binded[evt.type];
        }
        handler(evt);
    };
    Elf.xEvents.bind(el,types,once);
};