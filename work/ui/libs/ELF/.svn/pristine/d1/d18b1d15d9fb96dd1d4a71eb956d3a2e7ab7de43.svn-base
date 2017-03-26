Elf.indexedDB=function(){
};

Elf.indexedDB.init=function(args){

    var dbName=args.dbName;
    var dbVersion=args.version;
    var upgradeHandler=args.upgradeHandler;
    var successHandler=args.successHandler;

    Elf.indexedDB.dbHandler = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
    if(!Elf.indexedDB.dbHandler)
    {
        alert(Elf.constants.E002);//不支持indexedDB本地存储
    }
    else{
        try{
            localStorage["testInit"]="testInit";
        }
        catch(e){
            alert(Elf.constants.E003);
            return;
        }

        var request=Elf.indexedDB.dbHandler.open(dbName,dbVersion);
        var db=null;
        request.onerror=function(event){
            alert(Elf.constants.E004);
            console.error(event);//读取离线数据库失败
        };
        request.onupgradeneeded=function(event){
            db=event.target.result;
            upgradeHandler(db);
        };
        request.onsuccess=function(event){
            db=event.target.result;
            successHandler(db);
        };
    }
};