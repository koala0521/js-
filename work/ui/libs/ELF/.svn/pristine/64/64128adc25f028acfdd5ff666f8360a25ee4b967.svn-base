Elf.webSocket.sendMessage=function(wsUrl,args,callback){
    if (!window.WebSocket) {
        Elf.components.toast({text:Elf.constants.E006});
        return;
    }
    var ws = new WebSocket(wsUrl);
    ws.onopen = function () {
    	Elf.components.loading();
        ws.send(JSON.stringify(args));
    };
    ws.onclose = function () {
        Elf.components.loading("close",{});
    };
    ws.onmessage = function (event){
        ws.close();
        callback(JSON.parse(event.data));
    };
    ws.onerror = function (event) {
        Elf.components.toast({text:Elf.constants.E007});
        ws.close();
    };
};