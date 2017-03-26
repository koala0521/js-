/**
 * [doctor grid header description]
 * @Author   liweiliang  QQ:406320591(406320591@QQ.com).
 * @DateTime 2017-02-28.
 * @version  1.0      [description]
 */
// 0中国医师协会 培训基地评估报告
assessReport.gridHeadCols_T1=[
	{title:"查看评估结果",name:"results",width:120 ,align:"center",valign:"middle",fixedColumn:true,
		renderer:function(name,rowIndex,rowData){
			return '<a class="viewResults" href="#">查看</a>';
		}
	},
	{title:"省",name:"province",width:80 ,align:"center",fixedColumn:true },
	{title:"培训基地",name:"trainBase",width:48 ,align:"center"},
	{title:"年度",name:"year",width:100 ,align:"center"},
	{title:"期数",name:"periods",width:100 ,align:"center"},
	{title:"起始时间",name:"startTime",width:100 ,align:"center"},
	{title:"截止时间",name:"endTime",width:100 ,align:"center"},
	{title:"住院医师评估带教老师",name:"residentTeacher",width:100 ,align:"center",
		renderer:function(name,rowIndex,rowData){
			if(rowData[name]=="0"){
				return '<span class="notEvaluated">未评估</span>';
			}else if(rowData[name]=="1"){
				return '<span class="alreadyEvaluated">已评估</span>';
			}else{
				return "";
			}
		}
	},
	{title:"带教老师评估住院医师",name:"evaluationTeacher",width:100 ,align:"center",
		renderer:function(name,rowIndex,rowData){
			if(rowData[name]=="0"){
				return "未评估";
			}else if(rowData[name]=="1"){
				return "已评估";
			}else{
				return "";
			}
		}
	},
	{title:"护理人员评估住院医师",name:"nursingTeacher",width:100 ,align:"center",
		renderer:function(name,rowIndex,rowData){
			if(rowData[name]=="0"){
				return "未评估";
			}else if(rowData[name]=="1"){
				return "已评估";
			}else{
				return "";
			}
		}
	},
];
// 2培训基地 培训基地评估报告
trainBase_AssessReport.gridHeadCols_T1=[
	{title:"查看评估结果",name:"results",width:120 ,align:"center",valign:"middle",fixedColumn:true,
		renderer:function(name,rowIndex,rowData){

			var token=Elf.utils.getParam("token");
			var JumpUrl = encodeURI('trainBase_AssessReport.html?token='+ token +'&type='+ rowData["type"] +'&name='+ rowData["name"] +'&majorCode='+ rowData["majorCode"] +'&batchId='+ rowData["batchId"] +'');

			return '<a class="viewResults" target="_blank" href='+ JumpUrl +'>查看</a>';

			// return '<a class="viewResults" type='+ rowData["type"] +' name='+ rowData["name"] +' majorCode='+ rowData["majorCode"] +' batchId='+ rowData["batchId"] +' href="#">查看</a>';
		}
	},
	{title:"省",name:"province",width:80 ,align:"center",fixedColumn:true },
	{title:"培训基地",name:"trainBase",width:48 ,align:"center"},
	{title:"年度",name:"year",width:100 ,align:"center"},
	{title:"期数",name:"periods",width:100 ,align:"center"},
	{title:"起始时间",name:"startTime",width:100 ,align:"center"},
	{title:"截止时间",name:"endTime",width:100 ,align:"center"},
	{title:"住院医师评估带教老师",name:"residentTeacher",width:100 ,align:"center",
		renderer:function(name,rowIndex,rowData){
			if(rowData[name]=="0"){
				return '<span class="notEvaluated">未评估</span>';
			}else if(rowData[name]=="1"){
				return '<span class="alreadyEvaluated">已评估</span>';
			}else{
				return "";
			}
		}
	},
	{title:"带教老师评估住院医师",name:"evaluationTeacher",width:100 ,align:"center",
		renderer:function(name,rowIndex,rowData){
			if(rowData[name]=="0"){
				return "未评估";
			}else if(rowData[name]=="1"){
				return "已评估";
			}else{
				return "";
			}
		}
	},
	{title:"护理人员评估住院医师",name:"nursingTeacher",width:100 ,align:"center",
		renderer:function(name,rowIndex,rowData){
			if(rowData[name]=="0"){
				return "未评估";
			}else if(rowData[name]=="1"){
				return "已评估";
			}else{
				return "";
			}
		}
	},
]