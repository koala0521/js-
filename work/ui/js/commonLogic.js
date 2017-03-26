var commonLogic = {};
commonLogic.serviceCaller = function (args,callback) {
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
    Elf.components.ajax({
        type:"POST",
        url:Config.busUrl,
        dataType:"json",
        data:encodeURIComponent(JSON.stringify(args)),
        beforeSend:function(xhr, settings){
            Elf.components.loading();
        },
        success:function(data){
            var result=JSON.parse(decodeURIComponent(data.replace(/\+/g, '%20')));//解决空格变成+的问题
            if (result["opFlag"] == "false") {
                Elf.components.toast({text:Elf.constants.E008 + result["errorMessage"]});
                if(result["errorMessage"].indexOf("E012-")>=0){
                    if(Elf.webCallApp){
                        var args={
                            "Command": "tokenInvalid",
                            "Args": ""
                        };
                        Elf.webCallApp(JSON.stringify(args));
                    }
                }
            }else{
                var resultObj = JSON.parse(result["serviceResult"]);
                callback(resultObj);
            }
        },
        error:function(xhr){
            Elf.components.toast({text:Elf.constants.E007});
        },
        complete:function(){
            Elf.components.loading("close");
        }
    });
};

commonLogic.getNameByCodeInArray = function (code, arr) {
    var targetItem = null;
    Elf.algorithm.iterateValues({
        collection: arr,
        handler: function (item) {
            if (item["code"] == code) {
                targetItem = item;
            }
        }
    });
    return targetItem ? targetItem["name"] : "not found!";
};

commonLogic.getCodeByNameInArray = function (name, arr) {
    var targetItem = null;
    Elf.algorithm.iterateValues({
        collection: arr,
        handler: function (item) {
            if (item["name"] == name) {
                targetItem = item;
            }
        }
    });
    return targetItem ? targetItem["code"] : "not found!";
};

commonLogic.linkQuestions = function (questions) {
    questions.singleCollection = [];
    questions.twoPlusCollection = [];
    questions.judgmentCollection = [];
    questions.fillCollection = [];
    questions.onePlusCollection = [];
    for(var i=0;i<questions.length;i++){
        var quest=questions[i];
        quest.prev=questions[i-1];
        quest.next=questions[i+1];
        var questionTypeCode=quest["questionTypeCode"];
        switch(questionTypeCode){
            case "01":
                questions.singleCollection.push(quest);
                break;
            case "02":
                questions.twoPlusCollection.push(quest);
                break;
            case "03":
                questions.fillCollection.push(quest);
                break;
            case "04":
                questions.judgmentCollection.push(quest);
                break;
            case "05":
                questions.onePlusCollection.push(quest);
                break;
        }
    }
};