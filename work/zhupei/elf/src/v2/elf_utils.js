/*
 * Created by lijianwei on 2016/4/28.
 */
Elf.utils={};
/*
 *  获取URL参数列表
 */
Elf.utils.getParams=function(){
    var search=window.location.search,params={},args,i,param;
    if(search && search.length){
        search=search.replace("?","");
        args=search.split("&");
        for(i=0;i< args.length;i++){
            param=args[i].split("=");
            params[param[0]] = param.length>1 ? param[1] : "";
        } 
        return params;
    }
    return "";
};
/*
*   获取Url参数值
*/
Elf.utils.getParam=function(key){
    var params=Elf.utils.getParams();
    return params ? params[key] || "" : "";
};
/*
 * 确定JavaScript内置对象的类型，并返回小写形式的类型名称
 * create from 2.0
 *
 **/
Elf.utils.type=function(obj) {
    if ( obj == null ) {
        return obj + "";
    }
    var class2type={},toString=class2type.toString;
    return typeof obj === "object" || typeof obj === "function" ? class2type[toString.call( obj ) ] || "object" : typeof obj;
};
/*
* 判断对象是否是window
**/
Elf.utils.isWindow= function( obj ) {
    return obj != null && obj === obj.window;
};
/*
 * 判断是否为类数组对象,
 * 所谓"类数组对象"就是一个常规的Object对象，但它和数组对象非常相似：具备length属性，并以0、1、2、3……等数字作为属性名。
 * 不过它毕竟不是数组，没有从数组的原型对象上继承下来的内置方法(例如：push()、 sort()等)。
 * create from 2.0
 **/
Elf.utils.isArrayLike=function(obj){
    var length = !!obj && "length" in obj && obj.length,type = Elf.utils.type( obj );
    if ( type === "function" || Elf.utils.isWindow( obj ) ) {
        return false;
    }
    return type === "array" || length === 0 || typeof length === "number" && length > 0 && ( length - 1 ) in obj;
};
/*
 * 判断是否是数字
 * create from 2.0
 **/
Elf.utils.isNumeric= function( obj ) {
    var realStringObj = obj && obj.toString();
    return !Array.isArray( obj ) && ( realStringObj - parseFloat( realStringObj ) + 1 ) >= 0;
};
Elf.utils.isPercent=function(obj){
    return /^-?[\d\.]+%$/.test(obj);
};
Elf.utils.isImage=function (obj) {
    return /\.(jpg|jpeg|png|gif|svg)(\?[^=]+.*)?/i.test(obj);
};
/*
*   合并数组并去重，支持String，返回数组
**/
Elf.utils.concat=function(a1,a2){
    a1=typeof a1=="string" ? (a1 || "").match(/\S+/g) || [""]:a1;
    a2=typeof a2=="string"?(a2 || "").match(/\S+/g) || [""]:a2;
    Elf.utils.each(a2,function(index,item){
        if(Elf.utils.inArray(item,a1) == -1){
            a1.push(item);
        }
    });
    return a1;
};
/*
*   删除数组中的元素，
**/
Elf.utils.reject=function(arg1,args2){
    arg1=typeof arg1=="string" ? (arg1 || "").match(/\S+/g) || [""]:arg1;
    args2=typeof args2=="string"?(args2 || "").match(/\S+/g) || [""]:args2;
    var array=[];
    Elf.utils.each(arg1,function(index,item){
        if(Elf.utils.inArray(item,args2) == -1){
            array.push(item);
        }
    });
    return array;
};

/*
 * 判断对象是否是函数
 * create from 2.0
 **/
Elf.utils.isFunction=function( obj ) {
    return typeof obj === "function";
};
/*
 * 判断指定参数是否是一个纯粹的对象
 * create from 2.0
 **/
