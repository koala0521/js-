/*
 * Created by lijianwei on 2016/7/11.
 *
 * Ajax 异步加载
 * url String 默认: 当前地址,发送请求的地址
 * type String 请求方式 ("POST" 或 "GET")， 默认为 "GET"
 * data Object||String
 * async Boolean默认设置下，所有请求均为异步请求（也就是说这是默认设置为true）
 * cache Boolean default false (仅限于get请求)
 * dataType String TODO
 * xhr Function  默认 当可用的ActiveXObject（IE）中，否则为XMLHttpRequest回调创建XMLHttpRequest对象。当可用时默认为ActiveXObject（IE）中，否则为XMLHttpRequest。提供覆盖你自己的执行的XMLHttpRequest或增强工厂
 * timeout Number 暂时没有实现 TODO
 * error(jqXHR, textStatus, errorThrown)Function
 * contentType String 默认: 'application/x-www-form-urlencoded' 发送信息至服务器时内容编码类型。默认值是"application/x-www-form-urlencoded"，适合大多数情况。如果你明确地传递了一个content-type给 $.ajax() 那么他必定会发送给服务器（即使没有数据要发送）。数据将总是使用UTF-8字符集传递给服务器；你必须译码这适当的在服务器端
 * context 这个对象用于设置Ajax相关回调函数的上下文。也就是说，让回调函数内this指向这个对象（如果不设定这个参数，那么this就指向调用本次AJAX请求时传递的options参数）。比如指定一个DOM元素作为context参数，这样就设置了success回调函数的上下文为这个DOM元素
 * complete(jqXHR, textStatus)请求完成后回调函数 (请求成功或失败之后均调用)
 * abort 取消请求 TODO
 **/
(function(){
	function getXMLHttpRequest(){
		return window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
	}
	function formatParams(data) {
		var arr = [];
		for (var name in data) {
		    arr.push(name + "=" + data[name]);
		}
		return arr.join("&");
	}
    function post(target){
    	var opts=target.options;
        //target.xhr.setRequestHeader("Content-Type","text/plain;charset=UTF-8");//设置请求主体设置纯文本
    	target.xhr=getXMLHttpRequest();
    	target.xhr.open("POST",opts.url);
        //设置表单提交时的内容类型
        if(target.options.contentType){
            target.xhr.setRequestHeader("Content-Type",target.options.contentType);
        }    	
    	send(target,opts.data);
    }
    function get(target){
    	var opts=target.options;    	
		var args=formatParams(opts.data)||"";
		if(!opts.cache){
			var now=new Date().getTime();
			args +=Elf.utils.isEmpty(args)?"v="+ now:"&"+"v="+ now;
		}
    	target.xhr=getXMLHttpRequest();
    	var separator=target.options.url.indexOf("?") == -1 ? "?" : "&";
    	var url=args ? target.options.url+ separator + args : target.options.url;
    	target.xhr.open("GET", url, opts.async);
    	send(target,null);
    }
    function send(target,params){
    	beforeSend(target,params);
    	target.xhr.send(params);
    }    
    function beforeSend(target,params){
    	//绑定
		var opts=target.options;
    	target.xhr.onreadystatechange=function(){
    		if(target.xhr.readyState == 4){
    			complete(target,params);
    		}
    	};
    	if(opts.beforeSend){
			opts.beforeSend(target.xhr,params);
    	}
    }
    function complete(target){
		var opts=target.options;
    	var responseText=target.xhr.responseText;
    	if(typeof opts.complete == "function"){
			opts.complete.call(opts.context,target.xhr,target.xhr.status);
		}
    	if(target.xhr.status>=200 && target.xhr.status<300){
			opts.success.call(opts.context,responseText,target.xhr.responseXML,target.xhr);
		}else{
			opts.error.call(opts.context,target.xhr,target.xhr.status,target.xhr.error);
		}
    }
    Elf.utils.extend(Elf.components,{
        ajax:function(options,params){
            if (typeof options == 'string'){
                return Elf.components.ajax.methods[options](params);
            }
            var me={};
            me.options = Elf.utils.extend({
				url:"",
				type:"GET",
				data:"",
				dataType:"json",
				contentType:"text/plain;charset=UTF-8",
				context:document.body,
				async:true,
				cache:false,
				beforeSend:function(xhr,settings){},
				complete:function(xhr,status){},
				success:function(responseText,status,xhr){},
				error:function(xhr,status,errorThrown){},
				ontimeout:function(xhr){},
				onprogress:function(xhr){},
				onloadstart:function(xhr){},
				onloadend:function(xhr){},
				onload:function(xhr){},
				onerror:function(xhr){},
				onabort:function(xhr){}
			},Elf.components.ajax.defaults,options);
            if(me.options.type=="GET"){
        		get(me,params);
        	}else{
        		post(me,params);
        	}
            return me;
        }
    });
    Elf.components.ajax.defaults={};
    Elf.components.ajax.methods ={};
})(Elf);