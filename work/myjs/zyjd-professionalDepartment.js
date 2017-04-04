//****中医基地-专业科室用户模块
//****startTime：2017-3-31 
//****author:gaopengfei
;(function(){
	
	
	var $creatE ,$pTo;
	
	$creatE = Elf.controls.createElement;
	$pTo = Elf.controls.appendTo;

//------***** 专业科室 > 专业科室基本情况表4 ******--------	
	;(function(){
		
		function BasiSituation4(){
			this.content = document.getElementById("bg");
			this.warp = $creatE('div' ,'grid4 full');
			
			this.init();
		}
		
		//专业科室基本情况表4接口
		zyjdModuleByGao.basiSituation4 = BasiSituation4;
		
		BasiSituation4.prototype.init = function(){
			
			this.creatGrid4();
		}
		
		
		BasiSituation4.prototype.creatGrid4 = function(){
			var _this = this;
			
			Elf.components.ajax({
				
				url:"ZYJD-professional-grid4.html",
				dataType:"html",
				data:{id:1,ccc:"ccc"},
				
				success:function(data){
					
					_this.warp.innerHTML = data;
					_this.content.innerHTML = '';
					Elf.controls.appendTo( _this.warp, _this.content);
					_this.btnFn();
				},
				error:function(xhr){
					
					console.info(xhr);
				}
			});			
			
		}
		
		BasiSituation4.prototype.btnFn = function(){
			
			this.warp.addEventListener('click', function(ev){
		
				var has,
					e,
					tt;
				has = Elf.utils.hasClass;		
				e = Elf.getEvent(ev);
				tt = Elf.getEventSource(ev);
				
				if( has( tt , 'save-data' ) ){
					
					console.log('保存数据');  
					return
				}
				if( has( tt , 'submit-data' ) ){
					
					console.log('提交数据'); 
					return
				}					
				
			})
		}
		
		
		
	})();
	
//------***** 专业科室 > 专业科室基本情况表5 ******--------	
	;(function(){
		
		function BasiSituation5(){
			this.content = document.getElementById("bg");
			this.warp = $creatE('div' ,'grid5 full');
			
			this.init();
		}
		
		//专业科室基本情况表5接口
		zyjdModuleByGao.basiSituation5 = BasiSituation5;
		
		BasiSituation5.prototype.init = function(){
			
			this.creatGrid5();
		}
		
		
		BasiSituation5.prototype.creatGrid5 = function(){
			var _this = this;

			Elf.components.ajax({
				
				url:"ZYJD-professional-grid5.html",
				dataType:"html",
				data:{id:1,ccc:"ccc"},
				
				success:function(data){
					
					_this.warp.innerHTML = data;
					_this.content.innerHTML = '';					
					Elf.controls.appendTo( _this.warp, _this.content);
					_this.btnFn();
				},
				error:function(xhr){
					
					console.info(xhr);
				}
			});			
			
		}
		
		BasiSituation5.prototype.btnFn = function(){
			
			this.warp.addEventListener('click', function(ev){
		
				var has,
					e,
					tt;
				has = Elf.utils.hasClass;		
				e = Elf.getEvent(ev);
				tt = Elf.getEventSource(ev);
				
				if( has( tt , 'save-data' ) ){
					
					console.log('保存数据');  
					return
				}
				if( has( tt , 'submit-data' ) ){
					
					console.log('提交数据'); 
					return
				}					
				
			})
		}		
		
		
	})();	
	
//------***** 专业科室 > 专业科室基本情况表6 ******--------	
	;(function(){
		
		function BasiSituation6(){
			this.content = document.getElementById("bg");
			this.warp = $creatE('div' ,'grid6 full');
			
			this.init();
		}
		
		//专业科室基本情况表6接口
		zyjdModuleByGao.basiSituation6 = BasiSituation6;
		
		BasiSituation6.prototype.init = function(){
			
			this.creatGrid6();
		}
		
		
		BasiSituation6.prototype.creatGrid6 = function(){
			var _this = this;

			Elf.components.ajax({
				
				url:"ZYJD-professional-grid6.html",
				dataType:"html",
				data:{id:1,ccc:"ccc"},
				
				success:function(data){
					
					_this.warp.innerHTML = data;
					_this.content.innerHTML = '';					
					Elf.controls.appendTo( _this.warp, _this.content);
					_this.btnFn();
				},
				error:function(xhr){
					
					console.info(xhr);
				}
			});			
			
		}
		
		BasiSituation6.prototype.btnFn = function(){
			
			this.warp.addEventListener('click', function(ev){
		
				var has,
					e,
					tt;
				has = Elf.utils.hasClass;		
				e = Elf.getEvent(ev);
				tt = Elf.getEventSource(ev);
				
				if( has( tt , 'save-data' ) ){
					
					console.log('保存数据');  
					return
				}
				if( has( tt , 'submit-data' ) ){
					
					console.log('提交数据'); 
					return
				}					
				
			})
		}		
		
		
	})();		
	
})()
