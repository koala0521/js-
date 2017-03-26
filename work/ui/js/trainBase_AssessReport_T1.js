/**
 * [trainBase_assessment_T1 description]
 * @Author   liweiliang  QQ:406320591(406320591@QQ.com).
 * @DateTime 2017-03-01.
 * @version  1.0                                [description]
 */

 trainBase_AssessReport.trainingBase_T1 = function(){
 	page.layout.centerRegion.innerHTML="";
 	var fbar=Elf.controls.createElement("div", "elf-fbar large");
 	var pagingBox=Elf.controls.createElement("div", "pt16");
 	Elf.controls.appendTo(pagingBox,fbar);
 	var tbar=Elf.controls.createElement("div", "elf-tbar large trainHeight_T1 prl24");
	// var title=Elf.controls.createElement("h1","tac assessTit",{innerHTML:"护理人员评估住院医师"});
	// Elf.controls.appendTo(title, tbar);
	loadTemplet("templates/assessmentReport_T1.html",function(templet) {
		trainBase_AssessReport.assessmentReport_T1_Form=Elf.controls.createElement("form");
		var doc = Elf.utils.perser(templet, "text/html");
		var _df = Elf.utils.toDocumentFragment(doc.body);
		Elf.controls.appendTo(_df,trainBase_AssessReport.assessmentReport_T1_Form);
		Elf.controls.appendTo(trainBase_AssessReport.assessmentReport_T1_Form,tbar);
		var proReportBtn = trainBase_AssessReport.assessmentReport_T1_Form.proReportBtn;
		Elf.xEvents.bind(proReportBtn, "click", function (evt) {
			evt.preventDefault();
			trainBase_AssessReport.queryArgs = Elf.utils.serializeObject(trainBase_AssessReport.assessmentReport_T1_Form);
 			trainBase_AssessReport.currentPage = 1;
 			trainBase_AssessReport.updataPageDataGridT1(trainBase_AssessReport.queryArgs);
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
	var dataList = trainBase_AssessReport.datalist_T1;
	// console.log(dataList);
	trainBase_AssessReport.trainGridT1=Elf.components.grid({
		width:1000,
		cols:trainBase_AssessReport.gridHeadCols_T1,
		data:dataList?dataList.slice(0,trainBase_AssessReport.pageSize):[],
		onCellSelected:function(evt,item,rowIndex,colIndex){
			// console.info(this);
			// console.info(evt);
			// console.info(item);
			// console.info(rowIndex);
			// console.info(colIndex);
			var tt=evt.target;
			// if(Elf.utils.hasClass(tt,"viewResults")){
			// 	console.info("编辑行");
			// }
		},
		target:contentBody
	});
	var totalLength = trainBase_AssessReport.datalist_T1.length;
	trainBase_AssessReport.pagingT1 = Elf.components.paging({
		// total:data.data.total,
		total:totalLength,
		pageSize:trainBase_AssessReport.pageSize,
		currentPage:trainBase_AssessReport.currentPage,
		statusFormat:"共 <b>{{total}}</b> 条记录 <b>{{totalPage}}</b> 页 当前第 <b>{{currentPage}}</b> 页",
		onPagerChange:function(p){
			trainBase_AssessReport.currentPage=p;
			// console.info(trainBase_AssessReport.currentPage);
			trainBase_AssessReport.updataPageDataGridT1(trainBase_AssessReport.queryArgs);
			// Elf.components.grid.methods.update(trainBase_AssessReport.GraduatesT2,assessReportBS_t2.slice((p-1)*trainBase_AssessReport.pageSize,trainBase_AssessReport.pageSize*p));
		},
		target:pagingBox
	});
	 	// 翻页、删除后更新数据
 	// trainBase_AssessReport.updataPageDataGridT1=function(queryArgs){
 	// 	if(queryArgs == undefined){
 	// 		var senddata = {
 	// 			serviceModule:serviceInfo.serviceModule,
 	// 			serviceNumber:'0901000',
 	// 			token:token,
 	// 			args:{
 	// 				id:"",
 	// 				baseCode:baseCode,
 	// 				name:"",
 	// 				identityNumber:"",
 	// 				grade:"",
 	// 				maxNum:trainBase_AssessReport.pageSize,
 	// 				pages:trainBase_AssessReport.currentPage
 	// 			}
 	// 		};
 	// 	}else{
 	// 		queryArgs.baseCode= baseCode;
 	// 		queryArgs.maxNum = trainBase_AssessReport.pageSize;
 	// 		queryArgs.pages = trainBase_AssessReport.currentPage;
 	// 		var senddata = {
 	// 			serviceModule:serviceInfo.serviceModule,
 	// 			serviceNumber:'0901000',
 	// 			token:token,
 	// 			args:queryArgs
 	// 		};
 	// 	}
 	// 	commonLogic.serviceCaller(senddata,function(data){
 	// 		if(data.flag == "true"){
 	// 			Elf.components.grid.methods.update(trainBase_AssessReport.traineeT4,data.result);
 	// 			Elf.components.paging.methods.update(trainBase_AssessReport.pagingTraineeT4,{
 	// 				total:Number(data.maxSize),
 	// 				currentPage:Number(trainBase_AssessReport.currentPage),
 	// 				pageSize:Number(trainBase_AssessReport.pageSize)
 	// 			});
 	// 		}else{
 	// 			Elf.components.toast({text:data.error});
 	// 		}
 	// 	});
 	// };
};