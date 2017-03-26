Elf.controls.progress = function (progressStyle) {
    var progress = Elf.controls({
        name: "div",
        className: "elf_progress "+progressStyle
    });

    progress.content=Elf.createChild(progress,{
        name: "div",
        className: "absoluteCenter elf_progress_content"
    });

    progress.content.solid=Elf.createChild(progress.content,{
        name: "hDiv",
        className: "parallelCenter perpendicularCenter elf_progress_content_solid"
    });

    progress.solidTextWrapper=Elf.createChild(progress,{
        name: "div",
        className: "absoluteCenter full"
    });
    progress.solidText=Elf.createChild(progress.solidTextWrapper,{
        name: "hDiv",
        className: "parallelCenter perpendicularCenter full elf_progress_solidText",
        initProps:{
            innerHTML:"0%"
        }
    });
    progress.setPercent=function(p){
        progress.content.solid.style.cssText+=";width:"+p;
        progress.solidText.innerHTML=p;
    };

    //progress.setPercent(percent);

    return progress;
};