Elf.utils.isPlainObject= function( obj ) {
    var key,class2type={};
    if ( Elf.utils.type( obj ) !== "object" || obj.nodeType || Elf.utils.isWindow( obj ) ) {
        return false;
    }
    if ( obj.constructor && !class2type.hasOwnProperty.call( obj, "constructor" ) && !class2type.hasOwnProperty.call( obj.constructor.prototype || class2type, "isPrototypeOf" ) ) {
        return false;
    }
    for ( key in obj ){}
    return key === undefined || Object.hasOwnProperty.call( obj, key );
};
/*
 * 判断是否是空对象
 * create from 2.0
 **/
Elf.utils.isEmptyObject= function( obj ) {
    var name;
    for ( name in obj ) {
        if(obj.hasOwnProperty(name)){
            return false;
        }
    }
    return true;
};
/*
 * 判断是否是空对象
 * create from 2.0
 **/
Elf.utils.isEmpty= function( obj ){
    if(typeof obj == "string"){
        var ss=Elf.utils.trim(obj);
        return ss.length>0?false:true;
    }else if(typeof obj =="object"){
        return Elf.utils.isEmptyObject(obj);
    }else if(typeof obj =="undefined"){
        return true;
    }else if(typeof obj =="boolean"){
        return !obj;
    }else if(typeof obj =="number"){
        return obj===0?true:false;
    }else{
        return obj||false;
    }
};
/*
 * 扩展对象
 * create from 2.0
 **/
Elf.utils.extend=function(){
    var options, name, src, copy, copyIsArray, clone,
        target = arguments[ 0 ] || {},
        i = 1,
        length = arguments.length,
        deep = false;
    if ( typeof target === "boolean" ) {
        deep = target;
        target = arguments[ i ] || {};
        i++;
    }
    if ( typeof target !== "object" && !Elf.utils.isFunction( target ) ) {
        target = {};
    }
    if ( i === length ) {
        target = this;
        i--;
    }
    for ( ; i < length; i++ ) {
        if ( ( options = arguments[ i ] ) != null ) {
            for ( name in options ) {
                if(options.hasOwnProperty(name)){
                    src = target[ name ];
                    copy = options[ name ];
                    if ( target === copy ) {
                        continue;
                    }
                    if ( deep && copy && ( Elf.utils.isPlainObject( copy ) || ( copyIsArray = Array.isArray( copy ) ) ) ) {
                        if ( copyIsArray ) {
                            copyIsArray = false;
                            clone = src && Array.isArray( src ) ? src : [];
                        } else {
                            clone = src && Elf.utils.isPlainObject( src ) ? src : {};
                        }
                        target[ name ] = Elf.utils.extend( deep, clone, copy );
                    } else if ( copy !== undefined ) {
                        target[ name ] = copy;
                    }
                }
            }
        }
    }
    return target;
};
/*
 * 遍历数组或对象数组
 * create from 2.0
 **/
Elf.utils.each= function(obj,callback){
    var length,
        i = 0;
    if ( Elf.utils.isArrayLike(obj)){
        length = obj.length;
        for ( ; i < length;i++) {
            if ( callback.call( obj[i],i,obj[i]) === false) {
                break;
            }
        }
    } else {
        for (i in obj){
            if(Object.prototype.hasOwnProperty.call(obj,i)){
                if(callback.call(obj[i],i,obj[i]) === false){
                    break;
                }
            }
        }
    }
    return obj;
};
/*
 * 遍历对象操作
 * create from 2.0
 **/
Elf.utils.iterate = function(obj,callback){
    for(var key in obj){
        if (key.toString()!="length" && Object.prototype.hasOwnProperty.call(obj, key)){
        	callback.call(obj[key],key,obj[key]);
        }
    }
};
/*
 * 删除左右空格
 * create from 2.0
 **/
Elf.utils.trim = function(text){
    return text == null ? "" :( text + "").replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"");
};
/*
 * 将一个类数组对象转换为真正的数组对象 
 * 所谓"类数组对象"就是一个常规的Object对象，但它和数组对象非常相似：具备length属性，并以0、1、2、3……等数字作为属性名。
 * 不过它毕竟不是数组，没有从数组的原型对象上继承下来的内置方法(例如：push()、 sort()等)。
 * create from 2.0
 * TODO need test
 **/
