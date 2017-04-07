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
			return "<div>第一批<div>";

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
			
			dialogHtml.innerHTML = '<div class="clear-both pt20" ><div class="fl hfull name prl6"  >基地名称 :  </div>	<div class="fr hfull text" > <input type="text" class="full prl6 area-name text" value='+ obj.yiyuanname  +' /> </div> </div><div class="clear-both pt20" ><div class="fl hfull name prl6"  >密码 :  </div><div class="fr hfull text" ><input type="password" class="full prl6 pass-word text" value='+  obj.passsword  +'  /> </div> </div><div class="clear-both pt20" ><div class="fl hfull name prl6"  >备注 :  </div><div class="fr hfull text" > <input type="text" class="full prl6 other-info text" value="'+ ( obj.beizhu ? obj.beizhu : '' ) +' " /> </div></div><div class="pt30 button-box" ><input class="btn saveData prl24 ptb6" type="button" value="确定"  /></div><div class="tips pt20" >请填写完整 ! </div>';
			
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

						obj.yiyuanname = areaName.value;
						obj.beizhu = otherInfo.value;

						Elf.components.grid.methods.update(_this.grid,data.slice( (currentPage-1)*pageSize , currentPage*pageSize));	

						
						//loading动画
					    Elf.components.loading({
//					        width:300,  //没效果...
//					        height:300, //没效果...
//					        color:"#000",   //没效果...
					        target:_this.warp   //loading组件的父级元素
					    });
					    

						
//						returnData.areaName = areaName.value;
//						returnData.passWord = passWord.value;
//						returnData.otherInfo = otherInfo.value;
						
						//发送ajax请求给后端更新数据
						setTimeout(function(){
							
							// 发送成功关闭loading动画
						    Elf.components.loading.methods.close();
							//删除弹框
							Elf.utils.remove( dialog );							
							
						},2000);

					}				
					
				}
				
			});
		
		}	


})()



//------******省级> 省级材料上报******-------
;(function(){
	
	var $creatE,
		$pTo,
		$attr,
		gridHdata;
	
	$creatE = Elf.controls.createElement;
	$pTo = Elf.controls.appendTo;
	$attr = Elf.utils.attr;
	
	function ProvincialReported(){
		
		this.content = document.getElementById("bg");
		this.form = $creatE('form');
		this.warp = $creatE('div' ,'grid3 full');
		
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
					Elf.controls.appendTo( _this.warp, _this.form);
					Elf.controls.appendTo( _this.form, _this.content);
					_this.btnFn();
					_this.creatInfos();
					_this.hideBtns();
				},
				error:function(xhr){
					
					console.info(xhr);
				}
			});			
		
	}
	
	//btn事件
	ProvincialReported.prototype.btnFn = function(){

		this.warp.addEventListener('click' , function(ev){
			
			var has,
				e,
				tt,
				arr,
				rows,
				texts,
				obj,
				_this;
				
			_this = this;	
			obj = null;	
			arr = [];
			has = Elf.utils.hasClass;		
			e = Elf.getEvent(ev);
			tt = Elf.getEventSource(ev);
			
			if( has( tt , 'save-data' ) ){
				
				console.log('保存数据'); 
				
				rows = this.getElementsByClassName('rowData');
				
				for (var i = 0; i < rows.length; i++) {
					texts = rows[i].getElementsByClassName('text-info');
					obj = {};
					for (var j = 0; j < texts.length; j++) {
						obj[texts[j].name] = texts[j].value;
					}
					arr.push( obj );
					
					console.log(  arr );
				}	
				
				return
			}
			if( has( tt , 'submit-data' ) ){
				
				console.log('提交数据'); 
				rows = this.getElementsByClassName('rowData');

				for (var i = 0; i < rows.length; i++) {
					texts = rows[i].getElementsByClassName('text-info');
					obj = {};
					for (var j = 0; j < texts.length; j++) {
						
						if( Elf.utils.trim( texts[j].value ) === '' ){
							
							texts[j].focus();
							
						    Elf.components.toast({
						        width:200,
						        height:200,
						        holdtime:1000,
						        text:'请填写完整信息！',
						        opacity:1,
						        target:_this.content
						    });			
			
							return
						}
						
						obj[texts[j].name] = texts[j].value;
					}
					
					arr.push( obj );
					
					console.log(  arr );
				}
				return
			}			
			
		})
	}
	
	//渲染数据
	ProvincialReported.prototype.creatInfos = function(){
		var infosWarp = document.getElementsByClassName('infos-warp')[0];
		
		var data = hospitalData;
		var str ='';
		
		for (var i = 0; i < 2; i++) {
			
			var row = $creatE('div' , 'full h40 clear-fix rowData');

			var index = $creatE('div' , 'col-xs-1 ceils hfull');			
			index.innerHTML = '<span>'+ (i + 1) +'</span>';			

			var name = $creatE('div' , 'col-xs-3 ceils hfull');			
			name.innerHTML = '<input type="text" name="hospitalName" value="'+ ( data[i].hospitalName ? data[i].hospitalName :"" ) +'" class="full text-info" />';

			var qingKuang = $creatE('div' , 'col-xs-5 hfull');			
			qingKuang.innerHTML = '<div class="col-xs-4 hfull ceils" ><input type="text" name="leiBie" value="'+ (data[i].type ? data[i].type : "") +'" class="full text-info" /></div><div class="col-xs-4 hfull ceils" ><input type="text" name="level" value="'+ (data[i].level ? data[i].level : "") +'" class="full text-info" /></div><div class="col-xs-4 hfull ceils" ><input type="text" name="dengJitype"  value="'+ (data[i].djtype ? data[i].djtype : "") +'" class="full text-info" /></div>';
			
			var peiXunLiang = $creatE('div' , 'col-xs-3 hfull ceils');
			peiXunLiang.innerHTML = '<input type="text" name="peiXunLiang" value="'+ ( data[i].pxzl? data[i].pxzl :""  ) +'" class="full text-info" />'
			
			$pTo( index , row );
			$pTo( name , row );
			$pTo( qingKuang , row );
			$pTo( peiXunLiang , row );
			$pTo( row , infosWarp );

		}
		
	}
	
	//隐藏按钮
	ProvincialReported.prototype.hideBtns = function(){
		var hash,
			btns;
			
		hash = window.location.hash.substring(1);
	
		btns = this.warp.getElementsByClassName('btn');
		
		console.log( hash );
		if( hash.indexOf('newPage3') !== -1 ){
			
			for (var i = 0; i < btns.length; i++) {
				
				Elf.effects.hidden(btns[i]);
			}			
		}
	
	}
	
})()

