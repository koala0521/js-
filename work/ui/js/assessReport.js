/**
 * [assessReport description]
 * @Author   liweiliang  QQ:406320591(406320591@QQ.com).
 * @DateTime 2017-02-28.
 * @version  1.0      [description]
 */

var assessReport = {
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
			assessReport.queryArgs = undefined;
 			assessReport.currentPage = 1;
			assessReport.trainingBase_T1();
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
			assessReport.indexManage_T1();
		// 	}else{
		// 		Elf.components.toast({text:data.error});
		// 	}
		// });
	},
	pageSize:25,
	currentPage:1
}