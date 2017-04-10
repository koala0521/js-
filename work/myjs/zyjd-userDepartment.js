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

			return "<div>"+ ( rowData.pici ? rowData.pici : '第一批' ) +"<div>";

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
		this.addHospital(data);

	}
	
	UserManagement.prototype.contTitle = function(data){
		
		var conTil,
			numbers,
			_this;
			
		_this = this;
		conTil = $creatE('div','wfull numberPeople pl6 relative');
		numbers = $creatE('span');
		numbers.innerHTML = '剩余名额：'+ 3;
		addrow = $creatE('button' , 'btn add-hospital prl12');
		addrow.innerHTML = '添加基地';
		$pTo( numbers , conTil );
		$pTo( addrow , conTil );
		$pTo( conTil , _this.moduleWarp );
	}
	
	//生成表格
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
	
	//分页工具
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
		        onPagerChange:function(p){ 
		            currentPage = p; 		            
					console.log( data );
 					//更新数据
					Elf.components.grid.methods.update(_this.grid,data.slice((p-1)*pageSize,pageSize*p));

		        }
		        
	    	});
	    
	    $pTo( paging , pageNumber );
		$pTo( pageNumber , _this.moduleWarp );
		
	}
	
	//表格编辑事件
	UserManagement.prototype.handle = function( ev , obj , data ){
			
		var dialog,
			dialogHtml,
			e,
			target,
			_this;
			
			_this = this;
			e = Elf.getEvent(ev);
			target = Elf.getEventSource(ev); 		
			dialogHtml = Elf.controls.createElement( 'div','wfull dialog-inner' );	
			
			dialogHtml.innerHTML = '<div class="clear-both pt20" ><div class="fl hfull name prl6"  >基地名称 :  </div>	<div class="fr hfull text" > <input type="text" disabled="disabled" class="full prl6 area-name text" value='+ obj.yiyuanname  +' /> </div> </div><div class="clear-both pt20 relative" ><div class="fl hfull name prl6"  >密码 :  </div><div class="fr hfull text" ><input type="password" class="full prl6 pass-word text" value='+  obj.password  +'  /> </div><div class="tips prl10" >请输入密码 ! </div> </div><div class="clear-both pt20" ><div class="fl hfull name prl6"  >备注 :  </div><div class="fr hfull text" > <input type="text" class="full prl6 other-info text" value="'+ ( obj.beizhu ? obj.beizhu : '' ) +' " /> </div></div><div class="pt30 button-box" ><input class="btn saveData prl24 ptb6" type="button" value="确定"  /></div>';
			
			dialog = Elf.components.dialog({			
		        title:'',   
		        content: dialogHtml, 
		        dialogClass:'dialog-warp', 
		        width: 600,  
		        height: 400,
		        modal:true,    //是否显示遮罩层
	            target: _this.moduleWarp,    // 弹框父级元素，如果不写默认为body
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
				
				if( tar.nodeName === "INPUT" && Elf.utils.hasClass( tar , "text" ) && tar !== areaName  ){
					
					tar.value = '';
					
				} else if ( tar.nodeName === "INPUT" && Elf.utils.hasClass( tar , "saveData" ) ){
					
					if( Elf.utils.trim(passWord.value) === '' ){
						
						passWord.focus();
						tips.style.display = 'block';
						Elf.effects.show(tips , 2000 );
						
					} else {
	
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
	
	//添加基地
	UserManagement.prototype.addHospital = function(data){
		
		var html,
			str,
			diolog,
			data,
			addBtn,
			_this;
			
			_this = this;
			addBtn = this.moduleWarp.querySelector('.add-hospital');
			str = '<div class="clear-both pt20" ><div class="fl hfull name prl6"  >基地名称 :  </div>	<div class="fr hfull text" > <input type="text" class="full prl6 area-name text" name="yiyuanname"  autocomplete="new-password" /> </div> </div><div class="clear-both pt20 relative" ><div class="fl hfull name prl6"  >密码 :  </div><div class="fr hfull text" ><input type="password" class="full prl6 pass-word text" name="password" autocomplete="new-password" /> </div><div class="tips prl10" >请输入密码 ! </div> </div><div class="clear-both pt20" ><div class="fl hfull name prl6"  >备注 :  </div><div class="fr hfull text" > <input type="text" class="full prl6 other-info text" name="beizhu" /> </div></div><div class="pt30 button-box" ><input class="btn saveData prl24 ptb6" type="button" value="确定"  /></div>';
			
			
			addBtn.addEventListener('click',function(){
				
				html = Elf.controls.createElement( 'div','wfull dialog-inner' );
				html.innerHTML = str;
				dialog = Elf.components.dialog({
					
			        title:'请填写基地信息',   
			        content: html, 
			        dialogClass:'dialog-warp', 
			        width: 600,  
			        height: 400,
			        modal:true,    //是否显示遮罩层
		            target: _this.moduleWarp,    // 弹框父级元素，如果不写默认为body
			        onCloseDestroy:true,   //关闭弹框时，是否删除弹框组件DOM元素   
			        onClose:function(){		//关闭弹框时触发的函数
			        			        	
			            console.log( "关闭弹框" );
			        }
					
				});
				
				dialog.addEventListener('click',function(ev){
					var e,
						target,
						hospitalName,
						pw,
						otherInfo,
						obj;
					obj = {};	
					e = Elf.getEvent(ev);
					target = Elf.getEventSource(ev);
					hospitalName = this.querySelector('input.area-name');
					pw = this.querySelector('input.pass-word');
					otherInfo = this.querySelector('input.other-info'); 
					
					if( Elf.utils.hasClass( target , 'saveData' ) ){
						
						if( Elf.utils.trim(hospitalName.value) === '' ){
							
						    Elf.components.toast({
						        width:200,
						        height:200,
						        holdtime:500,
						        text:'请输入基地名称！',
						        target:dialog
						    });
							
						}else if( Elf.utils.trim(pw.value) === '' ){
							
						    Elf.components.toast({
						        width:200,
						        height:200,
						        holdtime:500,
						        text:'请输入密码！',
						        target:dialog
						    });							
							
						}else{
							
							obj[hospitalName.name] = hospitalName.value;
							obj[pw.name] = pw.value;
							obj[otherInfo.name] = otherInfo.value;
							obj.pici = '第二批';
							data.push( obj );
							currentPage = 1;							
							new UserManagement();
						}
						
						
					}
					
				});
				
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
		this.form = $creatE('form','full');
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
					_this.btnFn(provinceData.jdMingCe);
					_this.creatInfos(provinceData.jdMingCe);
					_this.hideBtns();
					_this.addHospital();
				},
				error:function(xhr){
					
					console.info(xhr);
				}
			});			
		
	}
	
	//btn事件
	ProvincialReported.prototype.btnFn = function( data ){
		var data = data;
		this.warp.addEventListener('click' , function(ev){
			
			var has,
				e,
				tt,
				arr,
				rows,
				texts,
				lxr,
				allText,
				mobileNum,
				obj,
				_this;
				
			_this = this;	
			obj = null;	
			arr = [];
			has = Elf.utils.hasClass;		
			e = Elf.getEvent(ev);
			tt = Elf.getEventSource(ev);
			lxr = this.querySelector('.lxr');
			mobileNum = this.querySelector('.mobile-num');
			allText = this.querySelectorAll('input[type="text"]');
			
			if( has( tt , 'save-data' ) ){
				
				console.log('保存数据'); 
				data[lxr.name] = lxr.value;
				data[mobileNum.name] = mobileNum.value;
				rows = this.getElementsByClassName('rowData');
				
				for (var i = 0; i < rows.length; i++) {
					texts = rows[i].getElementsByClassName('text-info');
					obj = {};
					for (var j = 0; j < texts.length; j++) {
						obj[texts[j].name] = texts[j].value;
					}
					arr.push( obj );
				}
				data.hospitalData = arr;
				
				console.log( data );
				
				return
			}
			if( has( tt , 'submit-data' ) ){
				
				for (var i = 0; i < allText.length; i++) {
					
					if( Elf.utils.trim( allText[i].value) === '' ){
						
						allText[i].focus();						
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
				}
				
				console.log('上报数据'); 
				data[lxr.name] = lxr.value;
				data[mobileNum.name] = mobileNum.value;
				rows = this.getElementsByClassName('rowData');
				
				for (var i = 0; i < rows.length; i++) {
					texts = rows[i].getElementsByClassName('text-info');
					obj = {};
					for (var j = 0; j < texts.length; j++) {
						obj[texts[j].name] = texts[j].value;
					}
					arr.push( obj );
				}
				data.hospitalData = arr;
				
				console.log( data );
				
				return				
							
			}			
			
		})
	}
	
	//渲染数据
	ProvincialReported.prototype.creatInfos = function( data ){
		
		var infosWarp = this.warp.getElementsByClassName('infos-warp')[0];		
		var hospitalData = data.hospitalData;
		var str ='';
		var lxr = this.warp.querySelector('.lxr');
		var mobileNum = this.warp.querySelector('.mobile-num');
		
		lxr.value = data.lxr;
		mobileNum.value = data.mobileNum;
		
		for (var i = 0; i < hospitalData.length; i++) {
			
			var row = $creatE('div' , 'full h40 clear-fix rowData');

			var index = $creatE('div' , 'col-xs-1 ceils hfull');			
			index.innerHTML = '<span>'+ (i + 1) +'</span>';			

			var name = $creatE('div' , 'col-xs-3 ceils hfull');			
			name.innerHTML = '<input type="text" name="hospitalName" value="'+ ( hospitalData[i].hospitalName ? hospitalData[i].hospitalName :"" ) +'" class="full text-info" />';

			var qingKuang = $creatE('div' , 'col-xs-5 hfull');			
			qingKuang.innerHTML = '<div class="col-xs-4 hfull ceils" ><input type="text" name="leiBie" value="'+ (hospitalData[i].type ? hospitalData[i].type : "") +'" class="full text-info" /></div><div class="col-xs-4 hfull ceils" ><input type="text" name="level" value="'+ (hospitalData[i].level ? hospitalData[i].level : "") +'" class="full text-info" /></div><div class="col-xs-4 hfull ceils" ><input type="text" name="dengJitype"  value="'+ (hospitalData[i].djtype ? hospitalData[i].djtype : "") +'" class="full text-info" /></div>';
			
			var peiXunLiang = $creatE('div' , 'col-xs-3 hfull ceils');
			peiXunLiang.innerHTML = '<input type="text" name="peiXunLiang" value="'+ ( hospitalData[i].pxzl? hospitalData[i].pxzl :""  ) +'" class="full text-info" />'
			
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
	
	//添加基地
	ProvincialReported.prototype.addHospital = function(){
		
		var addBtn,
			infoWarp,
			row,
			rowHtml,
			rowLen,
			_this;
		
		_this = this;
		addBtn = this.warp.querySelector('input.addrow');		
		addBtn.addEventListener('click',function(){
			row = $creatE('div' , 'full h40 clear-fix rowData');
			infosWarp = _this.warp.querySelector('div.infos-warp'); 
			rowLen = infosWarp.querySelectorAll('div.rowData');				
			rowHtml = '<div class="col-xs-1 ceils hfull"><span>'+ (rowLen.length + 1) +'</span></div><div class="col-xs-3 ceils hfull"><input type="text" name="hospitalName" class="full text-info"></div><div class="col-xs-5 hfull"><div class="col-xs-4 hfull ceils"><input type="text" name="leiBie" class="full text-info"></div><div class="col-xs-4 hfull ceils"><input type="text" name="level"  class="full text-info"></div><div class="col-xs-4 hfull ceils"><input type="text" name="dengJitype" class="full text-info"></div></div><div class="col-xs-3 hfull ceils"><input type="text" name="peiXunLiang" class="full text-info"></div>';
		
			row.innerHTML = rowHtml;
			$pTo( row , infosWarp );
						
		})
		

		
	}
	
	
	
})()