Elf.utils.makeArray= function( arr, results ){
    var ret = results || [];
    if ( arr != null ) {
        if ( Elf.utils.isArrayLike( Object( arr ) ) ) {
            Elf.utils.merge( ret,
                typeof arr === "string" ?
                    [ arr ] : arr
            );
        } else {
            Array.push.call( ret, arr );
        }
    }
    return ret;
};
/*
 * 确定第一个参数在数组中的位置(如果没有找到则返回 -1 )
 * create from 2.0
 **/
Elf.utils.inArray = function(elem,arr,i){
	var array=[];
    return arr == null ? -1 : array.indexOf.call(arr,elem,i);
};
/*
 * 用于合并两个数组的元素到第一个数组中
 * create from 2.0
 * @pa
 * 	第一个参数可以是数组或类数组对象
 * 	第二个参数则可以是数组、类数组对象
 * TODO need test
 **/
Elf.utils.merge = function(first,second){
    var len = +second.length,j = 0,i = first.length;
    for ( ; j < len; j++ ) {
        first[ i++ ] = second[ j ];
    }
    first.length = i;
    return first;
};
/*
 * 使用指定的函数过滤数组中的元素，并返回过滤后的数组，源数组不会受到影响，过滤结果只反映在返回的结果数组中
 * create from 2.0
 * TODO need test
 **/
Elf.utils.grep = function( elems, callback, invert ) {
    var callbackInverse,
        matches = [],
        i = 0,
        length = elems.length,
        callbackExpect = !invert;

    // Go through the array, only saving the items
    // that pass the validator function
    for ( ; i < length; i++ ) {
        callbackInverse = !callback( elems[ i ], i );
        if ( callbackInverse !== callbackExpect ) {
            matches.push( elems[ i ] );
        }
    }
    return matches;
};
/*
 * create from 2.0
 * TODO need test
 **/
/*Elf.utils.map = function( elems, callback, arg ) {
    var length, value,
        i = 0,
        ret = [];
    // Go through the array, translating each of the items to their new values
    if ( Elf.utils.isArrayLike( elems ) ) {
        length = elems.length;
        for ( ; i < length; i++ ) {
            value = callback( elems[ i ], i, arg );
            if ( value != null ) {
                ret.push( value );
            }
        }
        // Go through every key on the object,
    } else {
        for ( i in elems ) {
            if(elems.hasOwnProperty(i)){
                value = callback( elems[ i ], i, arg );
                if ( value != null ) {
                    ret.push( value );
                }
            }
        }
    }
    return Array.concat.apply( [], ret );
};*/
/*
 * 遍历兄弟元素,返回数组对象
 * create from 2.0
 **/
Elf.utils.siblings=function(el){
    var _array=[],
        _ps=el.previousSibling,
        _ns=el.nextSibling;
    while (_ps!=null){
        _array.push(_ps);
        _ps=_ps.previousSibling;
    }
    while(_ns!=null){
        _array.push(_ns);
        _ns=_ns.nextSibling;
    }
    return _array;
};
/*
 * 判断el是否有某类名
 * create from 2.0
 **/
Elf.utils.hasClass=function(el,names){
    var clazz=!!el.className?el.className.split(' '):[],o;
    for(o in clazz){
        if(clazz[o]==names){
            return true;
        }
    }
    return false;
};
/*
 * 为El添加类名，支持列表"a b c"
 * create from 2.0
 **/
Elf.utils.addClass=function(el,names){
    if(el.length){
        Elf.utils.each(el,function(index){
            return Elf.utils.addClass(el[index],names);
        });
    }
    var classList=!!el.className?el.className.split(' '):[];
    classList=Elf.utils.concat(classList,names);
    el.className=classList.join(' ');
    return el;
};
/*
 * 删除el 类名
 * create from 2.0
 **/
