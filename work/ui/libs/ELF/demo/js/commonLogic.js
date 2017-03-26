var commonLogic = {};
commonLogic.serviceCaller = function (args,callback) {
    Elf.components.loading({
        //loadingimg:"../img/loading.png"
        loadingimg:"../libs/elf/img/loading.png"
    });
    args["TerminalType"]="";
    if(Elf.terminalInfo.IsIOS){
        args["TerminalType"]="B";
    }
    else if(Elf.terminalInfo.IsAndroid){
        args["TerminalType"]="C";
    }
    else{
        args["TerminalType"]="A";
    }
    //console.info(args);
    //console.info(JSON.stringify(args));
    Elf.components.ajax({
        type:"POST",
        url:Config.busUrl,
        dataType:"json",
        data:encodeURIComponent(JSON.stringify(args)),
        success:function(data){
            //console.log(data);
            //callback(JSON.parse(decodeURIComponent(data)));
            var result=JSON.parse(decodeURIComponent(data));
            //console.log(result);
            if (result["opFlag"] == "false") {
                alert(Elf.constants.E008 + result["errorMessage"]);
                if(result["errorMessage"].indexOf("E012-")>=0){
                    if(Elf.webCallApp){
                        var args={
                            "Command": "tokenInvalid",
                            "Args": ""
                        };
                        Elf.webCallApp(JSON.stringify(args));
                    }
                }
            }
            else {
                var resultObj = JSON.parse(result["serviceResult"]);
                var delay=500;//delay some time, or ios browser will crash for both loadmask and pop windows coexists
                setTimeout(function () {
                    callback(resultObj);
                }, delay);
            }
        },
        error:function(xhr){
            //console.info(xhr);
            console.error(xhr);
            alert(Elf.constants.E007);
        },
        complete:function(){
            Elf.components.loading("close",{});
        }
    });
};