/*
 * 创建元素，建议使用：Elf.controls.createElement
 * TODO delete from 2.0
 **/
Elf.controls = function (args) {
    var name = args["name"];
    var className = args["className"];
    var initProps = args["initProps"];

    var obj;
    switch (name) {
        case 'button':
            obj = document.createElement('input');
            obj.type = 'button';
            break;
        case 'submit':
            obj = document.createElement('input');
            obj.type = 'submit';
            break;
        case 'text':
            obj = document.createElement('input');
            obj.type = 'text';
            break;
        case 'search':
            obj = document.createElement('input');
            obj.type = 'search';
            break;
        case 'color':
            obj = document.createElement('input');
            obj.type = 'color';
            break;
        case 'file':
            obj = document.createElement('input');
            obj.type = 'file';
            break;
        case 'checkbox':
            obj = document.createElement('input');
            obj.type = 'checkbox';
            break;
        case 'radio':
            obj = document.createElement('input');
            obj.type = 'radio';
            break;
        case 'password':
            obj = document.createElement('input');
            obj.type = 'password';
            break;
        case 'hDiv':
            obj = Elf.controls({
                name: "div",
                className: "hFlex"
            });
            break;
        case 'hFullDiv':
            obj = Elf.controls({
                name: "div",
                className: "hFlex full"
            });
            break;
        case 'vDiv':
            obj = Elf.controls({
                name: "div",
                className: "vFlex"
            });
            break;
        case 'vFullDiv':
            obj = Elf.controls({
                name: "div",
                className: "vFlex full"
            });
            break;
        case 'hForm':
            obj = Elf.controls({
                name: "form",
                className: "hFlex"
            });
            break;
        case 'hFullForm':
            obj = Elf.controls({
                name: "form",
                className: "hFlex full"
            });
            break;
        case 'vForm':
            obj = Elf.controls({
                name: "form",
                className: "vFlex"
            });
            break;
        case 'vFullForm':
            obj = Elf.controls({
                name: "form",
                className: "vFlex full"
            });
            break;
        default:
            obj = document.createElement(name);
            break;
    }

    if (className) {
        obj.className = obj.className ? obj.className + " " + className : className;
    }

    if (initProps) {
        Elf.algorithm.copyProperties(obj, initProps);
    }

    return obj;
};
/*
 * 创建元素 from 2.0
 **/
Elf.controls.createElement=function(){
    var tagName = arguments[ 0 ],
        length = arguments.length,
        attr=length>1 && typeof arguments[ 1 ]=="object" && arguments[ 1 ] != null?arguments[ 1 ]:length>2 && typeof arguments[ 2 ]=="object" && arguments[ 2 ] != null ?arguments[ 2 ]||null:null,
        classLs=typeof arguments[ 1 ]=="string"?arguments[ 1 ]||"":length>2 && typeof arguments[ 2 ]=="string"?arguments[ 2 ]||"":"";

    var el=document.createElement(tagName);
    if(attr){
        Elf.algorithm.copyProperties(el, attr);
    }
    if(classLs){
        Elf.utils.addClass(el,classLs);
    }
    return el;
};
Elf.controls.window = function (container,contentObj) {
    var win = Elf.controls({
        name: "div",
        className: "window full"
    });
    win.background=Elf.createChild(win,{
        name: "div",
        className: "windowBackground full"
    });
    var content=Elf.createChild(win,{
        name: "hFullDiv",
        className: "parallelCenter perpendicularCenter windowContent"
    });
    content.appendChild(contentObj);
    contentObj.WinHandler=win;

    container.appendChild(win);
};

Elf.controls.goldenRatioBox = function (contentObj) {
    var wrapper = Elf.controls({
        name: "div",
        className: "goldenRatioBox"
    });
    var content=Elf.createChild(wrapper,{
        name: "div",
        className: "full"
    });
    wrapper.appendChild=content.appendChild;

    if(contentObj){
        content.appendChild(contentObj);
    }

    return wrapper;
};

