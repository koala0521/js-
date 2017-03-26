/**
 * [assessReport_T1 description]
 * @Author   liweiliang  QQ:406320591(406320591@QQ.com).
 * @DateTime 2017-03-01.
 * @version  1.0                                [description]
 */

 assessReport.trainingBase_T1 = function(){
 	page.layout.centerRegion.innerHTML="";
 	var fbar=Elf.controls.createElement("div", "elf-fbar large");
 	var pagingBox=Elf.controls.createElement("div", "pt16");
 	Elf.controls.appendTo(pagingBox,fbar);
 	var tbar=Elf.controls.createElement("div", "elf-tbar large trainHeight_T1 prl24");
	// var title=Elf.controls.createElement("h1","tac assessTit",{innerHTML:"护理人员评估住院医师"});
	// Elf.controls.appendTo(title, tbar);
	loadTemplet("templates/assessmentReport_T1.html",function(templet) {
		assessReport.assessmentReport_T1_Form=Elf.controls.createElement("form");
		var doc = Elf.utils.perser(templet, "text/html");
		var _df = Elf.utils.toDocumentFragment(doc.body);
		Elf.controls.appendTo(_df,assessReport.assessmentReport_T1_Form);
		Elf.controls.appendTo(assessReport.assessmentReport_T1_Form,tbar);
		var proReportBtn = assessReport.assessmentReport_T1_Form.proReportBtn;
		Elf.xEvents.bind(proReportBtn, "click", function (evt) {
			evt.preventDefault();
			assessReport.queryArgs = Elf.utils.serializeObject(assessReport.assessmentReport_T1_Form);
 			assessReport.currentPage = 1;
 			assessReport.updataPageDataGridT1(assessReport.queryArgs);
			console.log("sss");
		});
	});
	var content = Elf.controls.createElement("div", "elf-content trainPt_T1 prl24");
	var contentBody=Elf.controls.createElement("div", "elf-content-body");
	Elf.controls.appendTo(contentBody, content);
	Elf.controls.appendTo(fbar,page.layout.centerRegion);
	Elf.controls.appendTo(tbar,page.layout.centerRegion);
	Elf.controls.appendTo(content,page.layout.centerRegion);
	//创建表格
	// var dataList = data.data.list;
	var dataList = assessReport.datalist_T1;
	// console.log(dataList);
	assessReport.trainGridT1=Elf.components.grid({
		width:1000,
		cols:assessReport.gridHeadCols_T1,
		data:dataList?dataList.slice(0,assessReport.pageSize):[],
		onCellSelected:function(evt,item,rowIndex,colIndex){
			// console.info(this);
			// console.info(evt);
			// console.info(item);
			// console.info(rowIndex);
			// console.info(colIndex);
			var tt=evt.target;
			if(Elf.utils.hasClass(tt,"viewResults")){
				console.info("编辑行");
				// assessReport.addEditGraduatesT2(item);
			}
		},
		target:contentBody
	});
	var totalLength = assessReport.datalist_T1.length;
	assessReport.pagingT1 = Elf.components.paging({
		// total:data.data.total,
		total:totalLength,
		pageSize:assessReport.pageSize,
		currentPage:assessReport.currentPage,
		statusFormat:"共 <b>{{total}}</b> 条记录 <b>{{totalPage}}</b> 页 当前第 <b>{{currentPage}}</b> 页",
		onPagerChange:function(p){
			assessReport.currentPage=p;
			// console.info(assessReport.currentPage);
			assessReport.updataPageDataGridT1(assessReport.queryArgs);
			// Elf.components.grid.methods.update(assessReport.GraduatesT2,assessReportBS_t2.slice((p-1)*assessReport.pageSize,assessReport.pageSize*p));
		},
		target:pagingBox
	});
	 	// 翻页、删除后更新数据
 	assessReport.updataPageDataGridT1=function(queryArgs){
 		if(queryArgs == undefined){
 			var senddata = {
 				serviceModule:serviceInfo.serviceModule,
 				serviceNumber:'0901000',
 				token:token,
 				args:{
 					id:"",
 					baseCode:baseCode,
 					name:"",
 					identityNumber:"",
 					grade:"",
 					maxNum:assessReport.pageSize,
 					pages:assessReport.currentPage
 				}
 			};
 		}else{
 			queryArgs.baseCode= baseCode;
 			queryArgs.maxNum = assessReport.pageSize;
 			queryArgs.pages = assessReport.currentPage;
 			var senddata = {
 				serviceModule:serviceInfo.serviceModule,
 				serviceNumber:'0901000',
 				token:token,
 				args:queryArgs
 			};
 		}
 		commonLogic.serviceCaller(senddata,function(data){
 			if(data.flag == "true"){
 				Elf.components.grid.methods.update(assessReport.traineeT4,data.result);
 				Elf.components.paging.methods.update(assessReport.pagingTraineeT4,{
 					total:Number(data.maxSize),
 					currentPage:Number(assessReport.currentPage),
 					pageSize:Number(assessReport.pageSize)
 				});
 			}else{
 				Elf.components.toast({text:data.error});
 			}
 		});
 	};
};