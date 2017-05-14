/*
****个人工具函数
****Time：2017-5-2 
****author:gaopengfei
*/

;(function( pf ){
	
	var $ = pf;
	
	//获取元素
	$.getEl = function( arg ){
		
		var arg = $.trim( arg );
		
//		if( !/\s+/.test( arg ) && /^\#/.test( arg ) ){
//
//			return document.querySelector( arg );
//		}
		
		return document.querySelectorAll( arg );
	}
	
	//获取所有父级元素的集合
	$.parentsNode = function( el ){
		
		var parentsArr = [];
		
		while ( el.parentNode && el.parentNode.nodeName !== "HTML" ){
			
			el = el.parentNode;
			parentsArr.push( el );
		}	
		
		return	parentsArr;
	}
	
	//元素添加class
	$.addClass = function( el, className ){

		el.className = el.className + className;
		return el;
	}
	
	//元素删除class
	$.removeClass = function( el, className ){
		
		var classArr = el.className.split(' ');
		classArr.forEach(function( value, index ){
			
			if( value === className ){
				
				classArr.splice( index , 1 );
			}
		});
		
		el.className = classArr.join(' ');
		
		return el;		
	}	
	
	//检测元素是否有指定的class
	$.hasClass = function( el, className ){
			
		var reClass = new RegExp("\\b"+ className +"\\b","g");

		return reClass.test( el.className );			

	}
	
	//DOM元素接收一个元素作为最后一个子元素
	$.append = function( parentEl , childrenEl ){
				
		parentEl.appendChild( childrenEl );
		return parentEl;
	}
	
	//DOM元素作为最后一个子元素插入目标元素
	$.appendTo = function( childrenEl , parentEl ){
				
		parentEl.appendChild( childrenEl );
		return childrenEl;
	}	
	
	//DOM元素接收一个元素作为第一个子元素
	$.prepend = function( parentEl , childrenEl ){
				
		parentEl.insertBefore( childrenEl , parentEl.children[0] );		
		return parentEl;
	}
	
	//DOM元素作为第一个子元素插入目标元素
	$.prependTo = function( childrenEl , parentEl ){
		
		parentEl.insertBefore( childrenEl , parentEl.children[0] );			
		return childrenEl;
	}
	
	//把元素插在指定元素的前面
	$.insertBefore = function( newEl , targetEl ){
		
		targetEl.parentNode.insertBefore( newEl , targetEl );
		return newEl;
	}
	
	//把元素插在指定元素的后面
	$.insertAfter = function( newEl , targetEl ){
		
		targetEl.parentNode.insertBefore( newEl , targetEl.nextElementSibling );
		return newEl;
	}
	
	//隐藏元素、元素集合,支持过渡（时间单位为ms）和回调
	$.hide = function( el , time , callBack ){
		
		var l = arguments.length;
		var elLen = el.length;
		
		if( l === 1 ){
			
			if( elLen ){
				
				for (var i = 0; i < el.length; i++) {
					
					el[i].style.display = 'none';
				}
				
			}else{
				
				el.style.display = 'none';
			}
						
		}else{
			
			if( elLen ){
				
				for (var i = 0; i < el.length; i++) {
					
					el[i].style.transition = time + "ms";
					(function( e ){
						
						setTimeout(function(){
							
							e.style.opacity = 0;
							
						}, 0 );
						
					})(el[i]);
					
				}
				
			}else{
				
				el.style.transition = time + "ms";
				
				setTimeout(function(){
					
					el.style.opacity = 0;
					
				});			
				
			}			

			setTimeout(function(){
				
				if( elLen ){
					
					for (var i = 0; i < el.length; i++) {
						
						el[i].style.display = 'none';
					}
					
				}else{
					
					el.style.display = 'none';
				}
				
				callBack && callBack.call(el);
				
			},time);
		}
		return el;
	
	}
	
	//显示元素、元素集合,支持过渡（时间单位为ms）和回调
	$.show = function( el , time , callBack ){
		
		var l = arguments.length;
		var elLen = el.length;		
			
		if( {}.toString.call( el ) ===  '[object NodeList]' ){
			
			for (var i = 0; i < el.length; i++) {
				
				el[i].style.display = '';
			}
		}else{
			
			el.style.display = '';
		}

		if( l > 1 ){
			
			if( {}.toString.call( el ) ===  '[object NodeList]' ){
				
				for (var i = 0; i < el.length; i++) {
					
					el[i].style.transition = time + "ms";
					(function( e ){
						
						setTimeout(function(){
							
							e.style.opacity = 1;
							
						}, 0 );
						
					})(el[i]);
					
				}	
				
			}else{
				
				el.style.transition = time + "ms";
				
				setTimeout(function(){
					
					el.style.opacity = 0;
					
				}, 0 );	
			}
			
			setTimeout(function(){
				
				callBack && callBack.call(el);
				
			},time );	
			
		}
		return el;
			
	}
	
})( $pf );