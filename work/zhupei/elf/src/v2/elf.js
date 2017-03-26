/*
 * Elf root
 **/
(function(){
    if (!window.applicationCache) {
        alert("E001-检测到您的环境不支持HTML5，程序终止运行！");//不支持HTML5
        return;
    }

    var global = this;//create a pointer to the window root
    if (typeof Elf === 'undefined') {
        global.Elf = {};//create elf root if not existed
        //global.Elf=function(selector, context){
        //    return new Elf.fn.init(selector, context);
        //}
    }
    Elf.global = global;//add a pointer to window
})();

/*
 * adapter for browsers
 */

(function () {  
//    Elf.hasOwnProperty = Object.prototype.hasOwnProperty;
    Elf.getEvent = function (evt) {     //事件对象
        return evt ? evt : window.event;
    };
    Elf.getEventSource = function (evt) {   //事件源
        var event = Elf.getEvent(evt);
        return event.srcElement ? event.srcElement : event.target;
    };
    Elf.stopPop = function (evt) {      //阻止冒泡
        if (evt.stopPropagation) {
            evt.stopPropagation();
        } else {
            evt.cancelBubble = true;
        }
    };
})();
/*
* createChild
* TODO delete form 2.0
**/
Elf.createChild = function (targetObj, childArgs) {
    var child = Elf.controls(childArgs);
    targetObj.appendChild(child);
    return child;
};
Elf.doLayout = function () {//for IE, force to flush DOM,
    return document.body.scrollLeft;
};
/*定义布局库*/
Elf.layout ={};
/*定义组件库*/
Elf.components={};
/*定义 webSocket*/
Elf.webSocket=function(){};
/*Elf.regex={
    // Parse unit value
    numberAndUnit:/^([+-]?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?)([a-z%]*)$/i

    // Parse hex value
    , hex:/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i

    // Parse rgb value
    , rgb:/rgb\((\d+),(\d+),(\d+)\)/

    // Parse reference id
    , reference:/#([a-z0-9\-_]+)/i

    // Parse matrix wrapper
    , matrix:/matrix\(|\)/g

    // Elements of a matrix
    , matrixElements:/,*\s+|,/

    // Whitespace
    , whitespace:/\s/g

    // Test hex value
    , isHex:/^#[a-f0-9]{3,6}$/i

    // Test rgb value
    , isRgb:/^rgb\(/

    // Test css declaration
    , isCss:/[^:]+:[^;]+;?/

    // Test for blank string
    , isBlank:/^(\s+)?$/

    // Test for numeric string
    , isNumber:/^[+-]?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i

    // Test for percent value
    , isPercent: /^-?[\d\.]+%$/

    // Test for image url
    , isImage:/\.(jpg|jpeg|png|gif|svg)(\?[^=]+.*)?/i

    // The following regex are used to parse the d attribute of a path

    // Replaces all negative exponents
    , negExp:/e\-/gi

    // Replaces all comma
    , comma:/,/g

    // Replaces all hyphens
    , hyphen:/\-/g

    // Replaces and tests for all path letters
    , pathLetters:/[MLHVCSQTAZ]/gi

    // yes we need this one, too
    , isPathLetter:/[MLHVCSQTAZ]/i

    // split at whitespaces
    , whitespaces:/\s+/

    // matches X
    , X:/X/g
};*/