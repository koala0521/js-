/*
****中医基地-专业科室用户模块
****startTime：2017-3-31 
****author:gaopengfei
*/
;(function(){
		
	var $creatE ,$pTo;
	
	$creatE = Elf.controls.createElement;
	$pTo = Elf.controls.appendTo;
	
/***** 专业科室 > 专业科室基本情况表4 ******/
	;(function(){
		
		var jbzlGridHead = [
			{
				title:"编号",
				name:"",
				width:48,
				align:"center",
				fixedColumn:false,
				checkCol:false,
				valign:"middle",
				renderer:function(name,rowIndex,rowData){
					return '<div class="fixedCell">'+ (rowIndex+1) +'</div>';
				}
			},		
			{
				title:"疾病种类",
				name:"",
				width:200,
				align:"center",
				fixedColumn:false,
				checkCol:false,
				valign:"middle",
				renderer:function(name,rowIndex,rowData){
					return '<div>'+ rowData.grandson.field1 ? rowData.grandson.field1 :""  +'</div>';
				}
			},	
			{
				title:"年诊治例数",
				name:"",
				width:100,
				align:"center",
				fixedColumn:false,
				checkCol:false,
				valign:"middle",
				renderer:function(name,rowIndex,rowData){
					
					if( rowData.grandson.field2 == 0 || rowData.grandson.field2 ){
						
						return '<div>'+ rowData.grandson.field2 +'</div>';
					}else{
						
						return '';						
						
					}
				

				}
			},
			{
	    		title:"操作"
	    		,name:""
	    		,width:150
	    		,align:"center"
	    		,renderer:function(name,rowIndex,rowData){

	    			return '<input type="button" data-tooltip="删除第'+(rowIndex+1)+'行"'+' class="btn line-h30 prl6 delete elf-tooltip-left" value="删除" /><input type="button" class="edit prl6 btn line-h30" value="编辑" />'
	    		}
	    }
		
		];
		var stGridHead = [
			{
				title:"编号",
				name:"",
				width:48,
				align:"center",
				fixedColumn:false,
				checkCol:false,
				valign:"middle",
				renderer:function(name,rowIndex,rowData){
					
					return '<div class="fixedCell">'+ (rowIndex+1) +'</div>';
				}
			},		
			{
				title:"临床技能操作/手术种类",
				name:"",
				width:200,
				align:"center",
				fixedColumn:false,
				checkCol:false,
				valign:"middle",
				renderer:function(name,rowIndex,rowData){
					return '<div>'+ rowData.grandson.field1 ? rowData.grandson.field1 :"" +'</div>';
				}
			},	
			{
				title:"年完成例数",
				name:"",
				width:100,
				align:"center",
				fixedColumn:false,
				checkCol:false,
				valign:"middle",
				renderer:function(name,rowIndex,rowData){
					
					if( rowData.grandson.field2 == 0 || rowData.grandson.field2 ){
						
						return '<div>'+ rowData.grandson.field2 +'</div>';
					}else{
						
						return '';						
						
					}
				}
			},
			{
	    		title:"操作"
	    		,name:""
	    		,width:150
	    		,align:"center"
	    		,renderer:function(name,rowIndex,rowData){

	    			return '<input type="button" class="btn line-h30 prl6 delete elf-tooltip-left" value="删除" /><input type="button" class="edit prl6 btn line-h30" value="编辑" />'
	    		}
	    }
		
		];		
		var meGridHead = [
			{
				title:"编号",
				name:"",
				width:48,
				align:"center",
				fixedColumn:false,
				checkCol:false,
				valign:"middle",
				renderer:function(name,rowIndex,rowData){
					return '<div class="fixedCell">'+ (rowIndex+1) +'</div>';
				}
			},		
			{
				title:"设备仪器名称（正常使用）",
				name:"",
				width:200,
				align:"center",
				fixedColumn:false,
				checkCol:false,
				valign:"middle",
				renderer:function(name,rowIndex,rowData){
					
					return '<div>'+ rowData.grandson.field1 ? rowData.grandson.field1 :"" +'</div>';
				}
			},	
			{
				title:"数量（台）",
				name:"",
				width:100,
				align:"center",
				fixedColumn:false,
				checkCol:false,
				valign:"middle",
				renderer:function(name,rowIndex,rowData){
					
					if( rowData.grandson.field2 == 0 || rowData.grandson.field2 ){
						
						return '<div>'+ rowData.grandson.field2 +'</div>';
					}else{
						
						return '';						
						
					}
				}
			},
			{
	    		title:"操作"
	    		,name:""
	    		,width:150
	    		,align:"center"
	    		,renderer:function(name,rowIndex,rowData){

	    			return '<input type="button" class="btn line-h30 prl6 delete elf-tooltip-left" value="删除" /><input type="button" class="edit prl6 btn line-h30" value="编辑" />'
	    		}
	    }		
		
		];
	
		//查询数据
		function getBaseData( _this , fDepartmentCode) {
		    var args = {};
		    args.fType = "20";
			args.fTableNumber = "departmentBasic";
		    var service = {
		        serviceModule: serviceInfo.serviceModule,
		        serviceNumber: '100090080',
		        token: use_info.token,
		        args: {
		        	"parent":args,
			        "fDepartmentCode": _this.fDepartmentCode,
			        "fChildrenId" : _this.fChildrenId,
			        "fBatchInfoId":_this.fBatchInfoId
		        }
		    };
	
		    commonLogic.serviceCaller(service, function (data) {
		        
		        //console.log(JSON.stringify(data));
		        if(data.flag == "true"){
		        	
//		        	console.log( data );		
					_this.init( data );
					
	
		        }else{
		        	
		            Elf.components.toast({text:data.error});
		        }
		    });
		}
		
		//发送数据
		function subEditBaseData( args , _this ) {
			
			args.fDepartmentCode =  _this.fDepartmentCode;
			args.fChildrenId = _this.fChildrenId;
			args.fBatchInfoId = _this.fBatchInfoId;
			
		    var service = {
		        serviceModule: serviceInfo.serviceModule,
		        serviceNumber: '100090090',
		        token: use_info.token,
		        args: args
		    };
		    commonLogic.serviceCaller(service, function (data) {
		        //console.log(JSON.stringify(data));
		        //alert(data.flag);
		        if(data.flag == "true"){
		            //alert(data.result);
				    Elf.components.toast({
				        holdtime:500,
				        text:'修改成功',
				        target:document.body
				    });	

		        }else{
		            Elf.components.toast({text:data.error});
		        }
		    });
		}	

		
		function BasiSituation4( fDepartmentCode , fChildrenId , fBatchInfoId ){
			
			this.content = document.querySelector(".elf_fiexd_center");
			this.warp = $creatE('div' ,'grid4 full p10');
			this.form = $creatE('form','full');
			var _this = this;
			
			
			if( !fDepartmentCode && fDepartmentCode != 0 ){
				
				fDepartmentCode = "";
				
			}
			
			if( !fChildrenId && fChildrenId != 0 ){
				
				fChildrenId = "";
				
			}
			if( !fBatchInfoId && fBatchInfoId != 0 ){
				
				fChildrenId = "";
				
			}			
			_this.fBatchInfoId
			
			this.fDepartmentCode = fDepartmentCode;
			this.fChildrenId = fChildrenId;
			this.fBatchInfoId = fBatchInfoId;
			
			getBaseData(_this, fDepartmentCode);
			
		}
		
		//专业科室基本情况表4接口
		zyjdModuleByGao.basiSituation4 = BasiSituation4;
		
		BasiSituation4.prototype.init = function(data){
											
			data.result.parent = {"fTableNumber":"departmentBasic"};
					
					
			if( !data.result.childrenList.length ){
			
				data.result.childrenList = [   
					{
		                "children":{"fOrder":0},
		                "grandsonList":[]
		            },
					{
		                "children":{"fOrder":1},
		                "grandsonList":[]
		            },				{
		                "children":{"fOrder":2},
		                "grandsonList":[]
		            }			
				];				
				
			}
			
			this.creatGrid4(data);

		}
		
		//生成表格
		BasiSituation4.prototype.creatGrid4 = function(data){
			var _this = this;
			console.log( data );
			Elf.components.ajax({
				
				url:"zyjd-professional-grid4.html",
				dataType:"html",
//				data:{id:1,ccc:"ccc"},				
				success:function(strData){
					
					_this.warp.innerHTML = strData;
					_this.content.innerHTML = '';
					Elf.controls.appendTo( _this.warp, _this.form);
					Elf.controls.appendTo( _this.form, _this.content);
					//请求数据	
					_this.randerInfo( data );
					_this.btnFn( data );
					_this.addInfo( data);
					_this.hideBtns( data.result.fEditable );
				},
				error:function(xhr){
					
					console.info(xhr);
				}
			});			
			
		}
		
		//按钮事件
		BasiSituation4.prototype.btnFn = function( data ){
			
			var _this = this;			
			this.warp.addEventListener('click', function(ev){
		
				var has,
					e,
					tt,
					infoObj,
					radios,
					isChecked,
					allInput;
					
				has = Elf.utils.hasClass;		
				e = Elf.getEvent(ev);
				tt = Elf.getEventSource(ev);
				isChecked = false;
							
				radios = this.getElementsByClassName('is-importent');
				allInput = this.querySelectorAll('input.text');
				
				//保存数据
				if( has( tt , 'save-data' ) ){

					infoObj = _this.getFormData( data );

					infoObj.parent.fIsComplete = 0;
					//发送后台数据
					subEditBaseData( infoObj , _this );
				
					return
				}
				
				//提交数据按钮
				if( has( tt , 'submit-data' ) ){
					
					//验证radio非空
					for (var i = 0; i < radios.length; i++) {
						
						if( radios[i].checked ){
							
							isChecked = true;
							break;
						}

					}
					
					if( !isChecked ){

						Elf.utils.addClass( radios[0].parentNode , "focus");

					    Elf.components.toast({
					        holdtime:1000,
					        text:'请填写完整信息',
					        opacity:0.8,
					        target:document.body
					    });							
						
						return
						
					}else{
						
						Elf.utils.removeClass( radios[0].parentNode , "focus");
					}
					
					//验证text非空
					for (var i = 0; i < allInput.length; i++) {
						
						if(  Elf.utils.trim( allInput[i].value ) === '' ){
							
							allInput[i].focus();
								
						    Elf.components.toast({
						        holdtime:1000,
						        text:'请填写完整信息',
						        opacity:0.8,
						        target:document.body
						    });	
						    
						    return
						}
					
					}
			 		var re = /\D+/g;					
					var numbers = this.querySelectorAll('input.number');
					for (var i = 0; i < numbers.length; i++) {
						
						if( re.test( Elf.utils.trim(numbers[i].value) ) ){
							
							numbers[i].focus();

					    Elf.components.toast({
					        holdtime:1000,
					        text:'请输入数字',
					        opacity:0.8,
					        target:document.body
					    });
							return
						}
						
					}
					
					infoObj = _this.getFormData( data );
					infoObj.parent.fIsComplete = 1;
					//发送后台数据
					subEditBaseData( infoObj , _this );
				    
					return
				}

				
			})
		}
		
		//隐藏按钮
		BasiSituation4.prototype.hideBtns = function( fEditable ){
			var hash,
				btns,
				inputs;
				
			hash = window.location.hash.substring(1);	
			btns = this.warp.querySelectorAll('input.btn');
			inputs = this.warp.querySelectorAll('input');	
			
			if( hash.indexOf('newPage') !== -1 || fEditable == 0 ){
								
				for (var i = 0; i < inputs.length; i++) {
					inputs[i].disabled = 'disabled';
				}			
				for (var i = 0; i < btns.length; i++) {
					
					Elf.effects.hidden(btns[i]);
				}			
			}
		}
		
		//渲染表单
		BasiSituation4.prototype.randerInfo = function(data){
			var data,
				objTexts,
				radios,
				diseaseTypeWarp,
				skillTypeWarp,
				medicalEquipment,
				_this,
				dialog,
				dialogHtml,
				dataList,
				textsData,
				gridData1,
				gridData2,
				gridData3;
				
			_this = this;
			data = data;			
			dataList = data.result.childrenList;

			for (var i = 0; i < dataList.length; i++) {
				
				if( dataList[i].children.fOrder == 0 ){
					
					textsData = dataList[i].children;
					gridData1 = dataList[i].grandsonList;
					
				}else if ( dataList[i].children.fOrder == 1 ){
					
					gridData2 = dataList[i].grandsonList;
					
					
				}else if( dataList[i].children.fOrder == 2 ){
					
					gridData3 = dataList[i].grandsonList;
					
				}
			}
  
			objTexts = this.warp.getElementsByClassName('objText');
			raudioWarp = this.warp.querySelector('span.audio-warp');
			radios = this.warp.getElementsByClassName('is-importent');
			diseaseTypeWarp = this.warp.querySelector('.disease-type-warp');
			skillTypeWarp = this.warp.querySelector('.skill-type-warp');
			medicalEquipment = this.warp.querySelector('.medical-equipment-warp');
			
			//单选按钮
			for (var i = 0; i < radios.length; i++) {
				
				if( radios[i].value == textsData.field8 ){
					console.log( raudioWarp );
					radios[i].checked = "checked";
					Elf.utils.addClass( raudioWarp , 'has-value');
				}
			}
			//其他基础数据
			for (var i = 0; i < objTexts.length; i++) {
				
				objTexts[i].value = textsData[objTexts[i].name]?textsData[objTexts[i].name]:'';
				
				if( Elf.utils.trim( objTexts[i].value ) !== '' ){
						
						Elf.utils.addClass( objTexts[i], 'has-value');
											
				}
				
				objTexts[i].addEventListener('blur',function(){

					var _this = this;
					if( Elf.utils.trim( _this.value ) === '' ){
						
						Elf.utils.removeClass(_this , 'has-value');
											
					}else{
						
						Elf.utils.addClass(_this , 'has-value');
						
					}
					
				})
			}
		
			//疾病种类				
		    this.dtGrid = Elf.components.grid({
		        fixedTableSize:30,  
		        data:gridData1? gridData1.slice(0 , Infinity) : [],    //第一页要显示的数据
		        cols:jbzlGridHead,   
		        width: 40,
		        target:diseaseTypeWarp, 
		        onCellSelected:function(evt,item,rowIndex,colIndex){
		            var tt=evt.target;          // 事件源
		            
		            if( Elf.utils.hasClass(tt,"delete") ){ 

		                item.grandson.fIsDel = 1;
		                
		                var filterArr = Elf.utils.grep( gridData1 , function( item , index ){
		                	
		                	return item.grandson.fIsDel == 0;
		                })		
		                
		                Elf.components.grid.methods.update( _this.dtGrid , filterArr );
		                
		            }
		            if( Elf.utils.hasClass(tt,"edit") ){ 
		                
		                dialogHtml = '<div class="h40 line-h40 mt50" ><div class="col-xs-6 textr" ><span class="name" >疾病种类：</span></div><div class="col-xs-6 " ><input type="text" class="text p5 line-h20 textc" value= "'+ item.grandson.field1 +'"  name="field1" /></div></div><div class="h40 line-h40 mt20" ><div class="col-xs-6 textr" ><span class="num" >年诊治例数：</span></div><div class="col-xs-6 " ><input type="text" class="text p5 line-h20 textc" value= "'+ item.grandson.field2 +'"  name="field2" /></div></div><div class="h40 line-h40 mt20" ></div><div class="h40 line-h40 mt20 textc" ><input type="button" class="btn prl24 line-h30" value="确定" /></div>';
		                
		                dialog = Elf.components.dialog({
					        title:'修改',   
					        content:dialogHtml, 
					        dialogClass:'',  
					        width:600,  
					        height:360,
					        modal:true,    //是否显示遮罩层
				            target:_this.warp,   
					        onCloseDestroy:true,     
					        onClose:function(){

					        }
					    });
						
						dialog.addEventListener('click',function(ev){
							
							var has,
								e,
								tt,
								infoObj,
								radios,
								isChecked,
								allInput;
								
							has = Elf.utils.hasClass;		
							e = Elf.getEvent(ev);
							tt = Elf.getEventSource(ev);
							allInput = this.querySelectorAll('input.text');
							
							if( has( tt , 'btn' ) ){
								
								for (var i = 0; i < allInput.length; i++) {
									
									if( Elf.utils.trim( allInput[i].value ) === '' ){
										
										allInput[i].focus();
									    Elf.components.toast({
									        holdtime:1000,
									        text:'请填写完整信息！',
									        opacity:0.8,
									        target:document.body
									    });										
										return
									}
								}
								for (var i = 0; i < allInput.length; i++) {
								
									item.grandson[allInput[i].name] = allInput[i].value;
								}

		               			Elf.components.grid.methods.update( _this.dtGrid , gridData1 );								
		               			Elf.utils.remove(this);
		               			
		               			console.log( dataList );
		               			
							}
							
						})
		            
		            }
		            
		        }
		     });
			
			//临床技能
		    this.stGrid = Elf.components.grid({
		        fixedTableSize:30,  
		        data: gridData2 ? gridData2.slice(0 , Infinity):[],    
		        cols:stGridHead,   
		        width: 40,
		        target:skillTypeWarp, 
		        onCellSelected:function(evt,item,rowIndex,colIndex){
		            var tt=evt.target;     
		            if(Elf.utils.hasClass(tt,"delete")){   
		            	
		                item.grandson.fIsDel = 1;
		                
		                var filterArr = Elf.utils.grep( gridData2 , function( item , index ){
		                	
		                	return item.grandson.fIsDel == 0;
		                })	
		                
		                Elf.components.grid.methods.update( _this.stGrid , filterArr );
		            }
		            if(Elf.utils.hasClass(tt,"edit")){  //判断事件源是否是 编辑 按钮
		                console.info("编辑行");
		                
		                dialogHtml = '<div class="h40 line-h40 mt50" ><div class="col-xs-6 textr" ><span class="name" >临床技能操作/手术种类：</span></div><div class="col-xs-6 " ><input type="text" class="text p5 line-h20 textc" value= "'+ item.grandson.field1 +'"  name="field1" /></div></div><div class="h40 line-h40 mt20" ><div class="col-xs-6 textr" ><span class="num" >年完成例数：</span></div><div class="col-xs-6 " ><input type="text" class="text p5 line-h20 textc" value= "'+ item.grandson.field2 +'"  name="field2" /></div></div><div class="h40 line-h40 mt20" ></div><div class="h40 line-h40 mt20 textc" ><input type="button" class="btn prl24 line-h30" value="确定" /></div>';
		                
		                dialog = Elf.components.dialog({
					        title:'修改',   
					        content:dialogHtml, 
					        dialogClass:'', 
					        width:600,  
					        height:360,
					        modal:true,  
				            target:_this.warp,  
					        onCloseDestroy:true, 
					        onClose:function(){
					            
					        }
					    });
						
						dialog.addEventListener('click',function(ev){
							
							var has,
								e,
								tt,
								infoObj,
								radios,
								isChecked,
								allInput;
								
							has = Elf.utils.hasClass;		
							e = Elf.getEvent(ev);
							tt = Elf.getEventSource(ev);
							allInput = this.querySelectorAll('input.text');
							
							if( has( tt , 'btn' ) ){
								
								for (var i = 0; i < allInput.length; i++) {
									
									if( Elf.utils.trim( allInput[i].value ) === '' ){
										
										allInput[i].focus();
									    Elf.components.toast({
									        holdtime:1000,
									        text:'请填写完整信息！',
									        opacity:0.8,
									        target:document.body
									    });										
										return
									}
								}
								for (var i = 0; i < allInput.length; i++) {
								
									item.grandson[allInput[i].name] = allInput[i].value;
								}

		               			Elf.components.grid.methods.update( _this.stGrid , gridData2 );								Elf.utils.remove(this);
		               			
							}
							
						})
		            		                
		            }
		        }
		     });
			//设备仪器名称
		    this.meGrid = Elf.components.grid({
		        fixedTableSize:30,  
		        data:gridData3 ? gridData3.slice(0 , Infinity):[],    
		        cols:meGridHead,   
		        width: 40,
		        target:medicalEquipment, 
		        onCellSelected:function(evt,item,rowIndex,colIndex){
		            var tt=evt.target; 
		            var itemObj = item;
		        
		            if(Elf.utils.hasClass(tt,"delete")){  
		            	

		                item.grandson.fIsDel = 1;
		                var filterArr = Elf.utils.grep( gridData3 , function( item , index ){
		                	
		                	return item.grandson.fIsDel == 0;
		                })
		                
		                Elf.components.grid.methods.update( _this.meGrid , filterArr );
		            }
		            if(Elf.utils.hasClass(tt,"edit")){ 
		                
		                dialogHtml = '<div class="h40 line-h40 mt50" ><div class="col-xs-6 textr" ><span class="name" >临床技能操作/手术种类：</span></div><div class="col-xs-6 " ><input type="text" class="text p5 line-h20 textc" value= "'+ item.grandson.field1 +'"  name="field1" /></div></div><div class="h40 line-h40 mt20" ><div class="col-xs-6 textr" ><span class="num" >年完成例数：</span></div><div class="col-xs-6 " ><input type="text" class="text p5 line-h20 textc" value= "'+ item.grandson.field2 +'"  name="field2" /></div></div><div class="h40 line-h40 mt20" ></div><div class="h40 line-h40 mt20 textc" ><input type="button" class="btn prl24 line-h30" value="确定" /></div>';
		                
		                dialog = Elf.components.dialog({
					        title:'修改',  
					        content:dialogHtml, 
					        dialogClass:'',  
					        width:600,  
					        height:360,
					        modal:true,    
				            target:_this.warp,  
					        onCloseDestroy:true, 
					        onClose:function(){
					            
					        }
					    });
						
						dialog.addEventListener('click',function(ev){
							
							var has,
								e,
								tt,
								infoObj,
								radios,
								isChecked,
								allInput;
								
							has = Elf.utils.hasClass;		
							e = Elf.getEvent(ev);
							tt = Elf.getEventSource(ev);
							allInput = this.querySelectorAll('input.text');
							
							if( has( tt , 'btn' ) ){
								
								for (var i = 0; i < allInput.length; i++) {
									
									if( Elf.utils.trim( allInput[i].value ) === '' ){
										
										allInput[i].focus();
									    Elf.components.toast({
									        holdtime:1000,
									        text:'请填写完整信息！',
									        opacity:0.8,
									        target:document.body
									    });										
										return
									}
								}
								for (var i = 0; i < allInput.length; i++) {
								
									item.grandson[allInput[i].name] = allInput[i].value;
								}

		               			Elf.components.grid.methods.update( _this.meGrid , gridData3 );								
		               			Elf.utils.remove(this);
		               			
							}
							
						})
		            			                
		                
		            }
		        }
		    });		
		}
		
		//获取表单数据
		BasiSituation4.prototype.getFormData = function( data ){
			
			var objTexts,
				childrenList,
				infoObj,
				radios,
				isChecked,
				allInput,
				TextsData;
				
			objTexts = this.warp.getElementsByClassName('objText');				
			radios = this.warp.getElementsByClassName('is-importent');
			allInput = this.warp.querySelectorAll('input.text');
			isChecked = false;
			childrenList = data.result.childrenList;

			for (var i = 0; i < childrenList.length; i++) {
				
				if( childrenList[i].children.fOrder == 0 ) {
				
					TextsData = childrenList[i].children;
					
				}
			}
			
			//基础数据
			for (var i = 0; i < objTexts.length; i++) {
				
				TextsData[objTexts[i].name] = objTexts[i].value;
			
			}

			//单选按钮数据
			for (var i = 0; i < radios.length; i++) {
				
				if( radios[i].checked ){
					
					isChecked = true;
					TextsData[radios[i].name] = radios[i].value;
					break;
				}
				
			}	
			
			return data.result;
		
		}
		
		//添加数据
		BasiSituation4.prototype.addInfo = function(data){
			
			var data = data,
				typeList = data.result.childrenList,
				_this = this;

			this.warp.addEventListener('click' , function(ev){
				
				var has,
					e,
					tt,
					dialog,
					dialogHtml,
					spanName,
					spanNum,
					inputName,
					inputNum,
					saveAdd;

				has = Elf.utils.hasClass;		
				e = Elf.getEvent(ev);
				tt = Elf.getEventSource(ev);

				
				dialogHtml = '<div class="h40 line-h40 mt50" ><div class="col-xs-6 textr" ><span class="name" ></span></div><div class="col-xs-6 " ><input type="text" class="text name p5 line-h20 textc" name="field1" /></div></div><div class="h40 line-h40 mt20" ><div class="col-xs-6 textr" ><span class="num" ></span></div><div class="col-xs-6 " ><input type="text" name="field2"  class="text num p5 line-h20 textc" /></div></div><div class="h40 line-h40 mt20" ></div><div class="h40 line-h40 mt20 textc" ><input type="button" class="btn save-add prl24 line-h30" value="确定" /></div>';
				
				if( has( tt ,'addrow') ){
					
	                dialog = Elf.components.dialog({
				        title:'添加信息',   
				        content:dialogHtml, 
				        dialogClass:'',  
				        width:600,  
				        height:360,
				        modal:true,    
			            target:_this.warp,   
				        onCloseDestroy:true,     
				        onClose:function(){

				        }
				    });	
					
					spanName = dialog.querySelector('span.name');
					spanNum = dialog.querySelector('span.num');
					inputName = dialog.querySelector('input.name');
					inputNum = dialog.querySelector('input.num');
					saveAdd = dialog.querySelector('input.save-add');
					
					if( has( tt , 'disease-type' ) ){

						spanName.innerHTML = '疾病种类：';
						spanNum.innerHTML = '年诊治例数（例）：';

						Elf.utils.attr( saveAdd , 'data-type' , 'disease-type' );
						
					}else if( has( tt , 'skill-type' ) ){

						spanName.innerHTML = '临床技能操作/手术种类：';
						spanNum.innerHTML = '年完成例数（例）：';	
	
						Elf.utils.attr( saveAdd , 'data-type' , 'skill-type' );			
						
					}else if( has( tt , 'medical-equipment' ) ){
						
						spanName.innerHTML = '设备仪器名称（正常使用）：';
						spanNum.innerHTML = '数量（台）：';		
	
						Elf.utils.attr( saveAdd , 'data-type' , 'medical-equipment' );						
					}
				
					//添加确认
					saveAdd.addEventListener('click' , function(){
							
						var has,
							e,
							tt,
							obj;
		
						has = Elf.utils.hasClass;		
						e = Elf.getEvent(ev);
						tt = Elf.getEventSource(ev);
						obj ={};
						if( Elf.utils.trim( inputName.value ) === '' ){				
							
							inputName.focus();							
						    Elf.components.toast({
						        holdtime:1000,
						        text:'请填写完整！',
						        opacity:0.8,
						        target:document.body
						    });	
						    
							return	
						}
						
						if( Elf.utils.trim( inputNum.value ) === '' ){				
							
							inputNum.focus();							
						    Elf.components.toast({
						        holdtime:1000,
						        text:'请填写完整！',
						        opacity:0.8,
						        target:document.body
						    });	
						    
							return	
						}
						
						if( Elf.utils.attr( saveAdd , 'data-type') === 'disease-type' ){
							
							obj.grandson = {
								"field1":inputName.value,
								"field2":inputNum.value								
							};							
							
							for (var i = 0; i < typeList.length; i++) {
								
								if( typeList[i].children.fOrder == 0 ){
									
									typeList[i].grandsonList.push(obj);
												
									Elf.components.grid.methods.update( _this.dtGrid , typeList[i].grandsonList );									
									break;
								}

							}

							
						}else if( Elf.utils.attr( saveAdd , 'data-type') === 'skill-type' ){
							
							obj.grandson = {
								
								"field1":inputName.value,
								"field2":inputNum.value								
							};							

							for (var i = 0; i < typeList.length; i++) {
								
								if( typeList[i].children.fOrder == 1 ){
									
									typeList[i].grandsonList.push(obj);	
									Elf.components.grid.methods.update( _this.stGrid , typeList[i].grandsonList );								
									break;
								}

							}
							
						}else if( Elf.utils.attr( saveAdd , 'data-type') === 'medical-equipment' ){
							
							obj.grandson = {
								
								"field1":inputName.value,
								"field2":inputNum.value
							};

							for (var i = 0; i < typeList.length; i++) {
								
								if( typeList[i].children.fOrder == 2 ){
									console.log( typeList[i].grandsonList );
									typeList[i].grandsonList.push(obj);	
									Elf.components.grid.methods.update( _this.meGrid , typeList[i].grandsonList );								
									break;
								}

							}						

						}	
						
						Elf.utils.remove( dialog );											

					});					
	
				}

				
			});
			
		}
		
	})();
	
/***** 专业科室 > 专业科室基本情况表5 ******/	
	;(function(){
		
		var departmentCode5,
			childrenId5,
			pageSize;
			pageSize = 30;
			departmentCode5 = "";
			childrenId5 = "";
			
		var gridHeadHtml = `<tr>
			<th class="tac vam"  rowspan="3">姓名</th>
			<th class="tac vam" rowspan="3">性别</th>
			<th class="tac vam"  rowspan="3">年龄</th>
			<th class="tac vam"  rowspan="3">学历</th>
			<th class="tac vam"  rowspan="3">所在科室</th>
			<th class="tac vam" rowspan="1" colspan="3">工作经验</th>
			<th class="tac vam" rowspan="1" colspan="5">带教经验</th>
			<th class="tac vam" rowspan="3" >操作</th>
		</tr>
		
		<tr>
		
			<th class="tac vam" rowspan="2" >专业技术职务</th>
			<th class="tac vam" rowspan="2" >现任职务年限</th>
			<th class="tac vam" rowspan="2" >从事本专业临床工作年限</th>	
			<th class="tac vam" rowspan="1" colspan="2" >带实习生</th>	
			<th class="tac vam" rowspan="1" colspan="2" >代住院医师</th>
			<th class="tac vam" rowspan="1" >参加省级以上住院医师规范化培训</th>		
		</tr>
		
		<tr>
			<th class="tac vam" rowspan="1" >年限</th>
			<th class="tac vam" rowspan="1" >累计人数</th>
			<th class="tac vam" rowspan="1" >年限</th>
			<th class="tac vam" rowspan="1" >累计人数</th>
			<th class="tac vam" rowspan="1" >（有/无）</th>

		</tr>`;
		
	    var studentHomPageCols = [
	        {
	            title:"姓名",
	            name:"fGrade",
	            width:80,
	            align:"center",
	            fixedColumn:false,
	            checkCol:false,
	            valign:"middle"
	            ,renderer:function(name,rowIndex,rowData){
					
					return rowData.grandson.field1 || ""
	       		}
	        },
	        {
	            title:"性别"
	            ,name:"fReportState"
	            ,width:80
	            ,align:"center"
	            //,fixedColumn:true
	            ,valign:"middle"
	            ,renderer:function(name,rowIndex,rowData){
					
					return rowData.grandson.field2 || ""
	       		}
	        },
	        {
	            title:"学历"
	            ,name:"fBeginTime"
	            ,width:100
	            ,align:"center"
	            //,fixedColumn:true
	            ,valign:"middle"
	            ,renderer:function(name,rowIndex,rowData){
					
					return rowData.grandson.field3 || ""
	       		}	            
	        },	        
	        {
	            title:"学历"
	            ,name:"fBeginTime"
	            ,width:100
	            ,align:"center"
	            //,fixedColumn:true
	            ,valign:"middle"
	            ,renderer:function(name,rowIndex,rowData){
					
					return rowData.grandson.field4 || ""
	       		}	            
	        },
	        {
	            title:"所在科室"
	            ,name:"fEndTime"
	            ,width:120
	            ,align:"center"
	            //,fixedColumn:true
	            ,valign:"middle"
	            ,renderer:function(name,rowIndex,rowData){
					
					return rowData.grandson.field5 || ""
	       		}	            
	        },

	        {
	            title: "专业技术职务"
	            , name: "totalNum"
	            , width: 120
	            , align: "center"
	            //,fixedColumn:true
	            , valign: "middle",
	            renderer:function(name,rowIndex,rowData){
	            	
	               return rowData.grandson.field6 || ""
	
	            }
	        },
	        {
	            title: "现任职务年限"
	            , name: "uncheckedNum"
	            , width: 80
	            , align: "center"
	            //,fixedColumn:true
	            , valign: "middle",
	            renderer:function(name,rowIndex,rowData){
	            	
	               return rowData.grandson.field7 || ""
	
	            }
	        },
	        {
	            title: "从事本专业临床工作年限"
	            , name: "checkOKNum"
	            , width: 80
	            , align: "center"
	            //,fixedColumn:true
	            , valign: "middle",
	            renderer:function(name,rowIndex,rowData){
	            	
	               return rowData.grandson.field8 || ""
	
	            }
	        },
	        {
	            title: "年限"
	            , name: "checkNotOKNum"
	            , width: 80
	            , align: "center"
	            //,fixedColumn:true
	            , valign: "middle",
	            renderer:function(name,rowIndex,rowData){
	            	
	               return rowData.grandson.field9 || ""
	
	            }
	        },
	        {
	            title: "累计人数"
	            , name: "totalNum"
	            , width: 80
	            , align: "center"
	            //,fixedColumn:true
	            , valign: "middle",
	            renderer:function(name,rowIndex,rowData){
	            	
	               return rowData.grandson.field10 || ""
	
	            }
	        },
	        {
	            title: "年限"
	            , name: "uncheckedNum"
	            , width: 80
	            , align: "center"
	            //,fixedColumn:true
	            , valign: "middle",
	            renderer:function(name,rowIndex,rowData){
	            	
	               return rowData.grandson.field11 || ""
	
	            }
	        },
	        {
	            title: "累计人数"
	            , name: "checkOKNum"
	            , width: 80
	            , align: "center"
	            //,fixedColumn:true
	            , valign: "middle",
	            renderer:function(name,rowIndex,rowData){
	            	
	               return rowData.grandson.field12 || ""
	
	            }
	        },
	        {
	            title: "（有/无）"
	            , name: "checkNotOKNum"
	            , width: 80
	            , align: "center"
	            //,fixedColumn:true
	            , valign: "middle",
	            renderer:function(name,rowIndex,rowData){
	            	
	               return rowData.grandson.field13 || ""
	
	            }
	        },
	        {
	            title: "操作"
	            , name: "checkOKNum"
	            , width: 120
	            , align: "center"
	            //,fixedColumn:true
	            , valign: "middle",
	            renderer:function(name,rowIndex,rowData){
	            	
	    			return '<input type="button" data-tooltip="删除第'+(rowIndex+1)+'行"'+' class="btn line-h30 prl6 delete elf-tooltip-left" value="删除" /><input type="button" class="edit prl6 btn line-h30" value="编辑" />'
	
	            }
	        }
        //}
    	];			
			
			
		//初始化查询数据
		function getBaseData( _this ) {
		    var args = {};
		    args.fType = "20";
		    args.fTableNumber = "departmentTeacher";
		    var service = {
		        serviceModule: serviceInfo.serviceModule,
		        serviceNumber: '100090080',
		        token: use_info.token,
		        args: {
		        	"parent":args,
			        "fDepartmentCode": _this.fDepartmentCode,
			        "fChildrenId" : _this.fChildrenId		        			        	
		        }
		    };
		    
		    commonLogic.serviceCaller(service, function (data) {
		        
		        if(data.flag == "true"){
		        	
		        	console.log(  data );
					
					_this.init( data );
					
	
		        }else{
		            Elf.components.toast({text:data.error});
		        }
		    });
		}
		
		//发送数据更新页面
		function subEditBaseData( args , _this , str ) {
			
			args.fDepartmentCode =  _this.fDepartmentCode;
			args.fChildrenId = _this.fChildrenId;

		    var service = {
		        serviceModule: serviceInfo.serviceModule,
		        serviceNumber: '100090090',
		        token: use_info.token,
		        args: args
		    };

		    commonLogic.serviceCaller(service, function (data) {
		        //console.log(JSON.stringify(data));

		        if(data.flag == "true"){
	
				    //渲染数据
//					getBaseData( _this );
					Elf.components.toast({text:str});
					new zyjdModuleByGao.basiSituation5;

		        }else{
		            Elf.components.toast({text:data.error});
		        }
		    });
		}
		
		//发送数据更新表格
		function postData( args , _this , str ) {
			
			args.fDepartmentCode =  _this.fDepartmentCode;
			args.fChildrenId = _this.fChildrenId;

		    var service = {
		        serviceModule: serviceInfo.serviceModule,
		        serviceNumber: '100090090',
		        token: use_info.token,
		        args: args
		    };

		    commonLogic.serviceCaller(service, function (data) {
		        //console.log(JSON.stringify(data));

		        if(data.flag == "true"){
	
					Elf.components.toast({text:str});
					
					updataGrid( _this );
//					getBaseData( _this );

		        }else{
		            Elf.components.toast({text:data.error});
		        }
		    });
		}		
		
		//请求数据更新表格
		function updataGrid( _this ) {
		    var args = {};
		    args.fType = "20";
		    args.fTableNumber = "departmentTeacher";
		    var service = {
		        serviceModule: serviceInfo.serviceModule,
		        serviceNumber: '100090080',
		        token: use_info.token,
		        args: {
		        	"parent":args,
			        "fDepartmentCode": _this.fDepartmentCode,
			        "fChildrenId" : _this.fChildrenId		        			        	
		        }
		    };
		    
		    commonLogic.serviceCaller(service, function (data) {

		        if(data.flag == "true"){
		        	
		        	var arrData = dataObj.result.childrenList[0].grandsonList;
					
					Elf.components.grid.methods.update( _this.gridV , arrData );					
	
		        }else{
		            Elf.components.toast({text:data.error});
		        }
		    });
		}		
		
		
		function BasiSituation5( fDepartmentCode , fChildrenId ){
			
			this.content = document.querySelector(".elf_fiexd_center");
			this.form = $creatE('form','full');
			this.warp = $creatE('div' ,'grid5 full p10');

			if( !fDepartmentCode && fDepartmentCode != 0 ){
				
				fDepartmentCode = departmentCode5;
				
			}else{
				
				departmentCode5 = fDepartmentCode;
			}
			
			if( !fChildrenId && fChildrenId != 0 ){
				
				fChildrenId = childrenId5;
				
			}else{
				
				childrenId5 = fChildrenId;
				
			}
			
			console.log( fDepartmentCode );
			
			this.fDepartmentCode = fDepartmentCode;
			this.fChildrenId = fChildrenId;
			
			getBaseData(this);

		}
		
		//专业科室基本情况表5接口
		zyjdModuleByGao.basiSituation5 = BasiSituation5;
		
		BasiSituation5.prototype.init = function( data ){
			
			var dataList = data.result.childrenList;
			data.result.parent.fTableNumber = data.result.parent.fTableNumber || "departmentTeacher";				
			
			if( !dataList.length ){
				
				var obj = {
						"children":{
							
							"fOrder":0
						},
						
						"grandsonList":[]
					}
				
				data.result.childrenList.push(obj);

			}

			this.creatGrid5(data);
		}
		
		//生成page
		BasiSituation5.prototype.creatGrid5 = function(dataObj){
			var _this = this;
			var getData = dataObj;
			Elf.components.ajax({
				
				url:"zyjd-professional-grid5.html",
				dataType:"html",
//				data:{id:1,ccc:"ccc"},				
				success:function(data){
					
					_this.warp.innerHTML = data;
					_this.content.innerHTML = '';						
					Elf.controls.appendTo( _this.warp, _this.form);				
					Elf.controls.appendTo( _this.form, _this.content);					

					_this.gridV( getData );
					_this.btnFn( getData );
					_this.hideBtns( getData.result.fEditable );
				
				},
				error:function(xhr){
					
					console.info(xhr);
				}
			});			
			
		}

		
		//组件表格
		BasiSituation5.prototype.gridV = function( dataObj ){
			
			var dataArr = dataObj.result.childrenList[0].grandsonList;
			var _this = this;
			var gridBodyWarp = this.warp.querySelector('.grid-body');
			
			var grid = Elf.components.grid({
				
				    headHTML:gridHeadHtml,
				    cols:studentHomPageCols,
				    data:dataArr.slice(0 , pageSize),
				    onCellSelected:function(evt,item, rowIndex, colIndex){
				        var tt=evt.target;
				        if(Elf.utils.hasClass(tt,"delete")){

			                item.grandson.fIsDel = 1;
			                
			                var filterArr = Elf.utils.grep( dataArr , function( item , index ){
			                	
			                	return item.grandson.fIsDel == 0;
			                })		
			                
			                Elf.components.grid.methods.update( grid , filterArr );

				        }
				        if(Elf.utils.hasClass(tt,"edit")){
				        	
				        	_this.dialog( item , "edit" );
				        }
				    },
				    target:_this.warp
			});
			
			this.gridV = grid;
			
			Elf.controls.appendTo( grid , gridBodyWarp );
						
			
		}
		
		//弹框
		BasiSituation5.prototype.dialog = function( item , str , data ){
			
			var arr = ['姓名:','性别:','年龄:','学历:','所在科室:','专业技术职务:','现任职务年限:','从事本专业临床工作年限:','带实习生年限:','带实习生累计人数:','带住院医师年限:','带住院医师累计人数年限:','省级以上住院医师培训（有/无）:'];
			
			var _this = this;
			var dialogHtml = $creatE('div' ,'dialogWarp p10 clear-fix');
			var divWarp = $creatE('div' ,'pb20 clear-fix');
			var btnWarp = $creatE('div' ,'pb20 h60 textc'); 
			var saveBtn = $creatE('input' ,'line-h30 btn button prl24'); 
			saveBtn.type = "button";
			saveBtn.value = "确定";
			$pTo( saveBtn , btnWarp );
			
			$pTo( divWarp , dialogHtml );
			$pTo( btnWarp , dialogHtml );
			
			var leftDiv = $creatE('div' ,'textr pr0 col-xs-6');
			var rightDiv = $creatE('div' ,'textl pr0 col-xs-6');			
			$pTo( leftDiv , divWarp );
			$pTo( rightDiv , divWarp );
			
			var dataArr = data.result.childrenList[0].grandsonList;
			
			if( str === 'edit' ){
				
				for (var i = 0; i < 13; i++) {					
					var div1 = $creatE('div' , 'h40 line-h40 textr');
					var div2 = $creatE('div' , 'h40 line-h40 textl');
					div1.innerHTML = arr[i];
					var inps = $creatE('input' , 'text h30 p6' );
					
					Elf.utils.attr( inps , 'name' ,'field'+i );
					inps.value = item[ inps.name ];
					$pTo( inps , div2 );
					$pTo( div1 , leftDiv );
					$pTo( div2 , rightDiv );					
				}	
				
			}

			if( str === 'add' ){

				for (var i = 0; i < 13; i++) {
						var div1 = $creatE('div' , 'h40 line-h40 textr');
						var div2 = $creatE('div' , 'h40 line-h40 textl');
						div1.innerHTML = arr[i];
						var inps = $creatE('input' , 'text h30 p6' ,{name:'field'+(i+1) });
						
						Elf.utils.attr( inps , 'name' ,'field'+i );
						$pTo( inps , div2 );
						$pTo( div1 , leftDiv );
						$pTo( div2 , rightDiv );					

				}				
			}	
			
            dialog = Elf.components.dialog({
		        title:'修改',  
		        content:dialogHtml, 
		        dialogClass:'',  
		        width:600,  
		        height:400,
		        modal:true,    
	            target:_this.warp,    
		        onCloseDestroy:true,    
		        onClose:function(){
		            
		            console.log("关闭弹框");
		        }
		    });
		    
		    
		    dialog.addEventListener('click', function(ev){
				var e = Elf.getEvent(ev);
				var tt = Elf.getEventSource(ev);
				var obj = {};
				
				var texts = this.querySelectorAll('input.text');
				
				console.log( texts );
					
				if( Elf.utils.hasClass( tt , 'button' ) ){
					
					
					for (var i = 0; i < texts.length; i++) {
						
						if( Elf.utils.trim( texts[i] ) === '' ){							
							
							texts[i].focus();
							Elf.components.toast({text:'请填写完整'});
							
							return;							
							
						}
						
					}
					
				}
				
				if( Elf.utils.hasClass( tt , 'button' ) && str === 'edit' ){
					
					for (var i = 0; i < texts.length; i++) {
						
						item[ texts[i].name ] = texts[i].value;
					}
					
					data.result.parent.fIsComplete = 0;
					postData( data.result , _this , '修改信息' );
					console.log( dataArr , item );
					
				}
				if( Elf.utils.hasClass( tt , 'button' ) && str === 'add' ){
					
					console.log( dataArr );
					for (var i = 0; i < texts.length; i++) {
						
						obj[ texts[i].name ] = texts[i].value;
					}					
					data.result.parent.fIsComplete = 0;
					dataArr.push( obj );
					postData( data.result , _this , '添加信息' );
					console.log( dataArr );
				}				
				
		    })
			
		}		
		
		//按钮绑定事件
		BasiSituation5.prototype.btnFn = function( dataObj ){
			var _this = this;
			var data = dataObj;
			var dataArr1 = dataObj.result.childrenList[0].grandsonList;

			this.warp.addEventListener('click', function(ev){
		
				var has,
					e,
					tt,
					infos,
					infoRows,
					oneInfo,
					infoArr;
					
				has = Elf.utils.hasClass;		
				e = Elf.getEvent(ev);
				tt = Elf.getEventSource(ev);
				//整个数据
				
				infoRows = this.getElementsByClassName('row');
				
				if( has( tt , 'save-data' ) ){

					
					data.result.parent.fIsComplete = 0;

					postData( data.result , _this , '保存信息' );
					return
				}
				
				if( has( tt , 'submit-data' ) ){

					data.result.parent.fIsComplete = 1;
					postData( data.result , _this , '完成' );
					
					return
				}
				
				if( has( tt , 'addrow' ) ){

					_this.addRow(data);

				}
				
			})
		}		
		
		//添加一条数据
		BasiSituation5.prototype.addRow = function( data ){
			
			var dataArr = data.result.childrenList[0].grandsonList;

			this.dialog( null , 'add' , data );

			return;
			
		}
		
		//隐藏按钮
		BasiSituation5.prototype.hideBtns = function( fEditable ){
			var hash,
				btns,
				inputs;
				
			hash = window.location.hash.substring(1);	
			btns = this.warp.querySelectorAll('input.btn');
			inputs = this.warp.querySelectorAll('input');	
			
			if( hash.indexOf('newPage') !== -1 || fEditable == 0 ){
								
				for (var i = 0; i < inputs.length; i++) {
					inputs[i].disabled = 'disabled';
				}			
				for (var i = 0; i < btns.length; i++) {
					
					Elf.effects.hidden(btns[i]);
				}			
			}
		}
	})();	
 	
/***** 专业科室 > 专业科室基本情况表6 ******/	
	;(function(){
	
		//查询数据
		function getBaseData( _this ) {
		    var args = {};
		    args.fType = "20";
		    args.fTableNumber = "departmentDirector";
		    var service = {
		        serviceModule: serviceInfo.serviceModule,
		        serviceNumber: '100090080',
		        token: use_info.token,
		        args: {
		        	"parent":args,
			        "fDepartmentCode": _this.fDepartmentCode,
			        "fChildrenId" : _this.fChildrenId		        	
		        }
		    };

		    commonLogic.serviceCaller(service, function (data) {
		        
		        //console.log(JSON.stringify(data));
		        if(data.flag == "true"){
		        	
		        	console.log( data );

					_this.init( data );

					
		        }else{
		        	
		            Elf.components.toast({text:data.error});
		        }
		    });
		}
		
		//发送数据
		function subEditBaseData( args , _this ) {
			
			args.fDepartmentCode =  _this.fDepartmentCode;
			args.fChildrenId = _this.fChildrenId;			
			console.log( args );
		    var service = {
		        serviceModule: serviceInfo.serviceModule,
		        serviceNumber: '100090090',
		        token: use_info.token,
		        args: args
		    };
		    commonLogic.serviceCaller(service, function (data) {
		        //console.log(JSON.stringify(data));

		        if(data.flag == "true"){
		            //alert(data.result);
				    Elf.components.toast({
				    	
				        holdtime:500,
				        text:'修改成功',
				        target:document.body
				        
				    });	

		        }else{
		            Elf.components.toast({text:data.error});
		        }
		    });
		}		
		
		
		function BasiSituation6( fDepartmentCode , fChildrenId ){
			this.content = document.querySelector(".elf_fiexd_center");
			this.warp = $creatE('div' ,'grid6 full');
			this.form = $creatE( 'form' , 'full p10');
						
			if( !fDepartmentCode && fDepartmentCode != 0 ){
				
				fDepartmentCode = "";
				
			}
			
			if( !fChildrenId && fChildrenId != 0 ){
				
				fChildrenId = "";
				
			}
			
			this.fDepartmentCode = fDepartmentCode;
			this.fChildrenId = fChildrenId;

			getBaseData( this );
		}
		
		//专业科室基本情况表6接口
		zyjdModuleByGao.basiSituation6 = BasiSituation6;
		
		BasiSituation6.prototype.init = function( data ){
			
			data.result.parent.fTableNumber = data.result.parent.fTableNumber || "departmentDirector";	
			
			if( !data.result.childrenList.length ){

				data.result.childrenList = [					
					{
						"children":{							
							"fOrder" : 0
						},						
						"grandsonList":[]
					}				
				];
			}

			this.creatGrid6( data );
		}
		
		//生成表格
		BasiSituation6.prototype.creatGrid6 = function( dataObj ){
			var _this = this;
			var getData = dataObj;
			Elf.components.ajax({
				
				url:"zyjd-professional-grid6.html",
				dataType:"html",
				data:{id:1,ccc:"ccc"},
				
				success:function(data){
					
					_this.warp.innerHTML = data;
					_this.content.innerHTML = '';
					Elf.controls.appendTo( _this.warp, _this.form);					
					Elf.controls.appendTo( _this.form, _this.content);
					
					_this.randerData(getData);
					_this.btnFn( getData );					
					_this.textAreaLimit();
					_this.hideBtns( getData.result.fEditable );
				},
				error:function(xhr){
					
					console.info(xhr);
				}
			});			
			
		}
		
		//渲染数据
		BasiSituation6.prototype.randerData = function( dataObj ){
			
			var data = dataObj.result.childrenList;
			var textData = {},
				areaData = {};

			for (var i = 0; i < data.length; i++) {
				
				if( data[i].children.fOrder == 0 ){

					textData = data[i].children;
					areaData = data[i].grandsonList[0] ? data[i].grandsonList[0] : {};
					break;
				}
				
			}

			areaData.grandson = areaData.grandson || {}; 
			var texts = this.warp.querySelectorAll('input.text');
			var textsArea = this.warp.querySelectorAll('textarea');
			var radios = this.warp.getElementsByClassName('radio-dsqk');
			

			for (var i = 0; i < texts.length; i++) {
				
				if( textData[texts[i].name] || textData[texts[i].name] == 0  ){
					
					texts[i].value = textData[texts[i].name];
					Elf.utils.addClass(texts[i] , 'has-value');
				}else{
					
					texts[i].value = "";
					Elf.utils.removeClass(texts[i] , 'has-value');
					
				}
				
				texts[i].addEventListener('blur',function(){
					
					if( Elf.utils.trim( this.value ) !== ''  ){
						
						Elf.utils.addClass( this , 'has-value');
						
					}else{
						
						Elf.utils.removeClass( this , 'has-value');
					}
					
				})

			}
			
			for (var i = 0; i < radios.length; i++) {
				
				if( radios[i].value === textData[radios[0].name] ){
					
					radios[i].checked = "checked"; 

				}

			}

			for (var i = 0; i < textsArea.length; i++) {
				
				textsArea[i].value = areaData.grandson[textsArea[i].name] ? areaData.grandson[textsArea[i].name] : "";
//				console.log(  )
				if( Elf.utils.trim( textsArea[i].value) !== ''  ){
					
					Elf.utils.addClass( textsArea[i] , 'has-value');
					
				}else{
					
					Elf.utils.removeClass( textsArea[i] , 'has-value');	
				}
				
				textsArea[i].addEventListener('blur' , function(){
					
					if( Elf.utils.trim( this.value) !== ''  ){
						
						Elf.utils.addClass( this , 'has-value');
						
					}else{
						
						Elf.utils.removeClass( this , 'has-value');	
					}					
					
				});
				
				
			}
			
		}

		//按钮绑定事件
		BasiSituation6.prototype.btnFn = function( dataObj ){
			var _this = this;			
			var getData = dataObj;
			this.warp.addEventListener('click', function(ev){
		
				var has,
					e,
					tt,
					dataObj,
					isCheckAudio,
					radioWarp,
					allTexts,
					radios;

				dataObj = null;
				isCheckAudio = false;
				has = Elf.utils.hasClass;		
				e = Elf.getEvent(ev);
				tt = Elf.getEventSource(ev);
					
				allTexts = this.querySelectorAll('.text');
				radios = this.querySelectorAll('.radio-dsqk');				
				radioWarp = this.querySelector('.radio-warp');
				Elf.utils.removeClass( radioWarp , 'focus' );
				
				if( has( tt , 'save-data' ) ){

					_this.getTableInfo( getData );
					console.log( getData.result );
					getData.result.parent.fIsComplete = 0;
					subEditBaseData( getData.result , _this );
					return
				}
				if( has( tt , 'submit-data' ) ){
					
					for (var i = 0; i < allTexts.length; i++) {
						
						if( Elf.utils.trim( allTexts[i].value) === '' ){
							
							allTexts[i].focus();
							
						    Elf.components.toast({	
						        holdtime:1000,
						        text:'请填写完整再提交',
						        target:document.body
						    });							
						
							return
						}
						
					}
					
					for (var i = 0; i < radios.length; i++) {
						
						if( radios[i].checked ){
							
							isCheckAudio = true;

						}

					}
					//单选框是否选中
					if( !isCheckAudio ){
						
						Elf.utils.addClass( radioWarp , 'focus' );
						radios[0].focus();
						
					    Elf.components.toast({	
					        holdtime:1000,
					        text:'请选择导师情况',
					        target:document.body
					    });							
					
						return						
						
					}
					
					_this.getTableInfo( getData );
					getData.result.parent.fIsComplete = 1;
					
					subEditBaseData( getData.result , _this );	

					return
				}
				
			});

		}		
		
		//textarea字数限制
		BasiSituation6.prototype.textAreaLimit = function(){
			
			var aTextArea = this.warp.getElementsByClassName('textarea');
			
			var isInputing = false;

			for (var i = 0; i < aTextArea.length; i++) {
				
				aTextArea[i].nextElementSibling.innerHTML = 2500 - aTextArea[i].value.length;

				aTextArea[i].addEventListener('compositionstart', function(){

				    isInputing = true;
				})
				
				aTextArea[i].addEventListener('compositionend', function(){
					
					var _this = this;
					
					this.nextElementSibling.innerHTML = Math.max(0 , (2500 - Elf.utils.trim( this.value ).length));
					
					if( (2500 - Elf.utils.trim( this.value ).length) <= 10 ){
						
						Elf.utils.addClass(_this.nextElementSibling , 'red');
						
					}else{
						
						Elf.utils.removeClass(_this.nextElementSibling , 'red');
						
					}
					isInputing = false;
				    
				    

				})
				
				aTextArea[i].addEventListener('input' , function(){
					
					var _this = this;
					
					if( !isInputing ){
						
						this.nextElementSibling.innerHTML = Math.max(0 , (2500 - Elf.utils.trim( this.value ).length));			
						if( (2500 - Elf.utils.trim( this.value ).length) <= 10 ){
							
							Elf.utils.addClass(_this.nextElementSibling , 'red');
							
						}else{
							
							Elf.utils.removeClass(_this.nextElementSibling , 'red');
							
						}
					
					
					}
					
					if( Elf.utils.trim( this.value ).length > 2500 ){

					    Elf.components.toast({

					        holdtime:1000,
					        text:'内容过多，请输入少于2500字',
					        target:box
					    });
						this.value = this.value.substring( 0 , 2500 );
						
					}
				});
			}
						
		}
		
		//隐藏按钮
		BasiSituation6.prototype.hideBtns = function( fEditable ){
			var hash,
				btns,
				inputs,
				textareas;
				
			hash = window.location.hash.substring(1);
		
			btns = this.warp.getElementsByClassName('btn');
			inputs = this.warp.querySelectorAll('input');
			textareas = this.warp.querySelectorAll('textarea');

			if( hash.indexOf('newPage') !== -1 || fEditable == 0 ){
				
				for (var i = 0; i < btns.length; i++) {
					
					Elf.effects.hidden(btns[i]);
				}	
				
				for (var i = 0; i < inputs.length; i++) {
					
					inputs[i].disabled = 'disabled';
				}
				
				for (var i = 0; i < textareas.length; i++) {
					
					textareas[i].disabled = 'disabled';
				}
			}
		
		}	
		
		//获取表单数据
		BasiSituation6.prototype.getTableInfo = function(dataObj){
			var texts,
				infoObj,
				radios,
				data,
				returnData;
			texts = this.warp.querySelectorAll('input.text');
			textsArea = this.warp.querySelectorAll('textarea');
			radios = this.warp.getElementsByClassName('radio-dsqk');
			infoObj = {};
			data = dataObj.result.childrenList;

			for (var i = 0; i < data.length; i++) {
				
				if( data[i].children.fOrder == 0 ){

					returnData = data[i];

					break
				}
				
			}
	
			for (var i = 0; i < texts.length; i++) {
				
				returnData.children[texts[i].name] = texts[i].value;

			}
			
			for (var i = 0; i < radios.length; i++) {
				
				if( radios[i].checked ){
					
					returnData.children[radios[i].name] = radios[i].value;
				}
			}
			
			returnData.grandsonList[0] = returnData.grandsonList[0] || {"grandson":{}};
			for (var i = 0; i < textsArea.length; i++) {
				
				returnData.grandsonList[0].grandson[textsArea[i].name] = textsArea[i].value;
			}			

			return dataObj.result;
			
		}
	})();
	
})()
