//Elf.controls.cloudUploader = function (cloudService,token,uploaderStyle,accept) {
Elf.controls.cloudUploader = function (uArgs) {
    var uploaderStyle=uArgs["uploaderStyle"];
    var backgroundObj=uArgs["backgroundObj"];
    var acceptType=uArgs["acceptType"];
    var acceptTypeStr=uArgs["acceptTypeStr"];
    var sizeLimit=uArgs["sizeLimit"];
    var sizeLimitStr=uArgs["sizeLimitStr"];
    var service=uArgs["service"];
    var token=uArgs["token"];
    var bucketName=uArgs["bucketName"];
    var basePath=uArgs["basePath"];
    var onComplete=uArgs["onComplete"];

    var uploader = Elf.controls({
        name: "div",
        className: "elf_cloudUploader "+uploaderStyle
    });

    //console.log(uArgs);
    uploader.appendChild(backgroundObj);

    uploader.inputFile=Elf.createChild(uploader,{
        name: "file",
        className: "elf_cloudUploader_inputFile"
    });
    if(acceptType){
        uploader.inputFile.setAttribute("accept",acceptType);
    }
    uploader.inputFile.addEventListener("click",function(){
        uploader.inputFile.value=null;//for select same file
    });
    uploader.inputFile.addEventListener("change",function(){
        if(!uploader.inputFile.value) return;

        if(this.files){
            var file=this.files[0];
        }

        //console.log(file);
        //return;
        if(acceptType){
            if(acceptType.indexOf(file.type)<0){
                alert(acceptTypeStr);
                return;
            }
        }
        if(file.size<=0){
            alert("上传的文件内容不能为空");
            return;
        }
        if(file.size>sizeLimit){
            alert(sizeLimitStr);
            return;
        }

        var reader=new FileReader();
        reader.onload=function(){
            uploader.uploadFile(this.result,file.type,file.name);
        };
//      reader.readAsDataURL(file);
//      reader.readAsBinaryString(file);
        reader.readAsArrayBuffer(file);
    });

    uploader.uploadFile=function(arrayBuffer,type,name){
        //Elf.webSocket.init(uArgs["service"]);
        //Elf.webSocket.sendMessage(service,{
        //    serviceModule : 'US',
        //    serviceNumber : '0112000',
        //    token:token,
        //    args : {
        //        bucketName: bucketName,
        //        basePath: basePath,
        //        fileName: name
        //    }
        //}, function (result) {
        //    if (result["opFlag"] == "false") {
        //        alert(Elf.constants.E008 + result["errorMessage"]);
        //    }
        //    else {
        //        var data = JSON.parse(result["serviceResult"]);
        //
        //        var delay=500;//delay some time, or ios browser will crash for both loadmask and pop windows coexists
        //        setTimeout(function () {
        //
        //            if(data.status){
        //
        //                var blob = Elf.algorithm.getBlobByArrayBuffer(arrayBuffer, type);
        //
        //                var xhr = new XMLHttpRequest();
        //                var formData = new FormData();
        //                formData.append('OSSAccessKeyId',data["accessKeyId"]);
        //                formData.append('policy',data["policy"]);
        //                formData.append('Signature', data["signature"]);
        //                formData.append('key',data["key"]);
        //                formData.append('success_action_status', '201');
        //                formData.append('file', blob);
        //                xhr.open('post', data.action);
        //                xhr.onreadystatechange = function() {
        //                    if (xhr.readyState == 4){
        //                        document.body.removeChild(uploader.progress.WinHandler);
        //
        //                        if(xhr.status == 201) {
        //                            var txt = xhr.responseText;
        //                            var reg = /(<Location>(.*)<\/Location>)/;
        //                            var m = txt.match(reg);
        //                            var url=m[2];
        //
        //                            onComplete({url:url,name:name});
        //                            //callback({url:url,name:name});
        //                        }else{
        //                            alert(Elf.constants.E010);
        //                        }
        //                    }
        //                };
        //                xhr.upload.addEventListener('progress', function (evt) {
        //                    var percent=parseInt(evt.loaded*100/evt.total);
        //                    percent+="%";
        //                    uploader.progress.setPercent(percent);
        //                });
        //                xhr.send(formData);
        //
        //                uploader.progress=Elf.controls.progress("elf_cloudUploader_progress");
        //                Elf.controls.window(document.body,uploader.progress);
        //            }
        //            else{
        //                alert(Elf.constants.E009);
        //            }
        //
        //        }, delay);
        //
        //    }
        //});
        var args={
            serviceModule : 'US',
            serviceNumber : '0112000',
            token:token,
            args : {
                bucketName: bucketName,
                basePath: basePath,
                fileName: name
            }
        };
        Elf.components.ajax({
            type:"POST",
            url:service,
            dataType:"json",
            data:encodeURIComponent(JSON.stringify(args)),
            success:function(result){
                //var data = JSON.parse(result["serviceResult"]);
                var data=decodeURIComponent(result);
                data = JSON.parse(data);
                data=JSON.parse(data.serviceResult);

                var delay=500;//delay some time, or ios browser will crash for both loadmask and pop windows coexists
                setTimeout(function () {
                    if(data.status){
                        var blob = Elf.algorithm.getBlobByArrayBuffer(arrayBuffer, type);
                        var xhr = new XMLHttpRequest();
                        var formData = new FormData();
                        formData.append('OSSAccessKeyId',data["accessKeyId"]);
                        formData.append('policy',data["policy"]);
                        formData.append('Signature', data["signature"]);
                        formData.append('key',data["key"]);
                        formData.append('success_action_status', '201');
                        formData.append('file', blob);
                        xhr.open('post', data.action);
                        xhr.onreadystatechange = function() {
                            if (xhr.readyState == 4){
                                document.body.removeChild(uploader.progress.WinHandler);

                                if(xhr.status == 201) {
                                    var txt = xhr.responseText;
                                    var reg = /(<Location>(.*)<\/Location>)/;
                                    var m = txt.match(reg);
                                    var url=m[2];

                                    onComplete({url:url,name:name});
                                    //callback({url:url,name:name});
                                }else{
                                    alert(Elf.constants.E010);
                                }
                            }
                        };
                        xhr.upload.addEventListener('progress', function (evt) {
                            var percent=parseInt(evt.loaded*100/evt.total);
                            percent+="%";
                            uploader.progress.setPercent(percent);
                        });
                        xhr.send(formData);

                        uploader.progress=Elf.controls.progress("elf_cloudUploader_progress");
                        Elf.controls.window(document.body,uploader.progress);
                    }
                    else{
                        alert(Elf.constants.E009);
                    }

                }, delay);
            },
            error:function(xhr){
                //console.info(xhr);
                console.error(xhr);
                alert(Elf.constants.E009);
            }
        });
    };

    return uploader;
};