function TestDir(ev,Element,status){ 	

	var info = Element.getBoundingClientRect();
	//元素中心点X轴的位置
	var X = info.left+(info.width)/2;
	//元素中心点Y轴的位置
	var Y = info.top+(info.height)/2;	
	var obj = {
		l:info.left,	//[element到可视区left的距离
		r:info.right,	//[element到可视区right的距离
		t:info.top,		//element到可视区top的距离
		b:info.bottom	//element到可视区bottom的距离，
	}
		
	var lt = Math.atan2(obj.t-Y,obj.l -X);       
	var rt = Math.atan2(obj.t-Y,obj.r -X);
	var rb = Math.atan2(obj.b-Y,obj.r -X);
	var lb = Math.atan2(obj.b-Y,obj.l -X);
	
	var mp =  Math.atan2(ev.clientY - Y, ev.clientX - X);
	var dir = null;

	if( mp > lt && mp < rt ){
		dir = "top";
	}else if( mp > rt && mp < rb  ){
		dir = "right";
	}else if( mp > rb && mp < lb ){
		dir = "bottom";
	}else{
		dir = "left";
	}		
	
	var result = {	//判断结果
		s:status,	//状态，对应移入和移出
		dir:dir		// 方向 ，对应鼠标移入或者移出的方向
	}				
	return result;	
}
