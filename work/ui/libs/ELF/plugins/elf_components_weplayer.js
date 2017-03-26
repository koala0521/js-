/**
 * Created by tuwenke on 2016/10/10.
 *
 * 各终端统一弱加密播放器
 *  WePlayer(options);
 *  @parameters
 *  args
 *      src:"src",要播放的视频
 *      width:num,视频宽度
 *      height:num, 视频高度
 *      暂不支持自动播放，因为Firefox的bug：自动播放上不会触发play事件。
 **/
Elf.components.wePlayer=function(args){
    var src=args["src"];

    var origPlayerWidth=args["width"];
    var origPlayerHeight=args["height"];

    var playerWidth=origPlayerWidth;
    var playerHeight=origPlayerHeight;

    var videoWidth=playerWidth;
    var videoHeight=playerHeight;

    var viewWidth=playerWidth;
    var viewHeight=playerHeight;

    window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", function(){
        resizePlayerWhenFullScreen();
    }, false);

    function setSize(target,width,height){
        target.setAttribute("width",width);
        target.setAttribute("height",height);
    }
    function resizePlayer(newWidth,newHeight){
        playerWidth=newWidth;
        playerHeight=newHeight;
        wrapper.style.cssText+="width:"+playerWidth+"px;height:"+playerHeight+"px;";
        calcViewSize(playerWidth,playerHeight,videoWidth,videoHeight);
        setSize(bufferCanvas,viewWidth,viewHeight);
        setSize(viewCanvas,viewWidth,viewHeight);
    }
    function resizePlayerWhenFullScreen(){
        if(wrapper.isFullScreen()){
            resizePlayer(window.screen.width,window.screen.height);
        }
    }
    function calcViewSize(pWidth,pHeight,vWidth,vHeight){//player's width and height is max values, video's width and height will be zoomed.
        if(vWidth/vHeight>=pWidth/pHeight){//zoom by width
            viewWidth=pWidth;
            viewHeight=viewWidth*(vHeight/vWidth);
        }
        else{//zoom by height
            viewHeight=pHeight;
            viewWidth=viewHeight*(vWidth/vHeight);
        }
    }
    function fullScreen(element) {
        //when modify following codes, must concern upper/lower case of "screen"
        var fullScreenMethod=element.requestFullscreen//W3C
                                ||element.webkitRequestFullScreen//Chrome
                                ||element.mozRequestFullScreen//FireFox
                                ||element.msRequestFullscreen;//IE11,Microsoft Edge
        fullScreenMethod.call(element);

        var screenWidth=window.screen.width;
        var screenHeight=window.screen.height;
        resizePlayer(screenWidth,screenHeight);
    }
    function exitFullScreen(){
        var exitFullScreenMethod=document.exitFullscreen//W3C
                                ||document.webkitCancelFullScreen//Chrome
                                ||document.mozCancelFullScreen//FireFox
                                ||document.msExitFullscreen;//IE11,Microsoft Edge
        exitFullScreenMethod.call(document);

        resizePlayer(origPlayerWidth,origPlayerHeight);
    }

    var wrapper=Elf.controls.createElement("div");
    wrapper.style.cssText="background-color:black;width:"+playerWidth+"px;height:"+playerHeight+"px;position:relative;";

    var video=Elf.controls.createElement("video");
    video.setAttribute("src",src);
    video.style.cssText="display: none;";
    video.crossOrigin="anonymous";
    Elf.controls.append(wrapper,video);
    wrapper.video=video;

    var bufferCanvas=Elf.controls.createElement("canvas");
    bufferCanvas.style.cssText="display: none;";
    Elf.controls.append(wrapper,bufferCanvas);
    var bufferContext=bufferCanvas.getContext("2d");

    var viewCanvas=Elf.controls.createElement("canvas","absoluteCenter");
    Elf.controls.append(wrapper,viewCanvas);
    var viewContext=viewCanvas.getContext("2d");

    video.addEventListener("play",function(){
        info.hide();
        timerCallBack();
    });
    function timerCallBack(){
        //console.log(1);
        if(video.paused){
            return;
        }
        computeFrame();
        setTimeout(function(){
            timerCallBack();
        },30);
    }
    function computeFrame(){
        bufferContext.drawImage(video,0,0,viewWidth,viewHeight);
        var frame=bufferContext.getImageData(0,0,viewWidth,viewHeight);
        //console.log(frame.data);

        for(var i= 0,n=frame.data.length;i<n;i+=4){
            frame.data[i]=255-frame.data[i];
            frame.data[i+1]=255-frame.data[i+1];
            frame.data[i+2]=255-frame.data[i+2];
        }
        viewContext.putImageData(frame,0,0);
    }
    video.addEventListener("loadedmetadata",function(evt){
        videoWidth=evt.target.videoWidth;
        videoHeight=evt.target.videoHeight;
        setSize(video,videoWidth,videoHeight);

        calcViewSize(playerWidth,playerHeight,videoWidth,videoHeight);
        setSize(bufferCanvas,viewWidth,viewHeight);
        setSize(viewCanvas,viewWidth,viewHeight);

        var control=Elf.components.wePlayerControl(wrapper);
        Elf.controls.append(wrapper,control);
    });
    video.addEventListener("pause",function(){
        info.show();
    });

    var waterMark=Elf.controls.createElement("div","elf_weplayer_waterMark");
    Elf.controls.append(wrapper,waterMark);

    var info=Elf.controls.createElement("div","absoluteCenter elf_weplayer_info");
    info.show=function(){
        info.style.cssText+=" display:inherit;";
    };
    info.hide=function(){
        info.style.cssText+=" display:none;";
    };
    Elf.controls.append(wrapper,info);
    info.content=Elf.controls.createElement("div","elf_weplayer_info_content");
    Elf.controls.append(info,info.content);
    info.play=Elf.controls.createElement("div","absoluteCenter elf_weplayer_info_play");
    Elf.controls.append(info.content,info.play);
    Elf.xEvents.bind(info.play,"click",function(event){
        event.stopPropagation();

        wrapper.video.play();
    });

    wrapper.isFullScreen=function(){
        var fullscreenElement = document.fullscreenElement //W3C
            || document.webkitFullscreenElement //Chrome
            || document.mozFullScreenElement //FireFox
            || document.msFullscreenElement;//IE11,Microsoft Edge
        return fullscreenElement!=null;
    };
    wrapper.play=function(){
        video.play();
    };
    wrapper.fullScreen=function(){
        fullScreen(wrapper);
    };
    wrapper.exitFullScreen=function(){
        exitFullScreen();
    };
    wrapper.adjustFullScreenStatus=function(){
        if(!wrapper.isFullScreen()){
            resizePlayer(origPlayerWidth,origPlayerHeight);
        }
    };

    return wrapper;
};

