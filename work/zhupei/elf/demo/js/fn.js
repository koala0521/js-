/************************************************************
 * Created by lijianwei on 2016/12/15.
 ************************************************************/
/***********************************************************	
	格式化时间格式，用于评论时间，以分钟为单位的时间
	param format
 	yyyy-MM-dd hh:mm:ss
	YYYY年MM月dd日hh小时mm分ss秒
	yyyy年MM月dd日
	MM/dd/yyyy
	yyyyMMdd
	yyyy-MM-dd hh:mm:ss
	yyyy.MM.dd hh:mm
 ***********************************************************/
Date.prototype.format = function(format) {
    var o = {
        "M+": this.getMonth() + 1, //month 
        "d+": this.getDate(), //day 
        "h+": this.getHours(), //hour 
        "m+": this.getMinutes(), //minute 
        "s+": this.getSeconds(), //second 
        "q+": Math.floor((this.getMonth() + 3) / 3), //quarter 
        "S": this.getMilliseconds() //millisecond 
    };
    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
};
/***********************************************************
    生成UUID
    len number 长度
    radix number 进制(max 62);
    default:36位，16进制
 ***********************************************************/
function UUID(len, radix) {
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    var uuid = [],i;
    radix = radix || chars.length;
    if (len) {
        for (i = 0; i < len; i++) {
            uuid[i] = chars[0 | Math.random() * radix];
        }
    } else {
        var r;
        uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
        uuid[14] = '4';
        for (i = 0; i < 36; i++) {
            if (!uuid[i]) {
                r = 0 | Math.random() * 16;
                uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
            }
        }
    }
    return uuid.join('');
}
/***********************************************************
    生成水单：当前时间yyyyMMddhhmmssS+3位八进制数
 ***********************************************************/
function getSerialNumber(){
    var uuid = UUID(3,8);
    return new Date().format("yyyyMMddhhmmssS") + uuid;
}