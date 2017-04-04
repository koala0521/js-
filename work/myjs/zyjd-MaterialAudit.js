//****中医基地-省级用户模块
//****time：2017-4-2 
//****author:gaopengfei
//*****省级 > 申报材料审核模块******


//----**** 省级> 申报材料审核 > 培训基地审核页面****--------
;(function(){
	
	var $creatE,
		$pTo,
		gridHdata,
		currentPage,
		pageSize;
		
	currentPage = 1,
	pageSize = 5;	
	$creatE = Elf.controls.createElement;
	$pTo = Elf.controls.appendTo;	
	
	//配置表头数据
 	gridHdata = [
	
		{
			title:"编号",
			name:"",
			width:48,
			align:"center",
			fixedColumn:true,
			checkCol:true,
			valign:"middle",
			renderer:function(name,rowIndex,rowData){
				return '<div class="fixedCell">'+ (rowIndex+1) +'</div>';
			}
		},
		{
			title:"审核状态",
			name:"",
			width:48,
			align:"center",
			fixedColumn:false,
			checkCol:false,
			valign:"middle",
			renderer:function(name,rowIndex,rowData){
				
				return "<div>"+ ( rowData.zt ? '已通过':'未通过' ) +"</div>";
			}
		}
		,{
			title:"修改状态",
			name:"",
			width:100,
			align:"center",
			fixedColumn:false,
			valign:"middle",
			renderer:function(name,rowIndex,rowData){
	
				var str1 = rowData.xgzt ? 'checked="checked" ' : 'disabled="disabled" ';
	
				var str2 = rowData.xgzt ? 'disabled="disabled" ' : 'checked="checked" ';
	
				return '<label><input name="zt'+ rowData.id +'" type="radio" '+  str1 +' />可修改</label><label><input name="'+ rowData.id +'" type="radio"  '+  str2 +'  />不可修改 </label>' ;
			}
		}
		,{
			title:"培训基地（医院）名称",
			name:"",
			width:100,
			align:"center",
			fixedColumn:false,
			valign:"middle",
			renderer:function(name,rowIndex,rowData){
			
	
				return "<div>"+ rowData.yiyuanname +"</div>";
	
			}
		}
		,{
			title:"专业基地（科室）",
			name:"",
			width:100,
			align:"center",
			renderer:function(name,rowIndex,rowData){	    			
	
				return "<div>"+ rowData.name +"</div>";
				
			}
		}
		,{
			title:"联系人",
			name:"",
			width:60,
			align:"center",
			renderer:function(name,rowIndex,rowData){	    			
				
				return rowData.name;
				
			}	    		
			
		}
		
		,{
			title:"联系电话",
			name:"",
			width:80,
			align:"center",
			renderer:function(name,rowIndex,rowData){	    			
				
				return rowData.mobileNum;
				
			}	    		
			
		}
		
		,{
			title:"基地申报表",
			name:"",
			width:100,
			align:"center",
			renderer:function(name,rowIndex,rowData){	    			
				
				var str = "<a class='open-grid2 prl12' href='javascript:;'>表2</a><a  class='open-grid3 prl12' href='javascript:;'>表3</a>";
				return str;
				
			}	    		
			
		}	    	
		,{
			title:"上报时间",
			name:"",
			width:80,
			align:"center",
			renderer:function(name,rowIndex,rowData){	    			
				
				return "<div>"+ rowData.startTime + "</div>";
				
			}
		}
	
	];

		
	function TrainingBase(){

		//页面容器	
		this.content = document.getElementById("bg");
		this.warp = $creatE('div','training-base-warp full');	
		
		//ajax请求数据，成功后执行init函数，把数据传入init
		this.init( studentList );
		
	};
	
	//暴露接口
	zyjdModuleByGao.trainBase = TrainingBase;	
	
	TrainingBase.prototype.init = function ( data ){
		var _this = this; 

		_this.content.innerHTML = '';
		$pTo( _this.warp , _this.content );

		this.query();
		this.grid(data);
		this.pageNumber( data );
		
		
	}
	
	//查询功能
	TrainingBase.prototype.query = function(){
		var queryWarp,
			findHospital,
			FilterHospital,
			_this;
		
		_this = this;
		
		queryWarp = $creatE('div','wfull');
		conditionQuery = $creatE( 'div' , 'wfull train-base prl6' );	//	条件查询
		batchSelection = $creatE( 'div' , 'wfull check-hospital ptb12 prl6' );	//批量选择
		
		conditionQuery.innerHTML = `
			<div class="hfull pr20" >
				<div>培训基地（医院）名称 : </div>
				<div>
					<input class="hospitalName prl5 ptb4 getvalue" />
				</div>
			</div>
			
			<div class="hfull pr20" >
				<div class="" > 批次 : </div>
				<div class="" >
					<select name="pici" class="pici getvalue" >
						<option value="1">第一批</option>
						<option value="2">第二批</option>
					</select>
				</div>
			</div>
			
			<div class="hfull pr20" >
				<div class="" > 审核状态 : </div>
				<div class="" >
					<select name="zhuangtai" class="zhuangtai getvalue" >
						<option value="全部">全部</option>
						<option value="未上报">未上报</option>
						<option value="已上报(未审核)">已上报(未审核)</option>
						<option value="审核通过">审核通过</option>
						<option value="审核不通过">审核不通过</option>
					</select>
				</div>
			</div>			
			
			<div class="hfull pr20" >
				<button class="btn conditionQuery prl24 ptb6" value="查询" > 查询 </button>
			</div>`;
		
		batchSelection.innerHTML = `
			<div class="pr20 hfull" > 				
				<div class="prl6 hfull" >

					<span >批量查找 :</span>
				</div>
				
			</div>
			<div class="pr20 hfull" >
				<input class="prl8 ptb4 success btn"  type="button" value="审核通过" />
				<input class="prl8 ptb4 un-success btn"  type="button" value="审核不通过" />				
			</div>`;
		
		//绑定事件
		conditionQuery.addEventListener('click' , function(ev){
			
			_this.conditionQueryFn.call( conditionQuery , ev ); 
			
		});
		batchSelection.addEventListener('click', function(ev){
			
			_this.batchSelectionFn.call( batchSelection , ev ) 
			
		});
		
		$pTo( conditionQuery , queryWarp );
		$pTo( batchSelection , queryWarp );		
		$pTo( queryWarp , _this.warp );

	}
	
	// 创建表格
	TrainingBase.prototype.grid = function( data ){
		
		var gridWarp,
			_this = this;
		
		gridWarp = $creatE( 'div','wfull JD-grid-page' );
		
		$pTo( gridWarp , _this.warp );
		
		this.grid = Elf.components.grid({
			
			cols:gridHdata,
			data:data.slice( 0 , pageSize ),
			fullWidthRows:true,
			onCellSelected:function(evt,item,rowIndex,colIndex){

	    		var tt = evt.target;

	    		if( Elf.utils.hasClass(tt,"open-grid2") ){
	    			
	    			console.log( "打开表2。。。");

	    			return
	    		}
	    		
	    		if( Elf.utils.hasClass(tt,"open-grid3") ){
	    			
	    			console.log("打开表3");
	    			return
	    		}
			},
			target:gridWarp
		});
		
		
		
	}

	// 分页组件
	TrainingBase.prototype.pageNumber = function ( data ){
		
		var JDpageNumber ,paging ,_this;
			_this = this;
			JDpageNumber = $creatE('div','JD-grid-pageNumber ptb20');
	
	    	paging = Elf.components.paging({
	    		
		        total: data.length, //数据总数
		        currentPage: currentPage,   
		        pageSize:pageSize,       
		        maxPager:5,     //分页组件最多显示的页码数量结构
		        showStatus:false,    
		        statusFormat:"共 <b>{{total}}</b> 条记录 <b>{{totalPage}}</b> 页 当前第 <b>{{currentPage}}</b> 页", 
		        onPagerChange:function(p){  //页码跳转函数 ， 函数有一个参数，就是当前点击的按钮对应的页码
		            
		            currentPage = p;
 					
 					//更新数据
					Elf.components.grid.methods.update(_this.grid,data.slice((p-1)*pageSize,pageSize*p));	

		        }
		        
	    	});
	    
	    $pTo( paging , JDpageNumber );
		$pTo( JDpageNumber , _this.warp);	
	}
	
	//条件查询
	TrainingBase.prototype.conditionQueryFn = function(ev){
		var e,
			tt,
			has,
			infos;		
		has = Elf.utils.hasClass;		
		e = Elf.getEvent(ev);
		tt = Elf.getEventSource(ev);

		if( has( tt , 'conditionQuery') ){
	
			infos = this.getElementsByClassName('getvalue');
			
			
			for (var i = 0; i < infos.length; i++) {
				
				if( Elf.utils.trim( infos[i].value ) === '' ){
					
					infos[i].focus();
					
					console.log('请填医院名称');
					
					return
				}
			}
			//请求数据，更新视图
			
		}

	}
	
	//批量选择
	TrainingBase.prototype.batchSelectionFn = function(ev){
	
		var e,
		tt,
		has,
		infos;

		has = Elf.utils.hasClass;		
		e = Elf.getEvent(ev);
		tt = Elf.getEventSource(ev);
		
		if( has( tt , 'success') ){
			
			Elf.utils.addClass( tt , 'active');
			Elf.utils.removeClass(this.getElementsByClassName('un-success')[0] , 'active' );
			//请求数据，更新视图
			console.log( '请求未通过审核数据' )
			return
		}
		
		if( has( tt , 'un-success') ){
			
			Elf.utils.addClass( tt , 'active');
			Elf.utils.removeClass(this.getElementsByClassName('success')[0] , 'active' );
			//请求数据，更新视图
			console.log( '请求未通过审核数据' )			
			return
		}		
		
	}
	

})()


