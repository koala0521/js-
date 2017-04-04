//****中医基地-专业科室用户模块
//****startTime：2017-4-2 
//****author:gaopengfei

//------******省级> 省级用户管理******-------
;(function(){
		
	var thData,
		$creatE,
		$pTo,
		currentPage,
		pageSize;
		
	currentPage = 1,
	pageSize = 5;
	
	//用户管理表头数据
	thData = [
	
	{
		title:"序号",
		name:"",
		width:100,
		align:"center",
		fixedColumn:false,
		checkCol:false,
		valign:"middle",
		renderer:function(name,rowIndex,rowData){
			return rowIndex+1+ (currentPage-1)*pageSize;
		}
	}

	,{
		title:"基地名称",
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
		title:"密码",
		name:"",
		width:150,
		align:"center",
		fixedColumn:false,
		valign:"middle",
		renderer:function(name,rowIndex,rowData){

			return "<div>******</div>" ;
		}
	}
	,{
		title:"批次",
		name:"",
		width:100,
		align:"center",
		fixedColumn:false,
		valign:"middle",
		renderer:function(name,rowIndex,rowData){
		
			//rowData.pici
			return "第一批";

		}
	}
	,{
		title:"备注",
		name:"",
		width:100,
		align:"center",
		renderer:function(name,rowIndex,rowData){	    			
			return "<div>"+ (rowData.beizhu ? rowData.beizhu : '') +"</div>";
			
		}
	}
	,{
		title:"操作",
		name:"",
		width:80,
		align:"center",
		renderer:function(name,rowIndex,rowData){	    			
			
			return "<a href='javascript:;' class='bianJi' >编辑</a>";
			
		}
	}

];
    
	$creatE = Elf.controls.createElement;
	$pTo = Elf.controls.appendTo;
	
	//---------------------------加载用户管理模块--------------------------------------------
		
	function UserManagement(){
		//页面容器
		this.content = document.getElementById("bg");
		this.moduleWarp = $creatE('div','full');	//内容区容器	
		
		//ajax请求数据，成功后执行init函数，把数据传入init
		this.init(studentList);
	
	}
	
	//暴露接口
	zyjdModuleByGao.userManage = UserManagement; 	
	
	UserManagement.prototype.init = function(data){
		var _this = this;
		
		_this.content.innerHTML = '';
		$pTo( _this.moduleWarp , _this.content );
				
		this.contTitle(data);
		this.grid(data);
		this.pagesNumber(data);

	}
	
	UserManagement.prototype.contTitle = function(data){
		
		var conTil,
			numbers,
			_this;
			
		_this = this;
		conTil = $creatE('div','wfull numberPeople pl6');
		numbers = $creatE('span');
		numbers.innerHTML = '剩余名额：'+ 3;
		$pTo( numbers , conTil );
		$pTo( conTil , _this.moduleWarp );
	}
	
	UserManagement.prototype.grid = function( data ){
		
		var gridWarp,
			grid,
			_this;
		_this = this;	
		gridWarp = $creatE( 'div' , 'wfull tableWarp ptb10' );	//表格容器
		
		$pTo( gridWarp , _this.moduleWarp );
				
		this.grid = Elf.components.grid({
			cols:thData,
			data:data.slice( 0 , pageSize ),
			fullWidthRows:true,
			onCellSelected:function(evt,item,rowIndex,colIndex){

	    		var tt = evt.target;

	    		if( Elf.utils.hasClass(tt,"bianJi") ){
	    			
	    			console.log( item );
	    			_this.handle( evt , item ,data );
	    		}
			},
			target:gridWarp
		});

	}
	
	UserManagement.prototype.pagesNumber = function( data ){
		
		var pageNumber ,paging ,_this;
			_this = this;
			pageNumber = $creatE('div','UM-grid-pageNumber ptb20');

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
	    
	    $pTo( paging , pageNumber );
		$pTo( pageNumber , _this.moduleWarp );
		
	}
	
	UserManagement.prototype.handle = function ( ev , obj , data ){	//弹框结构和事件
			
			var dialog,
			dialogHtml,
			e,
			target,
			_this;
			
			_this = this;
			e = Elf.getEvent(ev);
			target = Elf.getEventSource(ev); 		
			dialogHtml = Elf.controls.createElement( 'div','wfull dialog-inner' );		
			dialogHtml.innerHTML = `<div class="clear-both pt20" >
		        	<div class="fl hfull name prl6"  >基地名称 :  </div>	
		        	<div class="fr hfull text" > <input type="text" class="full prl6 area-name text" value= ${ obj.yiyuanname } /> </div>
		        </div>
		        
		        <div class="clear-both pt20" >
		        	<div class="fl hfull name prl6"  >密码 :  </div>	
		        	<div class="fr hfull text" > <input type="password" class="full prl6 pass-word text" value= ${ obj.passsword }  /> </div>
		        </div>
		        
		        <div class="clear-both pt20" >
		        	<div class="fl hfull name prl6"  >备注 :  </div>	
		        	<div class="fr hfull text" > <input type="text" class="full prl6 other-info text" value=" ${ obj.beizhu ? obj.beizhu : '' }" /> </div>
		        </div>
		        
		        <div class="pt30 button-box" >
					<input class="btn saveData prl24 ptb6" type="button" value="确定"  />
		        </div>
		        
		        <div class="tips pt20" >
		        	请填写完整 !
		        </div>`;
			
			dialog = Elf.components.dialog({			
		        title:'',   
		        content: dialogHtml, 
		        dialogClass:'dialog-warp', 
		        width: 600,  
		        height: 400,
		        modal:true,    //是否显示遮罩层
	            target: document.body,    // 弹框父级元素，如果不写默认为body
		        onCloseDestroy:true,   //关闭弹框时，是否删除弹框组件DOM元素   
		        onClose:function(){		//关闭弹框时触发的函数
		        			        	
		            console.log( "关闭弹框" );
		        }
				
			});	
			
			dialogHtml.addEventListener("click",function( ev ){
				
				var e,target,areaName,passWord,otherInfo,tips,returnData;
				
				e = Elf.getEvent(ev);
				tar = Elf.getEventSource(ev);
				areaName = this.getElementsByClassName('area-name')[0];
				passWord = this.getElementsByClassName('pass-word')[0];
				otherInfo = this.getElementsByClassName('other-info')[0];
				tips = this.getElementsByClassName('tips')[0];
				returnData = {};
				
				if( tar.nodeName === "INPUT" && Elf.utils.hasClass( tar , "text" ) ){
					
					tar.value = '';
					
				} else if ( tar.nodeName === "INPUT" && Elf.utils.hasClass( tar , "saveData" ) ){
					
					if( Elf.utils.trim(areaName.value) === '' ){
						
						areaName.focus();
						tips.innerHTML = '请填写基地名称 ！';
						tips.style.display = 'block';					
						Elf.effects.show(tips , 2000 );
	
						
					} else if( Elf.utils.trim(passWord.value) === '' ){
						
						passWord.focus();
						tips.innerHTML = '请输入密码 ！';
						tips.style.display = 'block';
						Elf.effects.show(tips , 2000 );
						
					} else{
	
						// 修改完成，返回数据 ,更新视图。
						console.log( data );
						
						obj.yiyuanname = areaName.value;
						obj.beizhu = otherInfo.value;
						
						Elf.components.grid.methods.update(_this.grid,data.slice( (currentPage-1)*pageSize , pageSize));						
						returnData.areaName = areaName.value;
						returnData.passWord = passWord.value;
						returnData.otherInfo = otherInfo.value;
					}				
					
				}
				
			});
		
		}	


})()



//------******省级> 省级材料上报******-------
;(function(){
	
	var $creatE,
		$pTo,
		gridHdata;
	
	$creatE = Elf.controls.createElement;
	$pTo = Elf.controls.appendTo;
	
	function ProvincialReported(){
		
		this.content = document.getElementById("bg");
		this.warp = $creatE('div' ,'grid4 full');
		
		this.init();
	}
	
	//省级材料上报附件3接口
	zyjdModuleByGao.provincialReported = ProvincialReported;
	
	ProvincialReported.prototype.init = function(){
		
		this.creatGrid3();

	}
	
	ProvincialReported.prototype.creatGrid3 = function(){
		
			var _this = this;
			
			Elf.components.ajax({
				
				url:"zyjd-provinceManage-file3.html",
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
	
	ProvincialReported.prototype.btnFn = function(){

		this.warp.addEventListener('click' , function(ev){
			
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
	
})()

