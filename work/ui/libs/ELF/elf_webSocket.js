Elf.webSocket=function(){

};

Elf.webSocket.showLoading=function(){
    Elf.loadingTimer=setTimeout(function(){
        if(Elf.webCallApp){
            var args={
                "Command": "showLoading",
                "Args": ""
            };
            Elf.webCallApp(JSON.stringify(args));
        }
        else{
            if(!Elf.loadMask){
                Elf.loadMask=Elf.createChild(document.body,{
                    name: "div",
                    className:"loading"
                });
            }
        }
    },0);
};

Elf.webSocket.dismissLoading=function(){
    clearTimeout(Elf.loadingTimer);

    if(Elf.webCallApp){
        setTimeout(function(){
            var args={
                "Command": "dismissLoading",
                "Args": ""
            };
            Elf.webCallApp(JSON.stringify(args));
        },500);
    }
    else{
        if(Elf.loadMask){
            document.body.removeChild(Elf.loadMask);
            Elf.loadMask=null;
        }
    }
};

Elf.webSocket.sendMessage=function(wsUrl,args,callback){
    if (!window.WebSocket) {
        alert(Elf.constants.E006);
        return;
    }

    var ws = new WebSocket(wsUrl);
    ws.onopen = function () {
        Elf.webSocket.showLoading();
        ws.send(JSON.stringify(args));
    };
    ws.onclose = function () {
        Elf.webSocket.dismissLoading();
    };
    ws.onmessage = function (event) {
        Elf.webSocket.dismissLoading();
        ws.close();
        callback(JSON.parse(event.data));
    };
    ws.onerror = function (event) {
        Elf.webSocket.dismissLoading();
        ws.close();
        console.error(event);
        alert(Elf.constants.E007);
    };
};