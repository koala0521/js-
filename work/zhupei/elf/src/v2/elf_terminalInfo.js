Elf.terminalInfo = function () {};
(function(){
    var u=navigator.userAgent;
    Elf.terminalInfo.IsIE= u.indexOf('Trident') > -1;
    Elf.terminalInfo.IsOpera= u.indexOf('Presto') > -1;
    Elf.terminalInfo.IsWebKit= u.indexOf('AppleWebKit') > -1;
    Elf.terminalInfo.IsFireFox= u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1;
    Elf.terminalInfo.IsMobile= !!u.match(/AppleWebKit.*Mobile.*/);
    Elf.terminalInfo.IsIOS= !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    Elf.terminalInfo.IsAndroid= u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
    Elf.terminalInfo.IsIPhone= u.indexOf('iPhone') > -1;
    Elf.terminalInfo.IsIPad= u.indexOf('iPad') > -1;
//    Elf.terminalInfo.IsWebApp= u.indexOf('Safari') == -1;
    Elf.terminalInfo.IsMobile=Elf.terminalInfo.IsIOS||Elf.terminalInfo.IsIPhone||Elf.terminalInfo.IsIPad||Elf.terminalInfo.IsAndroid||Elf.terminalInfo.IsMobile;
})();

Elf.terminalInfo.testBrowserSupported=function(){   //是否是移动设备
    if(Elf.terminalInfo.IsMobile){
        return true;
    }

    var Browser = {};
    var ua = navigator.userAgent.toLowerCase();
    var s;
    (s = ua.match(/trident\/([\d]+)/)) ? Browser.trident = s[1] :
        (s = ua.match(/firefox\/([\d]+)/)) ? Browser.firefox = s[1] :
            (s = ua.match(/chrome\/([\d]+)/)) ? Browser.chrome = s[1] :
                (s = ua.match(/safari\/([\d]+)/)) ? Browser.safari = s[1] :0;
    //(s = ua.match(/opera.([\d]+)/)) ? Browser.opera = s[1] :
    //    (s = ua.match(/version\/([\d]+).*safari/)) ? Browser.safari = s[1] : 0;

    var result=false;

    //if(Browser.trident>=7 || Browser.firefox>=40 || Browser.chrome>=40 || Browser.opera>=40 || Browser.safari>=40) result=true;
    if(Browser.trident>=7 || Browser.firefox>=36 || Browser.chrome>=36 || Browser.safari>=600 ) result=true;

    return result;

    //if (Browser.trident) console.log('trident: ' + Browser.trident);
    //if (Browser.firefox) console.log('Firefox: ' + Browser.firefox);
    //if (Browser.chrome) console.log('Chrome: ' + Browser.chrome);
    //if (Browser.opera) console.log('Opera: ' + Browser.opera);
    //if (Browser.safari) console.log('Safari: ' + Browser.safari);
};

Elf.isBrowserSupported=Elf.terminalInfo.testBrowserSupported();

//Elf.terminalInfo.checkOnline = function () {
//    if(window.location.hostname=="localhost"){
//        return true;
//    }
//
//    var xhr=new XMLHttpRequest();
//    //console.log(window.location);
//    xhr.open("HEAD","//"+window.location.host+"/?rand="+Math.random(),false);
//    try {
//        xhr.send();
//        return ( xhr.status >= 200 && xhr.status < 300 || xhr.status === 304 );
//    } catch (error) {
//        return false;
//    }
//};

