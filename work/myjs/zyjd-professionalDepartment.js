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
					_this.btnFn();
					//请求数据
//					console.log( zhuanyekeshiData.grid4Data.gridInfo );
					_this.randerInfo( zhuanyekeshiData.grid4Data.gridInfo );
				},
				error:function(xhr){
					
					console.info(xhr);
				}
			});			
			
		}
		
		//按钮事件
		BasiSituation4.prototype.btnFn = function(){
			
			var _this = this;
			
			this.warp.addEventListener('click', function(ev){
		
				var has,
					e,
					tt,
					infoObj,
					radios,
					isChecked,
					rowStr,
					rowWarp,
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

					console.log( infoObj );

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
				
				//添加一行数据
				if( has( tt , 'addrow' ) ){
					itemsWarp = tt.parentNode.parentNode.parentNode. getElementsByClassName('items-warp')[0];				
											
					rowWarp = $creatE('div','items wfull clear-fix nobr borderbr');
						
					console.log( itemsWarp );
					if(  has( itemsWarp , 'jbzl') ){
						
						var len = itemsWarp.getElementsByClassName('items').length;
						
						console.log( '添加疾病种类' );
						
						rowStr = '<div class="col-xs-2 no-padding textc" ><span class="line-h40">'+ (len+1) +'</span></div><div class="col-xs-7 no-padding" ><input type="text" class="text arrText w96" name="jbtype"  /></div><div class="col-xs-3 nobr no-padding" ><input type="text" class="text arrText w96" name="nzzNum" /></div>';
						
					}else if(  has( itemsWarp , 'lcjn') ){
						var len = itemsWarp.getElementsByClassName('items').length;
						console.log( '添加手术种类' );

						rowStr = '<div class="col-xs-2 no-padding textc" ><span class="line-h40">'+ (len+1)  +'</span></div><div class="col-xs-7 no-padding" ><input type="text" class="text arrText w96" name="lcjnName"  /></div><div class="col-xs-3 nobr no-padding" ><input type="text" class="text arrText w96" name="lcjnNum" /></div>';

					}else if(  has( itemsWarp , 'ylsb') ){
						
						var len = itemsWarp.getElementsByClassName('items').length;						
						console.log( '添加设备种类' );
						
						rowStr = '<div class="col-xs-2 no-padding textc" ><span class="line-h40">'+ (len+1) +'</span></div><div class="col-xs-7 no-padding" ><input type="text" class="text arrText w96" name="sbyqName"  /></div><div class="col-xs-3 nobr no-padding" ><input type="text" class="text arrText w96" name="sbyqNum" /></div>';						
						
					}
					
					rowWarp.innerHTML = rowStr;
					$pTo( rowWarp , itemsWarp);

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
				diseaseHtml,
				diseaseTypeWarp,
				skillHtml,
				skillTypeWarp,
				medicalHtml,
				medicalEquipment;
				
			data = data;			
			objTexts = this.warp.getElementsByClassName('objText');							
			radios = this.warp.getElementsByClassName('is-importent');
			diseaseTypeWarp = this.warp.querySelector('.disease-type-warp');
			skillTypeWarp = this.warp.querySelector('.skill-type-warp');
			medicalEquipment = this.warp.querySelector('.medical-equipment-warp');
			diseaseHtml = '';
			skillHtml = '';
			medicalHtml = '';

//			console.log( data );
			//单选按钮
			for (var i = 0; i < radios.length; i++) {
				
				if( radios[i].value == data.isImportent ){
					
					radios[i].checked = "checked";
				}
			}
			//其他基础数据
			for (var i = 0; i < objTexts.length; i++) {
				
				objTexts[i].value = data[objTexts[i].name];
			}

			
			//疾病种类
			if( !data.diseaseType.length ){
				
				for (var i = 0; i < 2; i++) {
					
					diseaseHtml +='<div class="items wfull clear-fix nobr borderbr" ><div class="col-xs-2 no-padding textc" ><span class="line-h40">'+ ( i+1 ) +'</span></div><div class="col-xs-7 no-padding" ><input type="text" class="text arrText w96" name="jbtype" value=""  /></div><div class="col-xs-3 nobr no-padding" ><input type="text" class="text arrText w96" name="nzzNum" value="" /></div></div>';
							
				}				
				
				
			}else{
				
				for (var i = 0; i < data.diseaseType.length; i++) {
					
					diseaseHtml +='<div class="items wfull clear-fix nobr borderbr" ><div class="col-xs-2 no-padding textc" ><span class="line-h40">'+ ( i+1 ) +'</span></div><div class="col-xs-7 no-padding" ><input type="text" class="text arrText w96" name="jbtype" value="'+ data.diseaseType[i].jbtype +'"  /></div><div class="col-xs-3 nobr no-padding" ><input type="text" class="text arrText w96" name="nzzNum" value="'+ data.diseaseType[i].nzzNum +'" /></div></div>';
							
				}				
				
			}

			diseaseTypeWarp.innerHTML = diseaseHtml;
			
			//手术种类
			if( !data.skillType.length ){
				
				for (var i = 0; i < 2; i++) {
					
					skillHtml +='<div class="items wfull clear-fix nobr borderbr" ><div class="col-xs-2 no-padding textc" ><span class="line-h40">'+ ( i+1 ) +'</span></div><div class="col-xs-7 no-padding" ><input type="text" class="text arrText w96" name="lcjnName" value=""  /></div><div class="col-xs-3 nobr no-padding" ><input type="text" class="text arrText w96" name="lcjnNum" value="" /></div></div>';
							
				}				
				
				
			}else{
				
				for (var i = 0; i < data.skillType.length; i++) {
					
					skillHtml +='<div class="items wfull clear-fix nobr borderbr" ><div class="col-xs-2 no-padding textc" ><span class="line-h40">'+ ( i+1 ) +'</span></div><div class="col-xs-7 no-padding" ><input type="text" class="text arrText w96" name="lcjnName" value="'+ data.skillType[i].lcjnName +'"  /></div><div class="col-xs-3 nobr no-padding" ><input type="text" class="text arrText w96" name="lcjnNum" value="'+ data.skillType[i].lcjnNum +'" /></div></div>';
							
				}				
				
			}
			
			skillTypeWarp.innerHTML = skillHtml;
			
			//设备仪器
			if( !data.medicalEquipment.length ){
				
				for (var i = 0; i < 2; i++) {
					
					medicalHtml +='<div class="items wfull clear-fix nobr borderbr" ><div class="col-xs-2 no-padding textc" ><span class="line-h40">'+ ( i+1 ) +'</span></div><div class="col-xs-7 no-padding" ><input type="text" class="text arrText w96" name="sbyqName" value=""  /></div><div class="col-xs-3 nobr no-padding" ><input type="text" class="text arrText w96" name="sbyqNum" value="" /></div></div>';
							
				}				
				
				
			}else{
				
				for (var i = 0; i < data.medicalEquipment.length; i++) {
					
					medicalHtml +='<div class="items wfull clear-fix nobr borderbr" ><div class="col-xs-2 no-padding textc" ><span class="line-h40">'+ ( i+1 ) +'</span></div><div class="col-xs-7 no-padding" ><input type="text" class="text arrText w96" name="sbyqName" value="'+ data.medicalEquipment[i].sbyqName +'"  /></div><div class="col-xs-3 nobr no-padding" ><input type="text" class="text arrText w96" name="sbyqNum" value="'+ data.medicalEquipment[i].sbyqNum +'" /></div></div>';
							
				}				
				
			}
			
			medicalEquipment.innerHTML = medicalHtml;			
		
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
		BasiSituation5.prototype.randerData = function( dataArr ){
			var rows = this.warp.querySelectorAll('.row');
			var gridBodyWarp = this.warp.querySelector('.grid-body');
			
			var rowHtml = "";
			
			for (var i = 0; i < dataArr.length; i++) {
				
				rowHtml += `
				<div class="row wfull h40 clear-fix" >
					
					<div class="col-xs-4 hfull" >
						
						<div class="col-xs-3 ceils hfull" > 
							<input class="text" type="text" name="name" value="${ dataArr[i].name }"  />
						</div>
						<div class="col-xs-2 ceils hfull" >
							<input class="text" type="text" name="gender" value="${ dataArr[i].gender }"  />
						</div>
						<div class="col-xs-2 ceils hfull" >
							<input class="text" type="text" name="age" value="${ dataArr[i].age }"  />									
						</div>
						<div class="col-xs-2 ceils hfull" >
							<input class="text" type="text" name="degree" value="${ dataArr[i].degree }" />
						</div>
						<div class="col-xs-3 ceils hfull" >									
							<input class="text" type="text" name="department" value="${ dataArr[i].department }" />
						</div>														
						
					</div>
					<div class="col-xs-3 hfull" >
						
						<div class="col-xs-5 ceils hfull ">										
							<input class="text" type="text" name="zhiwu" value="${ dataArr[i].zhiwu }" />										
						</div>
						
						<div class="col-xs-3 ceils hfull ">										
							<input class="text" type="text" name="zhuwuYears" value="${ dataArr[i].zhuwuYears }" />										
						</div>
						
						<div class="col-xs-4 ceils hfull ">										
							<input class="text" type="text" name="workYears" value="${ dataArr[i].workYears }" />										
						</div>
						
					</div>
					<div class="col-xs-5 hfull last-ceils" >
						
						<div class="col-xs-2 ceils hfull">									
							<input class="text" type="text" name="daiInternYears" value="${ dataArr[i].daiInternYears }" />											
						</div>

						<div class="col-xs-2 ceils hfull">
							
							<input class="text" type="text" name="internNumber" value="${ dataArr[i].internNumber }" />											
						</div>
						
						<div class="col-xs-2 ceils hfull">									
							<input class="text" type="text" name="daiResidentYears" value="${ dataArr[i].daiResidentYears }" />											
						</div>
						
						<div class="col-xs-2 ceils hfull">									
							<input class="text" type="text" name="residentNumber" value="${ dataArr[i].residentNumber }" />											
						</div>
						
						<div class="col-xs-4 ceils hfull" >
							
							<input class="text" type="text" name="hasTraining" value="${ dataArr[i].hasTraining }" />	
							
						</div>
					</div>

				</div>`;
				
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
				},
				error:function(xhr){
					
					console.info(xhr);
				}
			});			
			
		}
		
		//渲染数据
		BasiSituation6.prototype.randerData = function( dataObj ){
			
			var texts = this.warp.getElementsByClassName('text');
			var radios = this.warp.getElementsByClassName('radio-dsqk');
			
			for (var i = 0; i < texts.length; i++) {
				
				texts[i].value = dataObj[texts[i].name];
				
			}
			
			for (var i = 0; i < radios.length; i++) {
				
				if( radios[i].value === dataObj[radios[0].name] ){
					
					radios[i].checked = "checked"; 

				}

			}
			
		}

		//按钮绑定事件
		BasiSituation6.prototype.btnFn = function(){

			this.warp.addEventListener('click', function(ev){
		
				var has,
					e,
					tt,
					dataObj,
					isCheckAudio,
					radioWarp;
				
				dataObj = {};
				isCheckAudio = false;
				has = Elf.utils.hasClass;		
				e = Elf.getEvent(ev);
				tt = Elf.getEventSource(ev);
				
				radioWarp = this.getElementsByClassName('radio-warp')[0];
				Elf.utils.removeClass( radioWarp , 'focus' );
				
				if( has( tt , 'save-data' ) ){

					console.log('保存数据');  
					var texts = this.getElementsByClassName('text');
					var radios = this.getElementsByClassName('radio-dsqk');
					
					for (var i = 0; i < texts.length; i++) {
						
						dataObj[texts[i].name] = texts[i].value;
						
					}
					
					for (var i = 0; i < radios.length; i++) {
						
						if( radios[i].checked ){
						
							dataObj[radios[i].name] = radios[i].value;							
							
						}

					}
					
					console.log( dataObj );
					
					return
				}
				if( has( tt , 'submit-data' ) ){
					
					console.log('提交数据');
					
					var texts = this.getElementsByClassName('text');
					var radios = this.getElementsByClassName('radio-dsqk');
					
					for (var i = 0; i < texts.length; i++) {
						
						if( Elf.utils.trim( texts[i].value) === '' ){
							
							texts[i].focus();
							
						    Elf.components.toast({	
						        holdtime:1000,
						        text:'请填写完整再提交！',
						        target:document.body
						    });							
						
							return
						}
						
						dataObj[texts[i].name] = texts[i].value;
						
					}
					
					for (var i = 0; i < radios.length; i++) {
						
						if( radios[i].checked ){
							
							isCheckAudio = true;
							dataObj[radios[i].name] = radios[i].value;							
							
						}

					}
					//单选框是否选中
					if( !isCheckAudio ){
						
						Elf.utils.addClass( radioWarp , 'focus' );
						console.log( radioWarp );
						radios[0].focus();
						
					    Elf.components.toast({	
					        holdtime:1000,
					        text:'请选择导师情况！',
					        target:document.body
					    });							
					
						return						
						
					}
					
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
		
		
	})();
	
})()