Elf.utils.removeClass=function(el,names){
    var classList;
    if(el.length){
        Elf.utils.each(el,function(index,obj){
            classList=!!obj.className?obj.className.split(' '):[];
            classList = Elf.utils.reject(classList,names);
            obj.className=classList.join(' ');
        });
    }else{
        classList=!!el.className?el.className.split(' '):[];
        classList = Elf.utils.reject(classList,names);
        el.className=classList.join(' ');
    }
    return el;
};
/*
 * 删除节点
 * create from 2.0
 **/
Elf.utils.remove=function(el){
    if(el && el.parentNode){
        el.parentNode.removeChild( el );
        el=null;
    }
    return el;
};
/*
* 查找当前元素的满足条件的父元素
* */
Elf.utils.closest=function(el,selector){
    var matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
    while (el) {
        if (matchesSelector.call(el, selector)){
            return el;
        } else {
            el = el.parentElement;
        }
    }
    return null;
};
/*
* 查找当前元素的在父元素中的索引
* */
Elf.utils.index=function(el){
    return Array.prototype.indexOf.call(el.parentNode.children,el);
};
/*
 * 适用于input
 * create from 2.0
 **/
Elf.utils.getValue=function(el){
    return el.value;
};
/*
 * 设置或读取属性值操作
 * create from 2.0
 **/
Elf.utils.attr=function(el,name,value){
	value= typeof value=="number" ? value+"":value;
    if(typeof value != "undefined"){
        el.setAttribute(name,value);
        return el;
    }else{
        return el.attributes[name]?el.attributes[name].value:"";
    }
};
/*
 * 删除元素的属性
 * create from 2.0
 **/
Elf.utils.removeAttr=function(el,name){
	el.removeAttribute(name);
};

/*
 * 设置CSS
 * create from 2.0
 **/
Elf.utils.css=function(el,styles){
    Elf.utils.iterate(styles,function (key){
        el.style[key] = styles[key];
    });
    return el;
};
/*
 * 对象转换为&连接符字符串
 * create from 2.0
 **/
Elf.utils.object2requestSting=function(obj){
    var arr = [];
    for (var n in obj) {
        arr.push(n + "=" + obj[n]);
    }
    return arr.join("&");
};
/*
 * 字符串转换为对象
 * create from 2.0
 **/
Elf.utils.requestSting2object=function(ss){
	var _obj={},_arr=ss.split("&");
	Elf.utils.each(_arr,function(index,obj){
		var _a=obj.split("=");
		_obj[_a[0]]=_a[1]||"";
	});
	return _obj;
};
/*
* 表单序列化
*/
Elf.utils.serialize=function(form){
    var _arr={};
    Elf.utils.each(form.elements,function(index,obj){
        if(!obj.disabled){
            if(obj.type=="text"||obj.type=="textarea"||obj.type=="hidden"||obj.type=="password"||obj.type=="color"||obj.type=="number"||obj.type=="date"||obj.type=="datetime"||obj.type=="datetime-local"||obj.type=="month"||obj.type=="week"||obj.type=="time"||obj.type=="email"||obj.type=="tel"||obj.type=="url"||obj.type=="search"||obj.type=="range"||obj.type=="select-one"){
                _arr[obj.name]=obj.value;
            }else if(obj.type=="radio" && obj.checked){
                _arr[obj.name]=obj.value;
            }else if(obj.type=="checkbox" && obj.checked){
                if(form.elements[obj.name].length){
                    if(_arr[obj.name] && _arr[obj.name].push){
                        _arr[obj.name].push(obj.value);
                    }else{
                        _arr[obj.name]=[];
                        _arr[obj.name].push(obj.value);
                    }
                }else{
                    _arr[obj.name]=obj.value;
                }
            }
        }
    });
    return _arr;
};

