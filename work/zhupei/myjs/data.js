var data = {};

data.currentPage = 1;
data.pageSize = 5;

data.treeData =[
	{"categoryName":"疾病分类","depth":1,"iD":1,"orderBy":1,"parentID":0,"path":"1"},
	{"categoryName":"药品分类","depth":1,"iD":2,"orderBy":1,"parentID":0,"path":"2"},
	{"categoryName":"检查分类","depth":1,"iD":3,"orderBy":1,"parentID":0,"path":"3"},
	{"categoryName":"循证分类","depth":1,"iD":4,"orderBy":1,"parentID":0,"path":"4"},
	{"categoryName":"医保用药分类","depth":1,"iD":5,"orderBy":1,"parentID":0,"path":"5"},
	{"categoryName":"研究进展分类","depth":1,"iD":6,"orderBy":1,"parentID":0,"path":"6"},
	{"categoryName":"手术分类","depth":1,"iD":7,"orderBy":1,"parentID":0,"path":"7"},

	{"abbreviate":"","addTime":1255936066000,"categoryName":"代谢科","depth":2,"iD":8,"orderBy":0,"parentID":1,"path":"1/8"},
	{"abbreviate":"","addTime":1255936066000,"categoryName":"代谢性疾病","depth":3,"iD":9,"orderBy":0,"parentID":8,"path":"1/8/9"},
	{"abbreviate":"","addTime":1255936066000,"categoryName":"泌尿外科","depth":2,"iD":10,"orderBy":0,"parentID":1,"path":"1/10"},
	{"abbreviate":"","addTime":1255936066000,"categoryName":"泌尿生殖系先天性畸形","depth":3,"iD":11,"orderBy":0,"parentID":10,"path":"1/10/11"},
	{"abbreviate":"","addTime":1255936066000,"categoryName":"泌尿系先天性畸形","depth":4,"iD":12,"orderBy":0,"parentID":11,"path":"1/10/11/12"},
	{"abbreviate":"","addTime":1255936066000,"categoryName":"肾盂异常","depth":5,"iD":13,"orderBy":0,"parentID":12,"path":"1/10/11/12/13"},

	{"abbreviate":"","addTime":1255936066000,"categoryName":"儿科","depth":2,"iD":14,"orderBy":0,"parentID":2,"path":"1/14"},
	{"abbreviate":"","addTime":1255936066000,"categoryName":"小儿循环系统疾病","depth":3,"iD":15,"orderBy":0,"parentID":2,"path":"1/14/15"},
	{"abbreviate":"","addTime":1255936066000,"categoryName":"血液系统疾病","depth":3,"iD":16,"orderBy":0,"parentID":3,"path":"1/14/16"},
	{"abbreviate":"","addTime":1255936066000,"categoryName":"泌尿系统疾病","depth":3,"iD":17,"orderBy":0,"parentID":3,"path":"1/14/17"},
	{"abbreviate":"","addTime":1255936066000,"categoryName":"神经精神系统疾病","depth":3,"iD":18,"orderBy":0,"parentID":3,"path":"1/14/18"}
];

data.tableHeadData=[

	{
		title:"编号"
		,name:""
		,width:100
		,valign:"middle"
		,renderer:function(name,rowIndex,rowData){
			return '<div class="fixedCell">'+(rowIndex+1+(currentPage-1)*pageSize)+'</div>';
		}
	},{
		title:"ID"
		,name:"id"
		,width:48
		,align:"center"
		,valign:"middle"
		,renderer:function(name,rowIndex,rowData){
			return rowData[name];
		}
	},{
		title:"审核状态"
		,name:"flagOfSh"
		,width:100
		,align:"center"
		,valign:"middle"
		,renderer:function(name,rowIndex,rowData){
			if(rowData[name]=="1"){
				return "审核通过";
			}else if(rowData[name]=="2"){
				return "审核未通过";
			}else{
				return "未审核";
			}	    			
		}
	},{
		title:"审核未通过原因"
		,name:"reason"
		,width:200
		,align:"center"
		,valign:"middle"
	},{
		title:"姓名"
		,name:"name"
		,width:72
		,align:"center"
		,valign:"middle"
	},{
		title:"性别"
		,name:"gender"
		,width:48
		,align:"center"
		,valign:"middle"
	},{
		title:"年龄"
		,name:"age"
		,width:60
		,align:"center"
	},{
		title:"证件号码"
		,name:"cardNum"
		,width:100
		,align:"center"
		,valign:"middle"
	},{
		title:"民族"
		,name:"nation"
		,width:72
		,align:"center"
		,valign:"middle"
	},{
		title:"手机号"
		,name:"mobileNum"
		,width:100
		,align:"center"
		,valign:"middle"
	},{
		title:"邮箱"
		,name:"email"
		,width:120
		,align:"center"
		,valign:"middle"
	},{
		title:"学员类型"
		,name:"studentType"
		,width:100
		,align:"center"
		,renderer:function(name,rowIndex,rowData){

			return rowData[name];
		}
	},{
		title:"毕业院校（本科）"
		,name:"school"
		,width:150
		,align:"center"
		,renderer:function(name,rowIndex,rowData){
			return rowData[name];
		}
	},{
		title:"操作"
		,name:""
		,width:150
		,align:"center"
		,renderer:function(name,rowIndex,rowData){

			return '<a data-tooltip="删除第'+(rowIndex+1)+'行"'+' class="btn delete elf-tooltip-left">删除</a> <button class="edit">编辑</button>'
		}
	}
];
