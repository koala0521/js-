//Elf.controls.radialProgress=function(diameter,solidColor,dashColor,solidRate,text,textClass) {
Elf.controls.radialProgress=function(rArgs) {
    var diameter=rArgs["diameter"];
    var diameterUnit=rArgs["diameterUnit"];
    var solidColor=rArgs["solidColor"];
    var dashColor=rArgs["dashColor"];
    var solidRate=rArgs["solidRate"];
    var text=rArgs["text"];
    var textClass=rArgs["textClass"];

    var radial = Elf.controls({
        name: "hDiv",
        className: "parallelCenter perpendicularCenter elf_radial"
    });
    radial.style.cssText="width: "+diameter+diameterUnit+";height: "+diameter+diameterUnit+";";

    var deg=-1;
    if(solidRate<=50){
        deg=90+solidRate*360/100;
        //console.log(deg);
        radial.style.cssText+="background-image: linear-gradient(90deg, "+dashColor+" 50%, transparent 50%, transparent), linear-gradient("+deg+"deg, "+solidColor+" 50%, "+dashColor+" 50%, "+dashColor+");";
    }else{
        deg=270+(solidRate-50)*360/100;
        radial.style.cssText+="background-image: linear-gradient("+deg+"deg, "+solidColor+" 50%, transparent 50%, transparent), linear-gradient(270deg, "+solidColor+" 50%, "+dashColor+" 50%, "+dashColor+");";
    }

    radial.textDiv = Elf.createChild(radial, {
        name: "hDiv",
        className: "parallelCenter perpendicularCenter "+textClass,
        initProps:{
            innerHTML:text
        }
    });
    //radial.textDiv.style.cssText="width: "+diameter*0.8+diameterUnit+";height: "+diameter*0.8+diameterUnit+";";
    radial.textDiv.style.cssText="width: "+diameter*0.85+diameterUnit+";height: "+diameter*0.85+diameterUnit+";";
    return radial;
};