Elf.components.wePlayerControl=function(playerWrapper){
    function toDoubleNum(num){
        if(num>=10){
            return  num;
        }
        else if(num>=0){
            return "0"+num;
        }
        else{
            console.error("number is negative!");
        }
    }
    function videoTimeFormat(num){
        var numInt=parseInt(num);
        var hour=parseInt(numInt / 3600);
        var minute=parseInt( (numInt % 3600) / 60);
        var second=numInt % 60;
        var result="";
        if(hour>0){
            result+=hour+":";
        }
        result+=toDoubleNum(minute)+":";
        result+=toDoubleNum(second);
        return result;
    }
    function togglePlay(){
        if(playerWrapper.video.paused){
            playerWrapper.video.play();
        }
        else{
            playerWrapper.video.pause();
        }
        play.setUIByStatus();
    }

    Elf.xEvents.bind(playerWrapper,"click",function(event){
        event.stopPropagation();
        togglePlay();
    });
    //playerWrapper.addEventListener("click", function() {//W3C
    //    togglePlay();
    //});

    var controlWrapper=Elf.controls.createElement("div","elf_weplayer_controlWrapper animated slow fadeOut");
    controlWrapper.show=function(){
        controlWrapper.className="elf_weplayer_controlWrapper";
    };
    controlWrapper.hide=function(){
        controlWrapper.className="elf_weplayer_controlWrapper animated slow fadeOut";
    };
    Elf.xEvents.bind(controlWrapper,"mouseover",function(event){
        event.stopPropagation();
        controlWrapper.show();
    });
    Elf.xEvents.bind(controlWrapper,"mouseout",function(event){
        event.stopPropagation();
        controlWrapper.hide();
    });

    var control=Elf.controls.createElement("div","flex-box flex-justify-around flex-align-items-center elf_weplayer_control");
    Elf.controls.append(controlWrapper,control);

    var play=Elf.controls.createElement("div","elf_weplayer_play");
    play.setUIByStatus=function(){
        if(playerWrapper.video.paused){
            play.className="elf_weplayer_play";
        }
        else{
            play.className="elf_weplayer_play elf_weplayer_pause";
        }
    };
    Elf.controls.append(control,play);
    Elf.xEvents.bind(play,"click",function(event){
        event.stopPropagation();
        //if(playerWrapper.video.paused){
        //    playerWrapper.video.play();
        //}
        //else{
        //    playerWrapper.video.pause();
        //}
        //play.setUIByStatus();
        togglePlay();
    });

    var progress=Elf.controls.createElement("div","elf_weplayer_progress");
    Elf.controls.append(control,progress);
    progress.current=Elf.controls.createElement("div","elf_weplayer_progress_current");
    Elf.controls.append(progress,progress.current);
    progress.dragger=Elf.controls.createElement("div","elf_weplayer_progress_dragger");
    Elf.controls.append(progress,progress.dragger);
    progress.changeProgressUI=function(percent){
        progress.current.style.cssText="width:"+percent+"%;";
        progress.dragger.style.cssText="left:"+percent+"%;";
    };
    progress.setProgress=function(percent){
        progress.changeProgressUI(percent);
        playerWrapper.video.currentTime=playerWrapper.video.duration * percent /100;
    };
    Elf.xEvents.bind(progress,"click",function(event){
        event.stopPropagation();
        var rate=event.layerX/progress.scrollWidth;
        progress.setProgress(rate*100);
    });

    var time=Elf.controls.createElement("div","elf_weplayer_time");
    Elf.controls.append(control,time);

    playerWrapper.video.addEventListener("play",function(event){
        //console.log(event);
        controlWrapper.hide();
    });
    playerWrapper.video.addEventListener("pause",function(){
        controlWrapper.show();
    });

    Elf.xEvents.bind(playerWrapper.video,"timeupdate",function(event){
        event.stopPropagation();

        play.setUIByStatus();

        var currentTime=event.target.currentTime;
        var duration=event.target.duration;
        time.innerHTML=videoTimeFormat(currentTime)+"/"+videoTimeFormat(duration);

        progress.changeProgressUI((currentTime/duration)*100);
    });
    Elf.xEvents.bind(playerWrapper.video,"ended",function(event){
        event.stopPropagation();

        play.setUIByStatus();
        progress.setProgress(0);
        playerWrapper.video.play();
        playerWrapper.video.pause();
    });

    var fullScreen=Elf.controls.createElement("div","elf_weplayer_fullScreen");
    fullScreen.setUIByStatus=function(){
        if(playerWrapper.isFullScreen()){
            fullScreen.className="elf_weplayer_fullScreen elf_weplayer_normalScreen";
        }
        else{
            fullScreen.className="elf_weplayer_fullScreen";
        }
    };
    Elf.controls.append(control,fullScreen);
    Elf.xEvents.bind(fullScreen,"click",function(event){
        event.stopPropagation();

        if(playerWrapper.isFullScreen()){
            playerWrapper.exitFullScreen();
        }
        else{
            playerWrapper.fullScreen();
        }
        fullScreen.setUIByStatus();
    });

    document.addEventListener("fullscreenchange", function() {//W3C
        playerWrapper.adjustFullScreenStatus();
        fullScreen.setUIByStatus();
    });
    document.addEventListener("webkitfullscreenchange", function() {//Chrome,Microsoft Edge(Jesus!)
        playerWrapper.adjustFullScreenStatus();
        fullScreen.setUIByStatus();
    });
    document.addEventListener("mozfullscreenchange", function() {//Firefox
        playerWrapper.adjustFullScreenStatus();
        fullScreen.setUIByStatus();
    });
    document.addEventListener("MSFullscreenChange", function() {//IE11
        playerWrapper.adjustFullScreenStatus();
        fullScreen.setUIByStatus();
    });

    return controlWrapper;
};