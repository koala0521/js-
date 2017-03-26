Elf.cssText = function () {};
Elf.cssText.duration = function (duration) {
	duration=duration||Elf.effects.DefaultDuration;
    var css = "-webkit-transition-duration:" + duration + "s;";
    css += "-moz-transition-duration:" + duration + "s;";
    css += "-ms-transition-duration:" + duration + "s;";
    css += "-o-transition-duration:" + duration + "s;";
    css += "transition-duration:" + duration + "s;";
	/*var css = "-webkit-transition: all " + duration + "s ease-in;";
	css += "-moz-transition: all " + duration + "s ease-in;";
	css += "-ms-transition: all " + duration + "s ease-in;";
	css += "-o-transition: all " + duration + "s ease-in;";
	css += "transition: all " + duration + "s ease-in;";*/
    return css;
};
/**
 * 	PrefixStyle
 *	根据浏览器，添加CSS属性前缀,如果不匹配属性，则不修改,
 *	可处理根据浏览器环境差异的样式属性问题。仅适配属性名称的不同的场景
 *	@version 2.0
 *	@parameters
 *		style em:transition-duration
 *	TODO need test
 **/
Elf.cssText.prefixStyle=function(role){
	var subName="";
	Elf.utils.each(role.split("-"),function(index,obj){
		subName+=obj.substring(0,1).toUpperCase() + obj.substring(1);
	});
	var style=document.createElement("div").style;
	var names={
		Webkit:"Webkit",
		Moz:"Moz",
		O:"O",
		Ms:"Ms"
	};
	for(var s in names){
	    if(Object.prototype.hasOwnProperty.call(names,s) && typeof style[s+subName] === "string"){
	        return s+subName;
	    }
	}
	return role;
};
Elf.cssText.leftTopPosition = function (left, top) {
    return 'position:absolute;left:' + left + ';' + 'top:' + top + ";";
};
Elf.cssText.absoluteCenter = function (obj) {
    var parent=obj.parentNode;
    var left=(-1)*(obj.offsetWidth-parent.offsetWidth)/2;
    var top=(-1)*(obj.offsetHeight-parent.offsetHeight)/2;
    return 'position:absolute;margin: auto;left:' + left + 'px;' + 'top:' + top + "px;";
};
Elf.cssText.scale = function (scale) {
    var css = "-webkit-transform:scale(" + scale + ");";
    css += "-moz-transform:scale(" + scale + ");";
    css += "-ms-transform:scale(" + scale + ");";
    css += "-o-transform:scale(" + scale + ");";
    css += "transform:scale(" + scale + ");";
    return css;
};
Elf.cssText.transformWithScale = function (tx,ty,scale) {
    var css = "-webkit-transform:scale(" + scale + ") translate("+tx/scale+"px,"+ty/scale+"px"+"); ";
    css += "-moz-transform:scale(" + scale + ") translate("+tx/scale+"px,"+ty/scale+"px"+");";
    css += "-ms-transform:scale(" + scale + ") translate("+tx/scale+"px,"+ty/scale+"px"+");";
    css += "-o-transform:scale(" + scale + ") translate("+tx/scale+"px,"+ty/scale+"px"+");";
    css += "transform:scale(" + scale + ") translate("+tx/scale+"px,"+ty/scale+"px"+");";
    return css;
};
Elf.cssText.rotate = function (rx,ry) {
    var css = "-webkit-transform:rotateX("+rx+"deg) rotateY("+ry+"deg);";
    css += "-moz-transform:rotateX("+rx+"deg) rotateY("+ry+"deg);";
    css += "-ms-transform:rotateX("+rx+"deg) rotateY("+ry+"deg);";
    css += "-o-transform:rotateX("+rx+"deg) rotateY("+ry+"deg);";
    css += "transform:rotateX("+rx+"deg) rotateY("+ry+"deg);";
    return css;
};