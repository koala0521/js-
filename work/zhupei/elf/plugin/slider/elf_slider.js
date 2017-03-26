Elf.controls.slider = function (uArgs) {
    var sliderStyle=uArgs["sliderStyle"];
    var sliderData=uArgs["sliderData"];
    var startIndex=uArgs["startIndex"];

    var slider = Elf.controls({
        name: "div",
        className: "elf_slider "+sliderStyle
    });

    slider.content=Elf.createChild(slider,{
        name: "div",
        className: "elf_slider_content full"
    });

    slider.indicator=Elf.createChild(slider,{
        name: "hDiv",
        className: "parallelSpaceBetween perpendicularCenter elf_slider_indicator"
    });

    slider.indicator.text=Elf.createChild(slider.indicator,{
        name: "div",
        className: "elf_slider_indicator_text"
    });

    slider.indicator.markers=Elf.createChild(slider.indicator,{
        name: "hDiv",
        className: "parallelCenter perpendicularCenter elf_slider_indicator_markers"
    });

    slider.frameList=[];
    slider.markerList=[];

    slider.currentFrame=null;
    slider.currentMarkder=null;
    slider.currentIndex=-1;

    Elf.algorithm.iterateValues({
        collection: sliderData,
        handler: function (item) {
            var frame=Elf.controls.sliderFrame(item);
            frame.bindedData=item;
            slider.content.appendChild(frame);
            slider.frameList.push(frame);

            var marker=Elf.controls.sliderMarker();
            slider.indicator.markers.appendChild(marker);
            slider.markerList.push(marker);

            Elf.xEvents.onXClick(marker, function() {
                slider.showFrame(marker.index);
            });

            frame.bindedMarker=marker;
            marker.bindedFrame=frame;

            slider.currentFrame=frame;
            slider.currentMarkder=marker;
            slider.currentIndex++;

            //slider.indicator.text.innerHTML=item["text"];
        }
    });

    Elf.algorithm.buildClosedDoublyLink(slider.frameList);
    Elf.algorithm.buildClosedDoublyLink(slider.markerList);

    //console.log(slider.markerList);

    slider.showFrame=function(index){
        slider.currentIndex=index%sliderData.length;
        //console.log(slider.currentIndex);

        var frame=slider.frameList[slider.currentIndex];
        Elf.effects.singleSelect(frame,slider.frameList,"elf_slider_show");

        var marker=slider.markerList[slider.currentIndex];
        Elf.effects.singleSelect(marker,slider.markerList,"elf_slider_marker_selected");

        frame.style.cssText+="opacity:0.1;";
        setTimeout(function(){
            Elf.effects({
                effectName:"changeStyle",
                effectArgs:{
                    targetObj:frame,
                    duration:Elf.effects.DefaultDuration*3,
                    css:"opacity:1;"
                }
            });
        },300);

        slider.indicator.text.innerHTML=frame.bindedData["text"];
    };

    slider.showNextFrame=function(){
        slider.showFrame(slider.currentIndex+1);
    };

    slider.showPrevFrame=function(){
        slider.showFrame(slider.currentIndex-1);
    };

    slider.showFrame(startIndex);

    slider.start=function(){
        slider.timer=setInterval(function(){
            slider.showNextFrame();
        },5000);
    };

    slider.stop=function(){
        if(slider.timer){
            clearInterval(slider.timer);
        }
    };

    return slider;
};

Elf.controls.sliderFrame = function (frameData) {
    var frame = Elf.controls({
        name: "div",
        className: "elf_slider_frame hide"
    });

    frame.pic=Elf.createChild(frame,{
        name: "img",
        initProps:{
            src:frameData["pic"]
        }
    });

    return frame;
};

Elf.controls.sliderMarker = function () {
    var marker = Elf.controls({
        name: "div",
        className: "elf_slider_marker"
    });

    return marker;
};