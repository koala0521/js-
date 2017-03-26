function doMinify(fileList){
    var pre=document.createElement("textarea");
    pre.style.cssText="width:500px;height:500px;";
    document.body.appendChild(pre);

    for(var i in fileList){
        if(fileList.hasOwnProperty(i)){
            var file=fileList[i];
            ajaxReadFile(file,pre);
        }
    }
}

function ajaxReadFile(file,pre){
    var xhr = new XMLHttpRequest();
    xhr.open('get', file,false);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status==200){
            pre.innerHTML+=xhr.responseText+"\n";
        }
    };
    xhr.send();
}