//------*****省级> 申报材料审核 > 专业科室审核模块*****-----	
;(function(){
	
	var $creatE,
		$ap,
		gridHdata,
		currentPage,
		pageSize;
		
	currentPage = 1,
	pageSize = 5;			
	$creatE = Elf.controls.createElement;
	$pTo = Elf.controls.appendTo;		
	
	gridHdata = [

    	{
    		title:"编号",
		name:"",
		width:48,
		align:"center",
		fixedColumn:true,
		checkCol:true,
		valign:"middle",
		renderer:function(name,rowIndex,rowData){
			return '<div class="fixedCell">'+ (rowIndex+1) +'</div>';
		}
	},
	{
		title:"审核状态",
		name:"我是aaa",
		width:48,
		align:"center",
		fixedColumn:false,
		checkCol:false,
		valign:"middle",
		renderer:function(name,rowIndex,rowData){
			
			return (rowData.zt) ? '已通过':'未通过';
		}
	}
	,{
		title:"修改状态",
		name:"",
		width:100,
		align:"center",
		fixedColumn:false,
		valign:"middle",
		renderer:function(name,rowIndex,rowData){

			var str1 = rowData.xgzt ? 'checked="checked" ' : 'disabled="disabled" ';

			var str2 = rowData.xgzt ? 'disabled="disabled" ' : 'checked="checked" ';

			return '<label><input name="zt'+ rowData.id +'" type="radio" '+  str1 +' />可修改</label><label><input name="'+ rowData.id +'" type="radio"  '+  str2 +'  />不可修改 </label>' ;
		}
	}
	,{
		title:"培训基地（医院）名称",
		name:"",
		width:100,
		align:"center",
		fixedColumn:false,
		valign:"middle",
		renderer:function(name,rowIndex,rowData){
		

			return rowData.yiyuanname;

		}
	}
	,{
		title:"专业基地（科室）",
		name:"",
		width:100,
		align:"center",
		renderer:function(name,rowIndex,rowData){	    			
			
			var str = "<a href='javascript:;'>"+ rowData.name  +"</a>";
			return str;
			
		}
	}
	,{
		title:"上报时间",
		name:"",
		width:80,
		align:"center",
		renderer:function(name,rowIndex,rowData){	    			
			
			return rowData.startTime;
			
		}
	}

];	
	
	function SpecialDepartment(){
		
		//页面容器	
		this.content = document.getElementById("bg");
		this.warp = $creatE('div','training-base-warp full');	
		
		//ajax请求数据，成功后执行init函数，把数据传入init
		this.init( studentList );		
		
	}
	
	//专业科室审核函数接口
	zyjdModuleByGao.SpecialDepartment = SpecialDepartment;
	
	SpecialDepartment.prototype.init = function(data){
		

		var _this = this; 
		
		_this.content.innerHTML = '';
		$pTo( _this.warp , _this.content );
		
		this.query();
		this.grid(data);
		this.pageNumber( data );
	
	}
	
	// 创建搜索栏
	SpecialDepartment.prototype.query = function(){
		var queryWarp,
			findHospital,
			FilterHospital,
			_this;
		
		_this = this;
		
		queryWarp = $creatE('div','wfull');
		conditionQuery = $creatE( 'div' , 'wfull train-base prl6' );	//	条件查询
		batchSelection = $creatE( 'div' , 'wfull check-hospital ptb12 prl6' );	//批量选择
		
		conditionQuery.innerHTML = `
			<div class="hfull pr20" >
				<div>培训基地（医院）名称 : </div>
				<div>
					<input class="hospitalName getvalue prl5 ptb4" name="hospitalName" />
				</div>
			</div>
			
			<div class="hfull pr20" >
				<div class="" > 审核状态 : </div>
				<div class="" >
					<select name="fGrade" class="zhuangtai getvalue" >
						<option value="全部">全部</option>
						<option value="未上报">未上报</option>
						<option value="已上报(未审核)">已上报(未审核)</option>
						<option value="审核通过">审核通过</option>
						<option value="审核不通过">审核不通过</option>
					</select>
				</div>
			</div>				
			
			<div class="hfull pr20" >
				<div class="" > 专业基地(科室) : </div>
				<div class="" >
					<select name="zyjd" class="pici getvalue" >
						<option value="全部">全部</option>
					</select>
				</div>
			</div>
			
			<div class="hfull pr20" >
				<div class="" > 批次 : </div>
				<div class="" >
					<select name="pici" class="pici getvalue" >
						<option value="第一批">第一批</option>
						<option value="第二批">第二批</option>
					</select>
				</div>
			</div>		
			
			<div class="hfull pr20" >
				<button class="btn conditionQuery prl24 ptb6" value="查询" > 查询 </button>
			</div>`;
		
		batchSelection.innerHTML = `
			<div class="pr20 hfull" > 				
				<div class="prl6 hfull" >

					<span >批量查找 :</span>
				</div>
				
			</div>
			<div class="pr20 hfull" >
				<input class="prl8 ptb4 success btn"  type="button" value="审核通过" />
				<input class="prl8 ptb4 un-success btn"  type="button" value="审核不通过" />				
			</div>`;
		
//		//绑定事件
		conditionQuery.addEventListener('click' , function(ev){
			
			_this.conditionQueryFn.call( conditionQuery , ev );
			
		} );
		batchSelection.addEventListener('click', function(ev){
			
			_this.batchSelectionFn.call( batchSelection , ev );
			
		} );
		
		$pTo( conditionQuery , queryWarp );
		$pTo( batchSelection , queryWarp );		
		$pTo( queryWarp , _this.warp );

	}
		
	// 创建表格
	SpecialDepartment.prototype.grid = function( data ){
		
		var gridWarp,
			_this = this;
		
		gridWarp = $creatE( 'div','wfull JD-grid-page' );
		
		$pTo( gridWarp , _this.warp );

		this.grid = Elf.components.grid({
			
			cols:gridHdata,
			data:data.slice( 0 , pageSize ),
			fullWidthRows:true,
			onCellSelected:function(evt,item,rowIndex,colIndex){

	    		var tt = evt.target;

	    		if( Elf.utils.hasClass(tt,"open-grid2") ){
	    			
	    			console.log( "打开表2。。。");

	    			return
	    		}
	    		
	    		if( Elf.utils.hasClass(tt,"open-grid3") ){
	    			
	    			console.log("打开表3");
	    			return
	    		}
			},
			target:gridWarp
		});
		
	}
	
	// 分页组件
	SpecialDepartment.prototype.pageNumber = function ( data ){
		
		var JDpageNumber ,paging ,_this;
			_this = this;
			JDpageNumber = $creatE('div','JD-grid-pageNumber ptb20');
	
	    	paging = Elf.components.paging({
	    		
		        total: data.length, //数据总数
		        currentPage: currentPage,   
		        pageSize:pageSize,       
		        maxPager:5,     //分页组件最多显示的页码数量结构
		        showStatus:false,    
		        statusFormat:"共 <b>{{total}}</b> 条记录 <b>{{totalPage}}</b> 页 当前第 <b>{{currentPage}}</b> 页", 
		        onPagerChange:function(p){  //页码跳转函数 ， 函数有一个参数，就是当前点击的按钮对应的页码
		            
		            currentPage = p;
 					
 					//更新数据
					Elf.components.grid.methods.update(_this.grid,data.slice((p-1)*pageSize,pageSize*p));	

		        }
		        
	    	});
	    
	    $pTo( paging , JDpageNumber );
		$pTo( JDpageNumber , _this.warp);	
	}
	
	//条件查询
	SpecialDepartment.prototype.conditionQueryFn = function(ev){
		var e,
			tt,
			has,
			hospital,
			infos;
			
		has = Elf.utils.hasClass;		
		e = Elf.getEvent(ev);
		tt = Elf.getEventSource(ev);
		hospital = this.getElementsByClassName('hospitalName')[0];
		infos = this.getElementsByClassName('getvalue');		
		
		if( has( tt , 'conditionQuery') ){
			
			console.log( 1 );
			
			if( Elf.utils.trim( hospital.value ) === '' ){
				
				hospital.focus();
				
				console.log('请填医院名称');
				
				return				
				
			}else{
				
				//发送ajax请求数据，更新视图		
				console.log('医院查找中...');
			}
			
		
			
		}

	}
	
	//批量选择
	SpecialDepartment.prototype.batchSelectionFn = function(ev){
	
		var e,
		tt,
		has,
		infos;

		has = Elf.utils.hasClass;		
		e = Elf.getEvent(ev);
		tt = Elf.getEventSource(ev);
		
		if( has( tt , 'success') ){
			
			Elf.utils.addClass( tt , 'active');
			Elf.utils.removeClass(this.getElementsByClassName('un-success')[0] , 'active' );
			//请求数据，更新视图
			console.log('审核通过的医院查找中...');
			return
		}
		
		if( has( tt , 'un-success') ){
			
			Elf.utils.addClass( tt , 'active');
			Elf.utils.removeClass(this.getElementsByClassName('success')[0] , 'active' );
			//请求数据，更新视图
			console.log('未审核通过的医院查找中...');
			return
		}		
		
	}
	
	
	
})();