Elf.utils.serializeObject=function(form){
    var _arr=Elf.utils.serialize(form),_o={};
    Elf.utils.iterate(_arr,function(key,value){
        var _value=value;
        var _names=key.split(".");
        var length=_names.length;
        do{
            var name=_names[length-1];
            var temp={};
            temp[name]=_value;
            _value=temp;
            length--;
        }while (length>0);
       _o= Elf.utils.extend(true,_o,_value);
    });
    return _o;
};
Elf.utils.serializeArray=function(form){    //处理表单元素，返回一个对象，包含表单元素的name和value值，参数必须是一个form表单
    var _arr={};
    Elf.utils.each(form.elements,function(index,obj){
        if(!obj.disabled){
            if(obj.type=="text"||obj.type=="textarea"||obj.type=="hidden"||obj.type=="password"||obj.type=="color"||obj.type=="number"||obj.type=="date"||obj.type=="datetime"||obj.type=="datetime-local"||obj.type=="month"||obj.type=="week"||obj.type=="time"||obj.type=="email"||obj.type=="tel"||obj.type=="url"||obj.type=="search"||obj.type=="range"||obj.type=="select-one"){
                _arr[obj.name]=obj.value;
            }else if(obj.type=="radio" && obj.checked){
                _arr[obj.name]=obj.value;
            }else if(obj.type=="checkbox" && obj.checked){
                _arr[obj.name]=obj.value;
            }
        }
    });
    return _arr;
};
/*
* 表单数据映射填充
*/
Elf.utils.deserialize =function(form,data){
    form.reset();
    Elf.utils.iterate(data,function(key,value){
        var element=form.elements[key];
        if(element){
            switch (element.type || element[0].type){
                case "checkbox":
                    if(element.length){
                        Elf.utils.each(element,function(_index,_el){
                            for(var i=0;i<value.length;i++){
                                if(_el.value==value[i]){
                                    _el.checked=true;
                                    break;
                                }
                            }
                        });
                    }else{
                        if(element.value==value){
                            element.checked=true;
                        }
                    }
                break;
                case "radio":
                    Elf.utils.each(element,function(index,obj){
                        if(obj.value==value){
                            obj.checked=true;
                        }
                    });
                break;
                case "select-one":
                    for(var i=0;i<element.length;i++){
                        if(element[i].value==value){
                            element[i].selected=true;
                            break;
                        }
                    }
                break;
                default:
                    element.value=value;
                break;
            }
        }
    });
};
/*
* 表单预设，初始化事件，
*/
Elf.utils.formInitialization=function(form,config){
    if(config){
        Elf.utils.iterate(config,function(key,value){
            var element = form.elements[key],type=element.type||element[0].type;
            if(Elf.utils.isArrayLike(element) && type != "select-one"){
                Elf.utils.each(element,function(index,el){
                    Elf.utils.iterate(config[key],function(name,handler){
                        if(name=="defaultProcessor"){
                            if(typeof handler=="function"){
                                handler.call(el,form);
                            }
                        }else if(typeof handler =="function"){
                            Elf.xEvents.bind(el,name,function(evt){
                                handler.call(this,evt,this.value,form);
                            });
                        }else if(typeof handler=="string"){
                            Elf.utils.attr(el,name,handler);
                        }
                    });
                });
            }else{
                Elf.utils.iterate(config[key],function(name,handler){
                    if(name=="defaultProcessor"){
                        if(typeof handler=="function"){
                            handler.call(element,form);
                        }
                    }else if(typeof handler =="function"){
                        Elf.xEvents.bind(element,name,function(evt){
                            handler.call(element,evt,element.value,form);
                        });
                    }else if(typeof handler=="string"){
                        Elf.utils.attr(element,name,handler);
                    }
                });
            }
        });
    }
};
/*
* documentElement对象转换为DocumentFragment
**/
Elf.utils.toDocumentFragment=function(el){
    var _df=document.createDocumentFragment();
    while(el.children.length>0){        
        Elf.controls.appendTo(el.children[0],_df);
    }    
    return _df;
};
//支持参数字符串和key-value对象
Elf.utils.makeUrl=function(url,params){
    var _params={},_arr=url.split("?");
    url=_arr[0];
    if(_arr.length>1){
        _params=Elf.utils.requestSting2object(_arr[1]);
    }
    if(typeof params=="string"){
        //string 防止输入以?,&开始的参数列表，并转换为URL参数对象
        params=Elf.utils.requestSting2object(params.indexOf("?")==0||params.indexOf("&")==0?params.substring(1):params||"");
    }
    //合并参数
    params=!Elf.utils.isEmptyObject(_params)?Elf.utils.extend(_params,params):params;
    return url && url.indexOf("?")>0 ? url+"&"+Elf.utils.object2requestSting(params):url+"?"+Elf.utils.object2requestSting(params);
};
/*
 * 加密
 * create from 2.0
 **/
