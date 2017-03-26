/**
 * Elf root
 */
(function () {
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

/**
 * adapter for browsers
 */

(function () {
//    Elf.hasOwnProperty = Object.prototype.hasOwnProperty;
    Elf.getEvent = function (evt) {
        return evt ? evt : window.event;
    };
    Elf.getEventSource = function (evt) {
        var event = Elf.getEvent(evt);
        return event.srcElement ? event.srcElement : event.target;
    };
    Elf.stopPop = function (evt) {
        if (evt.stopPropagation) {
            evt.stopPropagation();
        } else {
            evt.cancelBubble = true;
        }
    };
})();
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