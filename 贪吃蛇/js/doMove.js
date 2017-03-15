document.onclick = function(){
//		    	move(box,"left",0,1000,function(){
//		    		alert(1);
//		    	});
//	move(box,"left",0,1000);
//	move(box2,"left",200,2000);
}
function move (obj,attr,target,duration,fn) {
	var startTime = new Date();
	var b = parseFloat(getComputedStyle(obj)[attr]);//元素初始位置
	var c = target - b ;//总路程
	var d = duration;//总持续时间
	obj.timer = setInterval(function(){
//		console.log(1);
		var t = new Date() - startTime;//已过时间 = 当前实时时间 - 点击时的初始时间
		if(t>=d){//当时间超过总持续时间的时候
			t = d;
		}
		var v = (c/d)*t + b ;
		obj.style[attr] = v+"px";
		if(t==d){
			clearInterval(obj.timer);//清除定时器，清除的是定时器下一次的运行
			fn&&fn();//执行回调函数
		}
	},16)
}