Elf.utils.encode=function(s){
	return encodeURIComponent(s).replace(/'/g,"%27").replace(/"/g,"%22");
};
/*
 * 解密
 * create from 2.0
 **/
Elf.utils.decode=function(s){
	return decodeURIComponent(s.replace(/\+/g," "));
};
/*
* 解析字符串xml
* contentType
*   text/xml,text/html
* */
Elf.utils.perser=function(text,contentType){
    var domParser = new DOMParser();
    return domParser.parseFromString(text,contentType);
};
/*
 * 模拟打开链接，设置打开方式
 * */
Elf.utils.openURL=function(url,target){
    var arr=url.split("?"),
        params=arr.length>1?arr[1]:"",
        form=Elf.controls.createElement("form",{action:arr[0],target:target,method:"get"});
        params=Elf.utils.requestSting2object(params);
    Elf.utils.iterate(params,function(key,value){
        var _in=Elf.controls.createElement("input",{type:"hidden",name:key,value:value});
        Elf.controls.appendTo(_in,form);
    });
    Elf.controls.appendTo(form,document.body);
    form.submit();
    Elf.utils.remove(form);
};
/*
*   模板数据映射Template data mapping
*       temp 表达式{命名规则(英文字母或下划线开始英文字母或数字组合命名)}，eg: 
*       data {}
*       eg:temp="共 <b>{total}</b> 条记录 <b>{totalPage}</b> 页",data={total:100,totalPage:10}  result="共 <b>100</b> 条记录 <b>10</b> 页"
*       表达式和对象属性命名区分大小写
*/
Elf.utils.getMatchedData=function(data,match){
    var attributes=match.split("."),result=data;
    Elf.utils.each(attributes,function(index,obj){
        result = typeof result == "object" && result.hasOwnProperty(obj) ? result[obj] : "";
    });
    //undefined转换为空
    result = typeof result == "undefined" ? "" : result;
    return result;
};
Elf.utils.templateDataMapping=function(temp,data){
    if(temp){
        var matches=temp.match(/{{[a-z_A-Z](\w+)?([\.][a-z_A-Z](\w+)?)*}}/g);
        Elf.utils.each(matches,function(index,match){
            temp=temp.replace(match,Elf.utils.getMatchedData(data,match.substring(2,match.length-2)));
        });
    }
    return temp;
};
//字符串替换
Elf.utils.replaceAll=function(temp,text,replaced){
    replaced=replaced||"";
    if(temp && text){
        var matches=temp.match(new RegExp(text,"g"));
        Elf.utils.each(matches,function(index,match){
            temp=temp.replace(match,replaced);
        });
    }
    return temp;
};
//检查是否支持
Elf.utils.support={
    touch : (window.Modernizr && Modernizr.touch === true) || (function () {
        return !!(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch);
    })(),
    transforms3d : (window.Modernizr && Modernizr.csstransforms3d === true) || (function () {
        var div = document.createElement('div').style;
        return ('webkitPerspective' in div || 'MozPerspective' in div || 'OPerspective' in div || 'MsPerspective' in div || 'perspective' in div);
    })()
};