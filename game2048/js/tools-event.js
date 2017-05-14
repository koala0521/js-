/*
****个人工具函数-验证方法
****Time：2017-5-8
****author:gaopengfei
*/ 

;(function( $ ){
	
	$.on = function( el , evType , Fn ){
		
		if( window.attachEvent ){
			
			if( {}.toString.call( el ) ===  '[object NodeList]' ){
				
				for (var i = 0; i < el.length; i++) {
					
					el[i].attachEvent( 'on' + evType , Fn );
				}
				
			}else{
				
				el.attachEvent( 'on' + evType , Fn );
			}			
			
		}else{
			
			if( {}.toString.call( el ) ===  '[object NodeList]' ){
				
				for (var i = 0; i < el.length; i++) {
					
					el[i].addEventListener( evType , Fn );
				}
				
			}else{
				
				el.addEventListener( evType , Fn );
			}
			
			
		}
		
		return el;
	}
	
	$.off = function( el , evType , Fn ){
		
		if( window.detachEvent ){
			
			if( {}.toString.call( el ) ===  '[object NodeList]' ){
				
				for (var i = 0; i < el.length; i++) {
					
					el[i].detachEvent( 'on' + evType , Fn );
				}
				
			}else{
				
				el.detachEvent( 'on' + evType , Fn );
			}
			
		}else{
			
			if( {}.toString.call( el ) ===  '[object NodeList]' ){
				
				for (var i = 0; i < el.length; i++) {
					
					el[i].removeEventListener( evType , Fn );
				}
				
			}else{
				
				el.removeEventListener( evType , Fn );
			}			
			
		}
		
		return el;
	}
	
	$.ev = function( e ){
		
		var ev = e || event;
		
		return ev;
	}
	
	$.target = function( e ){
		
		var ev = e || event;
		
		return ev.target || ev.srcElement;
	}
	
})( $pf );
