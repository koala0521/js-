/*
****个人工具函数-验证方法
****Time：2017-5-8
****author:gaopengfei
*/ 

;(function( $ ){
	
	//参数 [boolean] , target , sources1 ...
	$.extend = function(){
		var args,
			target,
			len,
			i,
			clone;
			
		args = arguments;
		target = args[0] || {};
		len = args.length;
		deep = false;
		i = 1;
				
		if( typeof target === 'boolean' ){
			
			deep = target;
			target = args[1] || {};	
			i = 2;
		}
		
		if( typeof target !== 'function' && typeof target !== 'object' ){
			
			target = {};
		}
				
		for ( ;i < args.length; i++ ) {

			if( args[i] ){
				
				for (var attr in args[i] ) {

					if( target[attr] === args[i][attr] ){
						
						continue;
					}
					
					if( deep && args[i][attr] && ( $.isArray( args[i][attr] ) || $.isObject( args[i][attr] ) ) ){
					
						if( $.isArray( args[i][attr] ) ){
							
							clone = target[attr] && $.isArray( target[attr] ) ? target[attr] : [];
						
						}else{
							
							clone = target[attr] && $.isObject( target[attr] ) ? target[attr] : {};
						}
					
						target[attr] = $.extend( deep , clone , args[i][attr] );						
					
					} else if( args[i][attr] !== undefined ){
												
						target[attr] = args[i][attr];
					}
					
					
				}				
				
			}

		}
		
		return target;
		
	}
	
})( $pf );