//------*****省级> 申报材料审核 > 协同单位审核******--------	
;(function(){
	
	var $creatE,
		$pTo,
		gridHdata,
		currentPage,
		pageSize;
		
	currentPage = 1,
	pageSize = 5;			
	$creatE = Elf.controls.createElement;
	$pTo = Elf.controls.appendTo;	
	
	gridHdata = [	    	
		{
			title:"编号",
			name:"",
			width:48,
			align:"center",
			fixedColumn:true,
			checkCol:true,
			valign:"middle",
			renderer:function(name,rowIndex,rowData){
				return '<div class="fixedCell">'+ (rowIndex+1) +'</div>';
			}
		},
		{
			title:"审核状态",
			name:"我是aaa",
			width:48,
			align:"center",
			fixedColumn:false,
			checkCol:false,
			valign:"middle",
			renderer:function(name,rowIndex,rowData){
				
				return (rowData.zt) ? '已通过':'未通过';
			}
		}
		,{
			title:"修改状态",
			name:"",
			width:100,
			align:"center",
			fixedColumn:false,
			valign:"middle",
			renderer:function(name,rowIndex,rowData){
	
				var str1 = rowData.xgzt ? 'checked="checked" ' : 'disabled="disabled" ';
	
				var str2 = rowData.xgzt ? 'disabled="disabled" ' : 'checked="checked" ';
	
				return '<label><input name="zt'+ rowData.id +'" type="radio" '+  str1 +' />可修改</label><label><input name="'+ rowData.id +'" type="radio"  '+  str2 +'  />不可修改 </label>' ;
			}
		}
		,{
			title:"培训基地（医院）名称",
			name:"",
			width:100,
			align:"center",
			fixedColumn:false,
			valign:"middle",
			renderer:function(name,rowIndex,rowData){
			
	
				return rowData.yiyuanname;
	
			}
		}
		,{
			title:"协同单位1",
			name:"",
			width:100,
			align:"center",
			renderer:function(name,rowIndex,rowData){	    			
				//接受一个数组，循环生成协同单位
				var str = "<div><a href='javascript:;'>"+ rowData.name  +"</a></div>";
				return str;
				
			}
		}
		,{
			title:"协同单位2",
			name:"",
			width:100,
			align:"center",
			renderer:function(name,rowIndex,rowData){	    			
				//接受一个数组，循环生成协同单位
				console.log( name );
				var str = "<div><a class='xtdw1' href='javascript:;'>"+ rowData.name  +"</a></div>";
				return str;
			}
		}
		,{
			title:"基层培养基地",
			name:"查看",
			width:60,
			align:"center",
			renderer:function(name,rowIndex,rowData){
				
				var str = "<a class='xtdw2'  href='javascript:;'>"+ name  +"</a>";
				return str;
				
			}
		}
	
	];	
	
	function CooperativeUnits(){

		//页面容器	
		this.content = document.getElementById("bg");
		this.warp = $creatE('div','training-base-warp full');	
		
		//ajax请求数据，成功后执行init函数，把数据传入init
		this.init( studentList );		
		
	}
	
	//协同单位审核接口
	zyjdModuleByGao.cooperativeUnits = CooperativeUnits;	
	
	CooperativeUnits.prototype.init = function ( data ){
		var _this = this; 
		
		_this.content.innerHTML = '';
		$pTo( _this.warp , _this.content );
			
		this.query();
		this.grid(data);
		this.pageNumber( data );
		
	
	}

	//查询模块
	CooperativeUnits.prototype.query = function(){
		var queryWarp,
			findHospital,
			FilterHospital,
			_this;
		
		_this = this;
		
		queryWarp = $creatE('div','wfull');
		conditionQuery = $creatE( 'div' , 'wfull train-base prl6' );	//	条件查询
		batchSelection = $creatE( 'div' , 'wfull check-hospital ptb12 prl6' );	//批量选择
		
		conditionQuery.innerHTML = `
			<div class="hfull pr20" >
				<div>培训基地（医院）名称 : </div>
				<div>
					<input class="hospitalName prl5 ptb4 getvalue" />
				</div>
			</div>
			
			<div class="hfull pr20" >
				<div class="" > 批次 : </div>
				<div class="" >
					<select name="pici" class="pici getvalue" >
						<option value="1">第一批</option>
						<option value="2">第二批</option>
					</select>
				</div>
			</div>
			
			<div class="hfull pr20" >
				<div class="" > 审核状态 : </div>
				<div class="" >
					<select name="zhuangtai" class="zhuangtai getvalue" >
						<option value="全部">全部</option>
						<option value="未上报">未上报</option>
						<option value="已上报(未审核)">已上报(未审核)</option>
						<option value="审核通过">审核通过</option>
						<option value="审核不通过">审核不通过</option>
					</select>
				</div>
			</div>			
			
			<div class="hfull pr20" >
				<button class="btn conditionQuery prl24 ptb6" value="查询" > 查询 </button>
			</div>`;
		
		batchSelection.innerHTML = `
			<div class="pr20 hfull" > 				
				<div class="prl6 hfull" >

					<span >批量查找 :</span>
				</div>
				
			</div>
			<div class="pr20 hfull" >
				<input class="prl8 ptb4 success btn"  type="button" value="审核通过" />
				<input class="prl8 ptb4 un-success btn"  type="button" value="审核不通过" />				
			</div>`;
		
		//绑定事件
		conditionQuery.addEventListener('click' , function( ev ){
			
			_this.conditionQueryFn.call( conditionQuery , ev );
			
		} );
		batchSelection.addEventListener('click', function( ev ){
			
			_this.batchSelectionFn.call( batchSelection , ev );
			
		} );
		
		$pTo( conditionQuery , queryWarp );
		$pTo( batchSelection , queryWarp );		
		$pTo( queryWarp , _this.warp );

	}
	
	// 创建表格
	CooperativeUnits.prototype.grid = function( data ){
		
		var gridWarp,
			_this = this;
		
		gridWarp = $creatE( 'div','wfull JD-grid-page' );
		
		$pTo( gridWarp , _this.warp );		

		this.grid = Elf.components.grid({
			
			cols:gridHdata,
			data:data.slice( 0 , pageSize ),
			fullWidthRows:true,
			onCellSelected:function(evt,item,rowIndex,colIndex){

	    		var tt = evt.target;

	    		if( Elf.utils.hasClass(tt,"open-grid2") ){
	    			
	    			console.log( "打开表2。。。");

	    			return
	    		}
	    		
	    		if( Elf.utils.hasClass(tt,"open-grid3") ){
	    			
	    			console.log("打开表3");
	    			return
	    		}
			},
			target:gridWarp
		});

	}

	// 分页组件
	CooperativeUnits.prototype.pageNumber = function ( data ){
		
		var JDpageNumber ,paging ,_this;
			_this = this;
			JDpageNumber = $creatE('div','JD-grid-pageNumber ptb20');
	
	    	paging = Elf.components.paging({
	    		
		        total: data.length, //数据总数
		        currentPage: currentPage,   
		        pageSize:pageSize,       
		        maxPager:5,     //分页组件最多显示的页码数量结构
		        showStatus:false,    
		        statusFormat:"共 <b>{{total}}</b> 条记录 <b>{{totalPage}}</b> 页 当前第 <b>{{currentPage}}</b> 页", 
		        onPagerChange:function(p){  //页码跳转函数 ， 函数有一个参数，就是当前点击的按钮对应的页码
		            
		            currentPage = p;
 					
 					//更新数据
					Elf.components.grid.methods.update(_this.grid,data.slice((p-1)*pageSize,pageSize*p));	

		        }
		        
	    	});
	    
	    $pTo( paging , JDpageNumber );
		$pTo( JDpageNumber , _this.warp);	
	}
	
	//条件查询
	CooperativeUnits.prototype.conditionQueryFn = function(ev){
		var e,
			tt,
			has,
			hospital,
			infos;
			
		has = Elf.utils.hasClass;		
		e = Elf.getEvent(ev);
		tt = Elf.getEventSource(ev);
		hospital = this.getElementsByClassName('hospitalName')[0];
		infos = this.getElementsByClassName('getvalue');		
		
		if( has( tt , 'conditionQuery') ){
			
			console.log( 1 );
			
			if( Elf.utils.trim( hospital.value ) === '' ){
				
				hospital.focus();
				
				console.log('请填医院名称');
				
				return				
				
			}else{
				
				//发送ajax请求数据，更新视图		
				console.log('医院查找中...');
			}
			
		
			
		}

	}
	
	//批量选择
	CooperativeUnits.prototype.batchSelectionFn = function(ev){
	
		var e,
		tt,
		has,
		infos;

		has = Elf.utils.hasClass;		
		e = Elf.getEvent(ev);
		tt = Elf.getEventSource(ev);
		
		if( has( tt , 'success') ){
			
			Elf.utils.addClass( tt , 'active');
			Elf.utils.removeClass(this.getElementsByClassName('un-success')[0] , 'active' );
			//请求数据，更新视图
			console.log('展示审核通过医院');
			return
		}
		
		if( has( tt , 'un-success') ){
			
			Elf.utils.addClass( tt , 'active');
			Elf.utils.removeClass(this.getElementsByClassName('success')[0] , 'active' );
			//请求数据，更新视图
			console.log('展示审核未通过医院');
			return
		}		
		
	}
		
	
})();

