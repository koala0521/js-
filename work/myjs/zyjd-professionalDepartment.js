//****中医基地-专业科室用户模块
//****startTime：2017-3-31 
//****author:gaopengfei
;(function(){
	
	
	var $creatE ,$pTo;
	
	$creatE = Elf.controls.createElement;
	$pTo = Elf.controls.appendTo;

//------***** 专业科室 > 专业科室基本情况表4 ******--------	
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
				
					return '<div>'+ rowData.jbtype +'</div>';
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
				
					return '<div>'+ rowData.nzzNum +'</div>';
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
				
					return '<div>'+ rowData.lcjnName +'</div>';
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
				
					return '<div>'+ rowData.lcjnNum +'</div>';
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
				
					return '<div>'+ rowData.sbyqName +'</div>';
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
				
					return '<div>'+ rowData.sbyqNum +'</div>';
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
		
		function BasiSituation4(){
			
			this.content = document.getElementById("bg");
			this.warp = $creatE('div' ,'grid4 full');
			this.form = $creatE('form','full');
			this.init();
		}
		
		//专业科室基本情况表4接口
		zyjdModuleByGao.basiSituation4 = BasiSituation4;
		
		BasiSituation4.prototype.init = function(){
			
			this.creatGrid4();
		}
		
		//生成表格
		BasiSituation4.prototype.creatGrid4 = function(){
			var _this = this;
			
			Elf.components.ajax({
				
				url:"ZYJD-professional-grid4.html",
				dataType:"html",
//				data:{id:1,ccc:"ccc"},				
				success:function(data){
					
					_this.warp.innerHTML = data;
					_this.content.innerHTML = '';
					Elf.controls.appendTo( _this.warp, _this.form);
					Elf.controls.appendTo( _this.form, _this.content);
					//请求数据										
					_this.randerInfo( zhuanyekeshiData.grid4Data.gridInfo );
					_this.btnFn( zhuanyekeshiData.grid4Data.gridInfo );
					_this.addInfo( zhuanyekeshiData.grid4Data.gridInfo );
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
				
				infoObj = {};
				
				//保存数据
				if( has( tt , 'save-data' ) ){
					
					infoObj = _this.getFormData();

					//发送后台数据
//					ajaxPost();
					
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
					        text:'请填写完整信息！',
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
						        text:'请填写完整信息！',
						        opacity:0.8,
						        target:document.body
						    });	
						    
						    return
						}
					
					}
					
					//提交数据					
					infoObj = _this.getFormData();	
									
					//发送数据给后端
										
					return
				}

				
			})
		}
		
		//隐藏按钮
		BasiSituation4.prototype.hideBtns = function(){
			var hash,
				btns;
				
			hash = window.location.hash.substring(1);
		
			btns = this.warp.getElementsByClassName('btn');

			if( hash.indexOf('newPage') !== -1 ){
				
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
				dialogHtml;
			_this = this;	
			data = data;			
			objTexts = this.warp.getElementsByClassName('objText');							
			radios = this.warp.getElementsByClassName('is-importent');
			diseaseTypeWarp = this.warp.querySelector('.disease-type-warp');
			skillTypeWarp = this.warp.querySelector('.skill-type-warp');
			medicalEquipment = this.warp.querySelector('.medical-equipment-warp');
			

//			console.log( data );
			//单选按钮
			for (var i = 0; i < radios.length; i++) {
				
				if( radios[i].value == data.isImportent ){
					
					radios[i].checked = "checked";
				}
			}
			//其他基础数据
			for (var i = 0; i < objTexts.length; i++) {
				
				objTexts[i].value = data[objTexts[i].name]?data[objTexts[i].name]:'';
			}
			
			//疾病种类				
		    var dtGrid = Elf.components.grid({
		        fixedTableSize:30,  
		        data:data.diseaseType.slice(0 , Infinity),    //第一页要显示的数据
		        cols:jbzlGridHead,   //加载学生信息表格结构
		        width: 40,
		        target:diseaseTypeWarp, //规定表格信息 的父级容器
		        onCellSelected:function(evt,item,rowIndex,colIndex){
		            var tt=evt.target;          // 事件源
		            if(Elf.utils.hasClass(tt,"delete")){    //判断事件源是否是 删除 按钮
		                console.info("删除行",item , rowIndex);
		                
		                data.diseaseType.splice( rowIndex , 1 );
		                Elf.components.grid.methods.update( dtGrid , data.diseaseType );
		            }
		            if(Elf.utils.hasClass(tt,"edit")){  //判断事件源是否是 编辑 按钮
		                console.info("编辑行");
		                
		                dialogHtml = '<div class="h40 line-h40 mt50" ><div class="col-xs-6 textr" ><span class="name" >疾病种类：</span></div><div class="col-xs-6 " ><input type="text" class="text p5 line-h20 textc" value= "'+ item.jbtype +'"  name="jbtype" /></div></div><div class="h40 line-h40 mt20" ><div class="col-xs-6 textr" ><span class="num" >年诊治例数：</span></div><div class="col-xs-6 " ><input type="text" class="text p5 line-h20 textc" value= "'+ item.nzzNum +'"  name="nzzNum" /></div></div><div class="h40 line-h40 mt20" ></div><div class="h40 line-h40 mt20 textc" ><input type="button" class="btn prl24 line-h30" value="确定" /></div>';
		                
		                dialog = Elf.components.dialog({
					        title:'修改',   //弹框标题
					        content:dialogHtml, //可以传一个dom元素进去，会append进 弹框内部
					        dialogClass:'',  //整个弹框最外层父级添加class
					        width:600,  //弹框可视区的高度和宽度定制
					        height:360,
					        modal:true,    //是否显示遮罩层
				            target:_this.warp,    // 弹框父级元素，如果不写默认为body
					        onCloseDestroy:true,   //关闭弹框时，是否删除弹框组件DOM元素   
					        onClose:function(){//关闭弹框时触发的函数
					            
					            console.log("关闭弹框");
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
								
									item[allInput[i].name] = allInput[i].value;
								}

		               			Elf.components.grid.methods.update( dtGrid , data.diseaseType );								Elf.utils.remove(this);
		               			
							}
							
						})
		            
		            }
		            
		        }
		     });
			
			//临床技能
		    var stGrid = Elf.components.grid({
		        fixedTableSize:30,  
		        data:data.skillType.slice(0 , Infinity),    
		        cols:stGridHead,   
		        width: 40,
		        target:skillTypeWarp, 
		        onCellSelected:function(evt,item,rowIndex,colIndex){
		            var tt=evt.target;          // 事件源
		            if(Elf.utils.hasClass(tt,"delete")){    //判断事件源是否是 删除 按钮
		                console.info("删除行");
		                data.skillType.splice( rowIndex , 1 );
		                Elf.components.grid.methods.update( stGrid , data.skillType );
		            }
		            if(Elf.utils.hasClass(tt,"edit")){  //判断事件源是否是 编辑 按钮
		                console.info("编辑行");
		                
		                dialogHtml = '<div class="h40 line-h40 mt50" ><div class="col-xs-6 textr" ><span class="name" >临床技能操作/手术种类：</span></div><div class="col-xs-6 " ><input type="text" class="text p5 line-h20 textc" value= "'+ item.lcjnName +'"  name="lcjnName" /></div></div><div class="h40 line-h40 mt20" ><div class="col-xs-6 textr" ><span class="num" >年完成例数：</span></div><div class="col-xs-6 " ><input type="text" class="text p5 line-h20 textc" value= "'+ item.lcjnNum +'"  name="lcjnNum" /></div></div><div class="h40 line-h40 mt20" ></div><div class="h40 line-h40 mt20 textc" ><input type="button" class="btn prl24 line-h30" value="确定" /></div>';
		                
		                dialog = Elf.components.dialog({
					        title:'修改',   //弹框标题
					        content:dialogHtml, //可以传一个dom元素进去，会append进 弹框内部
					        dialogClass:'',  //整个弹框最外层父级添加class
					        width:600,  //弹框可视区的高度和宽度定制
					        height:360,
					        modal:true,    //是否显示遮罩层
				            target:_this.warp,    // 弹框父级元素，如果不写默认为body
					        onCloseDestroy:true,   //关闭弹框时，是否删除弹框组件DOM元素   
					        onClose:function(){//关闭弹框时触发的函数
					            
					            console.log("关闭弹框");
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
								
									item[allInput[i].name] = allInput[i].value;
								}

		               			Elf.components.grid.methods.update( stGrid , data.skillType );								Elf.utils.remove(this);
		               			
							}
							
						})
		            		                
		            }
		        }
		     });

			//设备仪器名称
		    var meGrid = Elf.components.grid({
		        fixedTableSize:30,  
		        data:data.medicalEquipment.slice(0 , Infinity),    
		        cols:meGridHead,   
		        width: 40,
		        target:medicalEquipment, 
		        onCellSelected:function(evt,item,rowIndex,colIndex){
		            var tt=evt.target;          // 事件源
		            if(Elf.utils.hasClass(tt,"delete")){    //判断事件源是否是 删除 按钮
		                console.info("删除行");
		                data.medicalEquipment.splice( rowIndex , 1 );
		                Elf.components.grid.methods.update( meGrid , data.medicalEquipment );
		            }
		            if(Elf.utils.hasClass(tt,"edit")){  //判断事件源是否是 编辑 按钮
		                console.info("编辑行");
		                
		                dialogHtml = '<div class="h40 line-h40 mt50" ><div class="col-xs-6 textr" ><span class="name" >临床技能操作/手术种类：</span></div><div class="col-xs-6 " ><input type="text" class="text p5 line-h20 textc" value= "'+ item.sbyqName +'"  name="sbyqName" /></div></div><div class="h40 line-h40 mt20" ><div class="col-xs-6 textr" ><span class="num" >年完成例数：</span></div><div class="col-xs-6 " ><input type="text" class="text p5 line-h20 textc" value= "'+ item.sbyqNum +'"  name="sbyqNum" /></div></div><div class="h40 line-h40 mt20" ></div><div class="h40 line-h40 mt20 textc" ><input type="button" class="btn prl24 line-h30" value="确定" /></div>';
		                
		                dialog = Elf.components.dialog({
					        title:'修改',   //弹框标题
					        content:dialogHtml, //可以传一个dom元素进去，会append进 弹框内部
					        dialogClass:'',  //整个弹框最外层父级添加class
					        width:600,  //弹框可视区的高度和宽度定制
					        height:360,
					        modal:true,    //是否显示遮罩层
				            target:_this.warp,    // 弹框父级元素，如果不写默认为body
					        onCloseDestroy:true,   //关闭弹框时，是否删除弹框组件DOM元素   
					        onClose:function(){//关闭弹框时触发的函数
					            
					            console.log("关闭弹框");
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
								
									item[allInput[i].name] = allInput[i].value;
								}

		               			Elf.components.grid.methods.update( meGrid , data.medicalEquipment);								
		               			Elf.utils.remove(this);
		               			
							}
							
						})
		            			                
		                
		            }
		        }
		    });		
		}
		
		//获取表单数据
		BasiSituation4.prototype.getFormData = function(){
			
			var objTexts,
				infoObj,
				radios,
				isChecked,
				allInput;
				
			objTexts = this.warp.getElementsByClassName('objText');				
			radios = this.warp.getElementsByClassName('is-importent');
			diseaseType = this.warp.querySelectorAll('.disease-type-warp .items');
			skillType = this.warp.querySelectorAll('.skill-type-warp .items');
			medicalEquipment = this.warp.querySelectorAll('.medical-equipment-warp .items');
			allInput = this.warp.querySelectorAll('input.text');
			isChecked = false;			
			infoObj = {};
			infoObj.diseaseType = [];
			infoObj.skillType = [];
			infoObj.medicalEquipment = [];
			
			//基础数据
			for (var i = 0; i < objTexts.length; i++) {
				
				infoObj[objTexts[i].name] = objTexts[i].value;
			
			}
			//单选按钮数据
			for (var i = 0; i < radios.length; i++) {
				
				if( radios[i].checked ){
					
					isChecked = true;
					infoObj[radios[i].name] = radios[i].value;
				}
				
			}
			//疾病种类
			for (var i = 0; i < diseaseType.length; i++) {
				
				var arrInfos = diseaseType[i].querySelectorAll('.arrText');
				var obj = {};
				infoObj.diseaseType.push(obj);
				
				for (var j = 0; j < arrInfos.length; j++) {
					
					obj[arrInfos[j].name] = arrInfos[j].value;
				}				
			}
			
			//临床技能/手术种类
			for (var i = 0; i < skillType.length; i++) {
				
				var arrInfos = skillType[i].querySelectorAll('.arrText');
				var obj = {};
				infoObj.skillType.push(obj);
				
				for (var j = 0; j < arrInfos.length; j++) {
					
					obj[arrInfos[j].name] = arrInfos[j].value;
				}
			}

			//设备仪器名称
			for (var i = 0; i < medicalEquipment.length; i++) {
				
				var arrInfos = medicalEquipment[i].querySelectorAll('.arrText');
				var obj = {};
				infoObj.medicalEquipment.push(obj);
				
				for (var j = 0; j < arrInfos.length; j++) {
					
					obj[arrInfos[j].name] = arrInfos[j].value;
				}
			}
			
			return infoObj;
		
		}
		
		//添加数据
		BasiSituation4.prototype.addInfo = function(data){
			
			var data = data,
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
					inputNum;

				has = Elf.utils.hasClass;		
				e = Elf.getEvent(ev);
				tt = Elf.getEventSource(ev);

				
				dialogHtml = '<div class="h40 line-h40 mt50" ><div class="col-xs-6 textr" ><span class="name" ></span></div><div class="col-xs-6 " ><input type="text" class="text name p5 line-h20 textc" /></div></div><div class="h40 line-h40 mt20" ><div class="col-xs-6 textr" ><span class="num" ></span></div><div class="col-xs-6 " ><input type="text" class="text num p5 line-h20 textc" /></div></div><div class="h40 line-h40 mt20" ></div><div class="h40 line-h40 mt20 textc" ><input type="button" class="btn prl24 line-h30" value="确定" /></div>';
				
				if( has( tt ,'addrow') ){
					
	                dialog = Elf.components.dialog({
				        title:'添加信息',   //弹框标题
				        content:dialogHtml, //可以传一个dom元素进去，会append进 弹框内部
				        dialogClass:'',  //整个弹框最外层父级添加class
				        width:600,  //弹框可视区的高度和宽度定制
				        height:360,
				        modal:true,    //是否显示遮罩层
			            target:_this.warp,    // 弹框父级元素，如果不写默认为body
				        onCloseDestroy:true,   //关闭弹框时，是否删除弹框组件DOM元素   
				        onClose:function(){//关闭弹框时触发的函数
				            
				            console.log("关闭弹框");
				        }
				    });	
					spanName = dialog.querySelector('span.name');
					spanNum = dialog.querySelector('span.num');
					inputName = dialog.querySelector('input.name');
					inputNum = dialog.querySelector('input.num'); 
					console.log(spanName , spanNum , inputName , inputNum);
					
					if( has( tt , 'disease-type' ) ){
						console.log(1);
						spanName.innerHTML = '疾病种类：';
						spanNum.innerHTML = '年诊治例数：';
						inputName.name = 'jbtype';
						inputNum.name = 'nzzNum';
						
					}else if( has( tt , 'skill-type' ) ){
						console.log(2);
						spanName.innerHTML = '临床技能操作/手术种类：';
						spanNum.innerHTML = '年完成例数：';	
						inputName.name = 'lcjnName';
						inputNum.name = 'lcjnNum';					
						
					}else if( has( tt , 'medical-equipment' ) ){
						
						console.log(3);
						spanName.innerHTML = '设备仪器名称（正常使用）：';
						spanNum.innerHTML = '数量（台）：';		
						inputName.name = 'sbyqName';
						inputNum.name = 'sbyqName';							
					}

					
				}
				
			});
			
		}
		
	})();
	
