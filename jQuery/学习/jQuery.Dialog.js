;(function($){				//	jQuery的方法扩展
	// 给jQuery原型扩展方法		
	$.fn.extend({
		Dialog:function(Document,obj){
			
			var DiaObj = {
				title:"我是标题",
				content:"我是内容",
				width:400,
				height:200,
				okFn:function(){
					alert("ok")
					$(diaDiv).hide();
					mask.hide();
				},
				cancleFn:function(){
					alert("取消");
					$(diaDiv).hide();
					mask.hide();
				}
			}
			$.extend(true,DiaObj,obj);
			
			//弹框
			var diaDiv = Document.createElement("div");
			diaDiv.innerHTML = "<h3>"+ DiaObj.title +"</h3><div class = 'content'>"+ DiaObj.content +"</div> <div class='footer'><a href='javascript:;'>确定</a><a href='javascript:;'>取消</a></div>";
				
				diaDiv.style.cssText = "width:"+ DiaObj.width +"px; height:"+ DiaObj.height +"px; border: 1px solid #aaa; position: fixed; left: 50%; top: 50%; margin-left: "+ -(DiaObj.width+2)/2 +"px;margin-top: "+ -(DiaObj.height+2)/2 +"px; background: #fff; z-index:100";		
				 
				 //弹框标题
				$(diaDiv).find("h3").css({"height":"30px","border-bottom":"1px solid #666","margin-top":"10px","font-weight":"normal","text-align":"center","font-size":"20px","color":"#000","font-family":"微软雅黑"});
				
//				$(diaDiv).find(".content").css()
				
				$(diaDiv).find(".footer").css({"height":"50px","width":"100%","position":"absolute","left":"0px","bottom":"10px"});
				$(diaDiv).find(".footer a").css({"position":"absolute","color":"#000","font":" 16px/30px '微软雅黑'","text-decoration":"none","padding":"0 6px","border":"1px solid #666","border-radius":"6px"});
				$(diaDiv).find(".footer a").eq(0).css("left","20%");	
				$(diaDiv).find(".footer a").eq(1).css("right","20%");
				
				//遮罩层
				var mask = $("<div></div>");
				mask.appendTo("body").css({"width":"100%","height":"100%","position":"fixed","left":"0px","top":"0px","background":"rgba(0,0,0,.3)"});

				
				Document.body.appendChild(diaDiv); 
				
				$(diaDiv).find(".footer a").on("mouseover",function(){
					$(this).css("background","#ccc");
				})
				
				$(diaDiv).find(".footer a").on("mouseout",function(){
					$(this).css("background","");
				})
				
				
				var ok = $(diaDiv).find(".footer a").eq(0);		//弹框确定按钮
				var cancle = $(diaDiv).find(".footer a").eq(1);	//弹框取消按钮
				
				ok.on("click",DiaObj.okFn);
				cancle.on("click",DiaObj.cancleFn);
				
			}
		});
		
// 给jQuery函数身上扩展方法
//		$.extend({
//			drag1:function(){
//				console.log(1)
//			}
//		})
		
	})(jQuery)
	
//			调用方法:
//			jQuery原型扩展的方法	的调用 : $().drag();
//			
//			Query函数身上扩展的方法	的调用 : $.drag();
	