Elf.controls.longRatioBox = function (contentObj) {
    var wrapper = Elf.controls({
        name: "div",
        className: "longRatioBox"
    });
    var content=Elf.createChild(wrapper,{
        name: "div",
        className: "full"
    });
    wrapper.appendChild=content.appendChild;

    if(contentObj){
        content.appendChild(contentObj);
    }

    return wrapper;
};
Elf.controls.comboBox=function(name,labelText,labelStyle,comboStyle,optionData,changeFunc){
    var combo=Elf.controls({
        name: "div",
        className:"inlineBlock"
    });

    combo.wrapper=Elf.createChild(combo,{
        name:"hDiv",
        className:"parallelEnd perpendicularStart"
    });

    if(labelText){
        combo.wrapper.label=Elf.createChild(combo.wrapper,{
            name:"hDiv",
            className:"parallelEnd perpendicularCenter "+labelStyle,
            initProps:{
                innerHTML:labelText
            }
        });
    }

    combo.wrapper.select=Elf.createChild(combo.wrapper,{
        name: "select",
        className:comboStyle,
        initProps:{
            name:name
        }
    });

    Elf.algorithm.iterateValues({
        collection: optionData,
        handler: function (item) {
            var option=Elf.createChild(combo.wrapper.select,{
                name:"option",
                initProps:{
                    value:item["code"],
                    innerHTML:item["name"]
                }
            });
            option.boundData=item;
        }
    });

    combo.getSelectedOption=function(){
        return combo.wrapper.select.options[combo.wrapper.select.selectedIndex];
    };

    combo.getBoundData=function(){
        var selectedOption=combo.getSelectedOption();
        if(selectedOption){
            return selectedOption.boundData;
        }
    };

    combo.getCode=function(){
        var boundData=combo.getBoundData();
        if(boundData){
            return boundData["code"];
        }
    };
    combo.getName=function(){
        var boundData=combo.getBoundData();
        if(boundData){
            return boundData["name"];
        }
    };
    combo.setValue=function(c){
        combo.wrapper.select.value=c;
    };

    combo.addEventListener("change",function(){

        var data=combo.getBoundData();

        if(changeFunc){
            changeFunc(data);
        }
    });
    return combo;
};

Elf.controls.checkBox=function(boxStyle,labelText,checkFunc){
    var checkbox=Elf.controls({
        name: "div",
        className:"inlineBlock skin_cursorHand skin_clickEffect"
    });

    checkbox.labelText=labelText;
    checkbox.wrapper=Elf.createChild(checkbox,{
        name:"hDiv",
        className:"parallelEnd perpendicularStart"
    });

    //checkbox.wrapper.box=Elf.createChild(checkbox.wrapper,{
    //    name: "checkbox",
    //    className:boxStyle,
    //    initProps:{
    //        name:name
    //    }
    //});
    //checkbox.getBox=function(){
    //    return checkbox.wrapper.box;
    //};
    checkbox.isChecked=false;
    checkbox.wrapper.box=Elf.createChild(checkbox.wrapper,{
        name: "div",
        className:"checkbox_box "+boxStyle,
        initProps:{
            name:name
        }
    });

    checkbox.setChecked=function(checked){
        if(checked){
            checkbox.isChecked=true;
            Elf.effects.appendClass(checkbox.wrapper.box,"checkbox_checked");
        }
        else{
            checkbox.isChecked=false;
            Elf.effects.removeClass(checkbox.wrapper.box,"checkbox_checked");
        }
        if(checkFunc){
            checkFunc(checkbox.isChecked);
        }
    };

    checkbox.toggleChecked=function(){
        checkbox.isChecked=!checkbox.isChecked;
        checkbox.setChecked(checkbox.isChecked);
    };

    checkbox.wrapper.label=Elf.createChild(checkbox.wrapper,{
        name:"hDiv",
        className:"parallelStart perpendicularCenter",
        initProps:{
            innerHTML:labelText
        }
    });

    Elf.xEvents.onXClick(checkbox,function(){
        //checkbox.wrapper.box.checked=!checkbox.wrapper.box.checked;
        //if(checkFunc){
        //    checkFunc();
        //}
        checkbox.toggleChecked();
    });

    return checkbox;
};
/*
 * 添加到父元素 from 2.0
 **/
Elf.controls.appendTo=function(el,parent){
    parent.appendChild(el);
    return el;
};
/*
 * 添加子元素 from 2.0
 **/
Elf.controls.append=function(el,child){
   return el.appendChild(child);
};
/*
 * 添加到父元素的第一个位置 from 2.0
 * TODO need test
 **/
Elf.controls.prependTo=function(el,parent){
	var first=parent.children[0];
	if(first){
		parent.insertBefore(el,first);
	}else{
		parent.appendChild(el);
	}
	return el;
};
/*
 * 在第一个位置添加子元素 from 2.0
 * TODO need test
 **/
Elf.controls.prepend=function(el,child){
	var first=el.children[0];
	if(first){
		return el.insertBefore(child,first);
	}else{
		return el.appendChild(child);
	}
};