/**
 * Created by lijianwei on 2016/4/28.
 *
 */
Elf.utils=function(){
    var target = arguments[ 0 ] || {};
    if(typeof(target)==="String"){
        Elf.utils[target](arguments);
    }
};
/*
 * 确定JavaScript内置对象的类型，并返回小写形式的类型名称
 **/ 
Elf.utils.type=function(obj) {
    if ( obj == null ) {
        return obj + "";
    }
    var class2type={};
    var toString=class2type.toString;
    return typeof obj === "object" || typeof obj === "function" ? class2type[ toString.call( obj ) ] || "object" : typeof obj;
};
/*判断对象是否是window*/
Elf.utils.isWindow= function( obj ) {
    return obj != null && obj === obj.window;
};
/*
 * 判断是否为类数组对象,
 * 所谓"类数组对象"就是一个常规的Object对象，但它和数组对象非常相似：具备length属性，并以0、1、2、3……等数字作为属性名。
 * 不过它毕竟不是数组，没有从数组的原型对象上继承下来的内置方法(例如：push()、 sort()等)。
 * test pass
 **/
Elf.utils.isArrayLike=function(obj){
    var length = !!obj && "length" in obj && obj.length,
        type = Elf.utils.type( obj );
    if ( type === "function" || Elf.utils.isWindow( obj ) ) {
        return false;
    }
    return type === "array" || length === 0 || typeof length === "number" && length > 0 && ( length - 1 ) in obj;
};
/*
 * 判断是否是数字
 * test pass
 **/
Elf.utils.isNumeric= function( obj ) {
    var realStringObj = obj && obj.toString();
    return !Array.isArray( obj ) && ( realStringObj - parseFloat( realStringObj ) + 1 ) >= 0;
};
/*
 * 判断对象是否是函数
 * test pass
 **/
Elf.utils.isFunction=function( obj ) {
    return typeof obj === "function";
};
/*
 * 判断指定参数是否是一个纯粹的对象 
 * test pass
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
 * test pass 
 **/
Elf.utils.isEmptyObject= function( obj ) {
    var name;
    for ( name in obj ) {
        return false;
    }
    return true;
};
/*
 * 扩展对象
 * test pass 
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
    return target;
};
/*
 * 遍历数组或对象数组
 * create from 2.0
 **/
Elf.utils.each= function(obj,callback) {
    var length, i = 0;
    if ( Elf.utils.isArrayLike( obj ) ) {
        length = obj.length;
        for ( ; i < length; i++ ) {
            if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
                break;
            }
        }
    } else {
        for ( i in obj ) {
            if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
                break;
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
    return text == null ? "" :( text + "" ).replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "" );
};
/**
 * 将一个类数组对象转换为真正的数组对象 
 * 所谓"类数组对象"就是一个常规的Object对象，但它和数组对象非常相似：具备length属性，并以0、1、2、3……等数字作为属性名。
 * 不过它毕竟不是数组，没有从数组的原型对象上继承下来的内置方法(例如：push()、 sort()等)。
 * 
 **/
//TODO need test
Elf.utils.makeArray= function( arr, results ) {
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
 * 
 **/
//TODO need test
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
 **/
//TODO need test
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
 **/
//TODO need test
Elf.utils.map = function( elems, callback, arg ) {
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
            value = callback( elems[ i ], i, arg );
            if ( value != null ) {
                ret.push( value );
            }
        }
    }
    return Array.concat.apply( [], ret );
};
/*
 * 遍历兄弟元素,返回数组对象
 * create from 2.0
 **/
Elf.utils.siblings=function(el,param){
    var _array=[];
    var _ps=el.previousSibling;
    var _ns=el.nextSibling;
    while (_ps!=null){
        _array.push(_ps);
        _ps=_ps.previousSibling;
    }
    while (_ns!=null){
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
    var clazz=!!el.className?el.className.split(' '):[];
    for(var o in clazz){
        if(clazz[o]==names){
            return true;
            break;
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
        Elf.utils.each(el,function(index,obj){
            var classList=!!this.className?this.className.split(' '):[];
            if(!Elf.utils.hasClass(this,names)){
                classList.push(names);
                this.className=classList.join(' ');
            }
        });
    }else{
        var classList=!!el.className?el.className.split(' '):[];
        if(!Elf.utils.hasClass(el,names)){
            classList.push(names);
            el.className=classList.join(' ');
        }
    }
    return el;
};
/*
 * 删除el 类名
 * create from 2.0
 **/
Elf.utils.removeClass=function(el,names){
    if(el.length){
        Elf.utils.each(el,function(index,obj){
            var classList=!!this.className?this.className.split(' '):[];
            for(var o in classList){
                if(classList[o]==names){
                    classList.splice(o,1);
                }
            }
            this.className=classList.join(' ');
        });
    }else{
        var classList=!!el.className?el.className.split(' '):[];
        for(var o in classList){
            if(classList[o]==names){
                classList.splice(o,1)
            }
        }
        el.className=classList.join(' ');
    }
    return el;
};
/*
 * 删除节点
 * create from 2.0
 **/
Elf.utils.remove=function(el){
    if(el.parentNode){
        el.parentNode.removeChild( el );
        el=null;
    }
    return el;
};
/*
 * 适用于input
 * create from 2.0
 **/
//TODO need test
Elf.utils.getValue=function(el){
    return el.value;
};
/*
 * 设置或读取属性值操作
 * create from 2.0
 **/
Elf.utils.attr=function(el,name,value){
	value= typeof value=="number" ? value+"":value;
    if(value){
        el.setAttribute(name,value);
        return el;
    }else{
        return el.attributes[name]&&el.attributes[name].value?el.attributes[name].value:"";
    }
};
/*
 * 删除属性
 * create from 2.0
 **/
Elf.utils.removeAttr=function(el,name){
	el.removeAttribute(name);
};

/*
 * 设置CSS
 * create from 2.0
 * TODO
 **/
Elf.utils.css=function(el,styles){
    Elf.algorithm.iterateKeys({
        collection: styles,
        handler: function (key) {
            el.style[key] = styles[key];
        }
    });
    return el;
};
/*
 * 对象转换为&连接符字符串
 * create from 2.0
 **/
Elf.utils.object2requestSting=function(obj){
	var _s="";
	Elf.utils.iterate(obj,function(key,value){
		_s+=(_s && _s.length>0 ? "&" :"")+ key.toString()+"="+value;
	});
	return _s;
};
/*
 * 字符串转换为对象
 * create from 2.0
 **/
Elf.utils.requestSting2object=function(_s){
	var _obj={};
	var _arr=_s.split("&");
	Elf.utils.each(_arr,function(index,obj){
		var _a=obj.split("=");
		_obj[_a[0]]=_a[1]||"";
	});
	return _obj;
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