//------***** 专业科室 > 专业科室基本情况表5 ******--------	
	;(function(){
		
		function BasiSituation5(){
			
			this.content = document.getElementById("bg");
			this.form = $creatE('form','full');
			this.warp = $creatE('div' ,'grid5 full');
			
			this.init();
		}
		
		//专业科室基本情况表5接口
		zyjdModuleByGao.basiSituation5 = BasiSituation5;
		
		BasiSituation5.prototype.init = function(){
			
			this.creatGrid5();
		}
		
		//生成表格
		BasiSituation5.prototype.creatGrid5 = function(){
			var _this = this;

			Elf.components.ajax({
				
				url:"zyjd-professional-grid5.html",
				dataType:"html",
//				data:{id:1,ccc:"ccc"},				
				success:function(data){
					
					_this.warp.innerHTML = data;
					_this.content.innerHTML = '';						
					Elf.controls.appendTo( _this.warp, _this.form);				
					Elf.controls.appendTo( _this.form, _this.content);
					//假数据
					_this.randerData( zhuanyekeshiData.grid5Data );
					_this.btnFn();
				
				},
				error:function(xhr){
					
					console.info(xhr);
				}
			});			
			
		}
		
		//渲染数据
		BasiSituation5.prototype.randerData = function( data ){
			var rows = this.warp.querySelectorAll('.row');
			var gridBodyWarp = this.warp.querySelector('.grid-body');
			var dataArr = data.teachersInfo;
			var rowHtml = "";
			
			for (var i = 0; i < dataArr.length; i++) {
				
				rowHtml += '<div class="row wfull h40 clear-fix" ><div class="col-xs-4 hfull" ><div class="col-xs-3 ceils hfull" ><input class="text" type="text" name="name" value="'+ dataArr[i].name +'"  /></div><div class="col-xs-2 ceils hfull" ><input class="text" type="text" name="gender" value="'+ dataArr[i].gender +'"  /></div><div class="col-xs-2 ceils hfull" ><input class="text" type="text" name="age" value="'+ dataArr[i].age +'"  /></div><div class="col-xs-2 ceils hfull" ><input class="text" type="text" name="degree" value="'+ dataArr[i].degree +'" /></div><div class="col-xs-3 ceils hfull" ><input class="text" type="text" name="department" value="'+ dataArr[i].department +'" /></div></div><div class="col-xs-3 hfull" ><div class="col-xs-5 ceils hfull "><input class="text" type="text" name="zhiwu" value="'+ dataArr[i].zhiwu  +'" /></div><div class="col-xs-3 ceils hfull "><input class="text" type="text" name="zhuwuYears" value="'+  dataArr[i].zhuwuYears  +'" /></div><div class="col-xs-4 ceils hfull "><input class="text" type="text" name="workYears" value="'+ dataArr[i].workYears +'" /></div></div><div class="col-xs-5 hfull last-ceils" ><div class="col-xs-2 ceils hfull"><input class="text" type="text" name="daiInternYears" value="'+ dataArr[i].daiInternYears +'" /></div><div class="col-xs-2 ceils hfull"><input class="text" type="text" name="internNumber" value="'+ dataArr[i].internNumber +'" /></div><div class="col-xs-2 ceils hfull"><input class="text" type="text" name="daiResidentYears" value="'+ dataArr[i].daiResidentYears +'" /></div><div class="col-xs-2 ceils hfull"><input class="text" type="text" name="residentNumber" value="'+ dataArr[i].residentNumber +'" /></div><div class="col-xs-4 ceils hfull" ><input class="text" type="text" name="hasTraining" value="'+ dataArr[i].hasTraining +'" /></div></div></div>';
				
			}
			
			if( rowHtml !== '' ){

				gridBodyWarp.innerHTML = rowHtml;					
			}
			
		}
		
		//按钮绑定事件
		BasiSituation5.prototype.btnFn = function(){
			var _this = this;
			this.warp.addEventListener('click', function(ev){
		
				var has,
					e,
					tt,
					infos,
					infoRows,
					grid5Data,
					oneInfo,
					infoArr;
					
				has = Elf.utils.hasClass;		
				e = Elf.getEvent(ev);
				tt = Elf.getEventSource(ev);
				//整个数据
				grid5Data = {};
				infoArr = [];
				grid5Data.teachersInfo = infoArr;
				
				infoRows = this.getElementsByClassName('row');
				
				if( has( tt , 'save-data' ) ){
					
					console.log('保存数据');
					
					for (var i = 0; i < infoRows.length; i++) {
						infos = infoRows[i].getElementsByClassName('text');
						oneInfo = {};
						
						for (var j = 0; j < infos.length; j++) {
							
							oneInfo[infos[j].name] = infos[j].value;
						}
						infoArr.push(oneInfo);
					}
					
					console.log( grid5Data ,"发送数据到后端" );
					
					//loading动画
				    Elf.components.loading({

				        color:"#333",   //没效果...
				        target:document.body   //loading组件的父级元素
				    });
				    
					//关闭loading动画
				    Elf.components.loading.methods.close();
					
				    Elf.components.toast({
				        width:200,
				        height:200,
				        holdtime:500,
				        text:'保存成功！',
				        target:document.body
				    });					
					
					return
				}
				
				if( has( tt , 'submit-data' ) ){
					
					console.log('提交数据'); 
					
					for (var i = 0; i < infoRows.length; i++) {
						
						infos = infoRows[i].getElementsByClassName('text');
						oneInfo = {};

						for (var j = 0; j < infos.length; j++) {

							if( Elf.utils.trim( infos[j].value ) === '' ){

								infos[j].focus();
								
							    Elf.components.toast({	
							        holdtime:1000,
							        text:'请填写完整再提交！',
							        target:document.body
							    });	
							    
								return
								
							}
							
							oneInfo[infos[j].name] = infos[j].value;
						
						}
						infoArr.push(oneInfo);
					
					}
					
					console.log( grid5Data ,"发送数据到后端" );
					
					//loading动画
				    Elf.components.loading({

				        color:"#333",   //没效果...
				        target:document.body   //loading组件的父级元素
				    });
				    
					//关闭loading动画
				    Elf.components.loading.methods.close();
					
				    Elf.components.toast({
				        width:200,
				        height:200,
				        holdtime:500,
				        text:'提交成功！',
				        target:document.body
				    });
					
					return
				}
				
				if( has( tt , 'addrow' ) ){
					
					console.log('添加行');
					_this.addRow();
				}
				
			})
		}		
		
		//添加一条数据
		BasiSituation5.prototype.addRow = function(){
			var rowHtml,
				gridWarp,
				row;
				
			rowHtml = `
				<div class="col-xs-4 hfull" >							
					<div class="col-xs-3 ceils hfull" > 
						<input class="text" type="text" name="name"  />
					</div>
					<div class="col-xs-2 ceils hfull" >
						<input class="text" type="text" name="gender"  />
					</div>
					<div class="col-xs-2 ceils hfull" >
						<input class="text" type="text" name="age"  />									
					</div>
					<div class="col-xs-2 ceils hfull" >
						<input class="text" type="text" name="degree"  />
					</div>
					<div class="col-xs-3 ceils hfull" >									
						<input class="text" type="text" name="department"  />
					</div>							
					
					
				</div>
				<div class="col-xs-3 hfull" >
					
					<div class="col-xs-5 ceils hfull ">										
						<input class="text" type="text" name="zhiwu"  />										
					</div>
					
					<div class="col-xs-3 ceils hfull ">										
						<input class="text" type="text" name="zhuwuYears"  />										
					</div>
					
					<div class="col-xs-4 ceils hfull ">										
						<input class="text" type="text" name="workYears"  />										
					</div>
					
				</div>
				<div class="col-xs-5 hfull last-ceils" >
					
					<div class="col-xs-2 ceils hfull">									
						<input class="text" type="text" name="daiInternYears"  />											
					</div>

					<div class="col-xs-2 ceils hfull">
						
						<input class="text" type="text" name="internNumber"  />											
					</div>
					
					<div class="col-xs-2 ceils hfull">									
						<input class="text" type="text" name="daiResidentYears"  />											
					</div>
					
					<div class="col-xs-2 ceils hfull">									
						<input class="text" type="text" name="residentNumber"  />											
					</div>
					
					<div class="col-xs-4 ceils hfull" >
						
						<input class="text" type="text" name="hasTraining"  />	
						
					</div>
				</div>`;
				
			gridWarp = this.warp.getElementsByClassName('grid-body')[0];
			row = $creatE('div' , 'row wfull h40 clear-fix');
			row.innerHTML = rowHtml;
			$pTo( row , gridWarp );
			
		}
		
		//隐藏按钮
		BasiSituation5.prototype.hideBtns = function(){
			var hash,
				btns;
				
			hash = window.location.hash.substring(1);
		
			btns = this.warp.getElementsByClassName('btn');
			
			console.log( hash );
			if( hash.indexOf('newPage') !== -1 ){
				
				for (var i = 0; i < btns.length; i++) {
					
					Elf.effects.hidden(btns[i]);
				}			
			}
		
		}
	})();	
 	
