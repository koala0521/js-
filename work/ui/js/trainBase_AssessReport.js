/**
 * [trainBase_AssessReport description]
 * @Author   liweiliang  QQ:406320591(406320591@QQ.com).
 * @DateTime 2017-02-28.
 * @version  1.0      [description]
 */

var trainBase_AssessReport = {
	initAssessReport_T1:function(){
		// var senddata = {
		// 	serviceModule:serviceInfo.serviceModule,
		// 	serviceNumber:'1000020',
		// 	token:User.token,
		// 	args:{
		// 		fUserId:User.info.fId
		// 	}
		// };
		// commonLogic.serviceCaller(senddata,function(data){
		// 	if(data.flag == "true"){
			trainBase_AssessReport.queryArgs = undefined;
 			trainBase_AssessReport.currentPage = 1;
			trainBase_AssessReport.trainingBase_T1();
		// 	}else{
		// 		Elf.components.toast({text:data.error});
		// 	}
		// });
	},
	initAssessReport_T2:function(){
		// var senddata = {
		// 	serviceModule:serviceInfo.serviceModule,
		// 	serviceNumber:'1000020',
		// 	token:User.token,
		// 	args:{
		// 		fUserId:User.info.fId
		// 	}
		// };
		// commonLogic.serviceCaller(senddata,function(data){
		// 	if(data.flag == "true"){
			trainBase_AssessReport.indexManage_T1();
		// 	}else{
		// 		Elf.components.toast({text:data.error});
		// 	}
		// });
	},
	pageSize:25,
	currentPage:1
}