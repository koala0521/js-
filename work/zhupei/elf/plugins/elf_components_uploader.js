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
    function beforeUSUpload(target,file,callback){
        options=target.options;
        var args={
            serviceModule : 'US',
            serviceNumber : options.serviceNumber,
            token:options.usToken,
            contentType:"",
            args : {
                bucketName: options.bucketName,
                basePath: options.basePath,
                fileName: file.name
            }
        };
        Elf.components.ajax({
            type:"POST",
            url:options.service,
            dataType:"json",
            data:encodeURIComponent(JSON.stringify(args)),
            success:function(result){
                var data=decodeURIComponent(result);
                data = JSON.parse(data);
                data=JSON.parse(data.serviceResult);
                if(data.status){
                    callback.call(target,data);
                }else{
                    Elf.components.toast({
                        text:Elf.constants.E009
                    });
                }
            },
            error:function(xhr){
                console.error(xhr);
                Elf.components.toast({
                    text:Elf.constants.E009
                });
            }
        });
    }
    function getFileType(file){
        return file && file.name?file.name.substring(file.name.lastIndexOf(".")):"";
    }
    //上传文件
    function upload(target,formData,action,file){
        var options=target.options;
        action=action||options.action;
        //console.info("start upload");
        Elf.components.ajax({
            type:"POST",
            url:action,
            dataType:"json",
            contentType:"",
            data:formData,
            beforeSend:options.beforeUpload,
            complete:function(xhr,status){
                if(typeof options.uploadComplete == "function"){
                    options.uploadComplete.call(options.context,xhr,status);
                }
            },
            success:function(result,status,xhr){
                //console.info("upload success");
                if(options.loaderType=="us"){
                    var reg = /(<Location>(.*)<\/Location>)/;
                    var m = result.match(reg);
                    result={url:m[2],name:file.name};
                }
                if(typeof options.uploadSuccess == "function"){
                    options.uploadSuccess.call(options.context,result,status,xhr);
                }
            },
            error:function(xhr,status){
                //console.info("upload error");
                options.uploadError.call(options.context,xhr,status);
            }
        });
    }
    function beforeUploadFile(target,buffer,file){
        var blob,formData,options=target.options;
        blob = Elf.algorithm.getBlobByArrayBuffer(buffer,file.type);
        formData = new FormData();
        formData["enctype"]="multipart/form-data";
        //阿里云上传需要先获取权限
        if(options.loaderType=="us"){
            beforeUSUpload(target,file,function(data){
                formData.append('OSSAccessKeyId',data["accessKeyId"]);
                formData.append('policy',data["policy"]);
                formData.append('Signature', data["signature"]);
                formData.append('key',data["key"]);
                formData.append('success_action_status', '201');
                formData.append('file', blob);
                //formData.append("allowSource",window.location.host);
                upload(target,formData,data.action,file);
            });
        }else{
        	//本地上传文件
            Elf.utils.iterate(options.data,function(key,value){
                formData.append(key,value);
            });
            //formData.append('file',file);
            formData.append(options.fieldName,file);
            upload(target,formData,options.action,file);
        }
    }
    function init(target){
    	var options=target.options;
        target.inputFile=Elf.controls.createElement("input",{type:"file"},"elf-uploader-file");
    	if(options.accept){
            Elf.utils.attr(target.inputFile,"accept",options.accept);
    	}
        if(options.renderTo){
            Elf.controls.appendTo(target.inputFile,options.renderTo);
        }
        Elf.xEvents.bind(target.inputFile,"click",function(evt){
            this.value=null;
        });
        Elf.xEvents.bind(target.inputFile,"click",function(evt){
            this.value=null;
        });
        Elf.xEvents.bind(target.inputFile,"change",function(evt){
            var file,reader;
            if(!target.inputFile.value){
                return;
            }
            if(this.files){
                file=this.files[0];
            }
            if(options.accept && options.accept.indexOf(getFileType(file))<0){
                Elf.components.toast({
                    text:Elf.utils.templateDataMapping(options.outOfAcceptMsg,options)
                });
                return;
            }
            if(file.size<=0){
                Elf.components.toast({
                    text:opts.noFileMsg
                });
                return;
            }
            if(file.size>options.size){
                Elf.components.toast({
                    text:options.outOfSizeMsg
                });
                return;
            }
            reader=new FileReader();
            reader.readAsArrayBuffer(file);
            reader.onload=function(){
                beforeUploadFile(target,this.result,file);
            };
        });
    }
    Elf.utils.extend(Elf.components,{
        uploader:function(options,params){
            if (typeof options == 'string'){
                return Elf.components.uploader.methods[options](params);
            }
            var me={};
            me.options = Elf.utils.extend({
                type:"POST",
                action:"",//本地上传使用
                data:"",
				accept:"",
				fieldName:"file",//本地上传文件时对应服务接收文件字段名称（file,excel)
				size:"1048576*200",//200M
                outOfAcceptMsg:"仅支持 {{accept}} 类型的文件",
                outOfSizeMsg:"不允许上传超过 200M 的文件！",
                noFileMsg:"上传的文件内容不能为空",
				contentType:"application/x-www-form-urlencoded",
				context:document.body,
                renderTo:"",
                loaderType:"",
                service:"http://192.168.1.25:5005/services",
                serviceNumber:"0112000",
                bucketName:"mvw-develop",
                basePath:"kevintest",
                token:"a9fc46ef-c73d-4c64-ad2c-7fdb5891b73f&type=mobile&p0latform=android",
                beforeUpload:"",
                beforeUpload:function(xhr,status){},
				uploadComplete:function(xhr,status){},
				uploadSuccess:function(result,status,xhr){},
				uploadError:function(xhr,status,errorThrown){},
				onprogress:function(xhr){},
				onerror:function(xhr){},
				onabort:function(xhr){}
			},Elf.components.uploader.defaults,options);
            init(me,params);
            return me;
        }
    });
    Elf.components.uploader.defaults={};
    Elf.components.uploader.methods ={};
})(Elf);