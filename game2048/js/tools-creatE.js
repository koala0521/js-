/*
****个人工具函数
****Time：2017-5-2 
****author:gaopengfei
*/

(function( $ ){
	
	$.creat = function( elName ){
		var el = null;
		
		if( typeof elName === 'string' ){
			
			el = document.createElement( elName );
		}		
		return el;
	};
	
	$.removeEl = function( el ){
		
		if( {}.toString.call(el) === '[object NodeList]' ){
			
			var parent = el[0].parentNode;
			for (var i = 0; i < el.length; i++) {
				
				parent.removeChild( el[i] );
			}
			
			return el;
			
		}else{
			
			return el.parentNode.removeChild( el );
		}
		
	}
	
	//设置or获取自定义属性（有value为设置，没有value为获取）
	$.attr = function(el,attr,value){
		
		if( typeof el !== 'object' ){
			
			throw new Error('arguments[0] is not a object!');
		}
		
		var l = arguments.length;
		
		if( l === 2 ){

			return el[attr] || el.dataset[attr];
		}
		
		if( l === 3 || l > 3 ){
			
			el.dataset[attr] = value;
			return el;
		}
	}


	$.trim = function( str ){

		var re = /(^\s*)|(\s*$)/g;

		return str.replace( re , '');

	}
	

})( $pf );