//------***** 专业科室 > 专业科室基本情况表6 ******--------	
	;(function(){
		
		function BasiSituation6(){
			this.content = document.getElementById("bg");
			this.warp = $creatE('div' ,'grid6 full');
			this.form = $creatE( 'form' , 'full');
			this.init();
		}
		
		//专业科室基本情况表6接口
		zyjdModuleByGao.basiSituation6 = BasiSituation6;
		
		BasiSituation6.prototype.init = function(){
			
			this.creatGrid6();
		}
		
		//生成表格
		BasiSituation6.prototype.creatGrid6 = function(){
			var _this = this;

			Elf.components.ajax({
				
				url:"zyjd-professional-grid6.html",
				dataType:"html",
				data:{id:1,ccc:"ccc"},
				
				success:function(data){
					
					_this.warp.innerHTML = data;
					_this.content.innerHTML = '';
					Elf.controls.appendTo( _this.warp, _this.form);					
					Elf.controls.appendTo( _this.form, _this.content);
					_this.btnFn();
					_this.textAreaLimit();
					//需要请求数据
					_this.randerData(zhuanyekeshiData.grid6Data);
				},
				error:function(xhr){
					
					console.info(xhr);
				}
			});			
			
		}
		
		//渲染数据
		BasiSituation6.prototype.randerData = function( dataObj ){
			var data = dataObj.gridInfo;
			var texts = this.warp.getElementsByClassName('text');
			var radios = this.warp.getElementsByClassName('radio-dsqk');
			
			for (var i = 0; i < texts.length; i++) {
				
				texts[i].value = data[texts[i].name]?data[texts[i].name]:'';
				
			}
			
			for (var i = 0; i < radios.length; i++) {
				
				if( radios[i].value === data[radios[0].name] ){
					
					radios[i].checked = "checked"; 

				}

			}
			
		}

		//按钮绑定事件
		BasiSituation6.prototype.btnFn = function(){
			var _this = this;
			this.warp.addEventListener('click', function(ev){
		
				var has,
					e,
					tt,
					dataObj,
					isCheckAudio,
					radioWarp,
					allTexts,
					radios;
				
				dataObj = {};
				isCheckAudio = false;
				has = Elf.utils.hasClass;		
				e = Elf.getEvent(ev);
				tt = Elf.getEventSource(ev);
					
				allTexts = this.querySelectorAll('.text');
				radios = this.querySelectorAll('.radio-dsqk');				
				radioWarp = this.querySelector('.radio-warp');
				Elf.utils.removeClass( radioWarp , 'focus' );
				
				if( has( tt , 'save-data' ) ){

					console.log('保存数据');  
					dataObj = _this.getTableInfo();
					console.log(dataObj);
					
					return
				}
				if( has( tt , 'submit-data' ) ){
					
					console.log('提交数据');					
					for (var i = 0; i < allTexts.length; i++) {
						
						if( Elf.utils.trim( allTexts[i].value) === '' ){
							
							allTexts[i].focus();
							
						    Elf.components.toast({	
						        holdtime:1000,
						        text:'请填写完整再提交！',
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
					        text:'请选择导师情况！',
					        target:document.body
					    });							
					
						return						
						
					}
					
					dataObj = _this.getTableInfo();
					console.log( dataObj );					

					return
				}
				
			});

		}		
		
		//textarea字数限制
		BasiSituation6.prototype.textAreaLimit = function(){
			
			var aTextArea = this.warp.getElementsByClassName('textarea');
			
			for (var i = 0; i < aTextArea.length; i++) {
				
				aTextArea[i].addEventListener('input' , function(){
					console.log('输入中');
					if( Elf.utils.trim( this.value ).length > 2500 ){
						
					    Elf.components.toast({

					        holdtime:1000,
					        text:'内容过多，请输入少于2500字！',
					        target:box
					    });
						this.value = this.value.substring(0 , 5);
						
					}
				});
			}
						
		}
		
		//隐藏按钮
		BasiSituation6.prototype.hideBtns = function(){
			var hash,
				btns;
				
			hash = window.location.hash.substring(1);
		
			btns = this.warp.getElementsByClassName('btn');
			
			console.log( hash );
			if( hash.indexOf('newPage') !== -1 ){
				
				for (var i = 0; i < btns.length; i++) {
					
					Elf.effects.hidden(btns[i]);
				}			
			}
		
		}	
		
		//获取表单数据
		BasiSituation6.prototype.getTableInfo = function(){
			var texts,
				infoObj,
				radios;
			texts = this.warp.querySelectorAll('.text');
			radios = this.warp.getElementsByClassName('radio-dsqk');
			infoObj = {};
			
			for (var i = 0; i < texts.length; i++) {
				
				infoObj[texts[i].name] = texts[i].value;
			}
			
			for (var i = 0; i < radios.length; i++) {
				
				if( radios[i].checked ){
					
					infoObj[radios[i].name] = radios[i].value;
				}
			}
			
			
			return infoObj;
		}
	})();
	
})()
