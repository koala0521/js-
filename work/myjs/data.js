//中医项目省级医院
var provinceData = {};

var currentPage = 1,
	pageSize = 5;
	
provinceData.numbersP = 3;	//假数据

//用户管理页面 表格主体	假数据
provinceData.tableBodyData = [

	[
	
		{
			title:"山西市中医管理局"
			,name:""
			,width:100
			,valign:"middle"
			,renderer:function(name,rowIndex,rowData){
				return '<div class="fixedCell">'+(rowIndex+1+(currentPage-1)*pageSize)+'</div>';
			}
		},{
			title:"3455568"
			,name:"id"
			,width:100
			,align:"center"
			,valign:"middle"
			,renderer:function(name,rowIndex,rowData){
				return rowData[name];
			}
		},{
			title:"1"
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
			title:"备注"
			,name:"reason"
			,width:200
			,align:"center"
			,valign:"middle"
		},{
			title:"操作"
			,name:"name"
			,width:72
			,align:"center"
			,valign:"middle"
		}
	
	],[
	
		{
			title:"北京市中医管理局"
			,name:""
			,width:100
			,valign:"middle"
			,renderer:function(name,rowIndex,rowData){
				return '<div class="fixedCell">'+(rowIndex+1+(currentPage-1)*pageSize)+'</div>';
			}
		},{
			title:"123345634"
			,name:"id"
			,width:100
			,align:"center"
			,valign:"middle"
			,renderer:function(name,rowIndex,rowData){
				return rowData[name];
			}
		},{
			title:"1"
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
			title:"备注"
			,name:"reason"
			,width:200
			,align:"center"
			,valign:"middle"
		},{
			title:"操作"
			,name:"name"
			,width:72
			,align:"center"
			,valign:"middle"
		}	
		
	],[
	
		{
		title:"河北市中医管理局"
		,name:""
		,width:100
		,valign:"middle"
		,renderer:function(name,rowIndex,rowData){
			return '<div class="fixedCell">'+(rowIndex+1+(currentPage-1)*pageSize)+'</div>';
		}
	},{
		title:"85747363"
		,name:"id"
		,width:100
		,align:"center"
		,valign:"middle"
		,renderer:function(name,rowIndex,rowData){
			return rowData[name];
		}
	},{
		title:"1"
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
		title:"备注"
		,name:"reason"
		,width:200
		,align:"center"
		,valign:"middle"
	},{
		title:"操作"
		,name:"name"
		,width:72
		,align:"center"
		,valign:"middle"
	}	
	
	]

];


//申报审核 > 培训基地审核页面表格数据

provinceData.hospCols=[   //生成表格头部结构数据,一个对象表示表头的一列
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

//********************

   var data3 = [

    	{
    		title:"编号",
		name:"",
		width:48,
		align:"center",
		fixedColumn:true,
		checkCol:false,
		valign:"middle",
		renderer:function(name,rowIndex,rowData){
			return '<div class="fixedCell">全选</div>';
		}
	},
	{
		title:"审核状态",
		name:"我是aaa",
		width:100,
		align:"center",
		fixedColumn:false,
		checkCol:false,
		valign:"middle",
		renderer:function(name,rowIndex,rowData){
			
			return (rowData.zt) ? '已通过':'未通过';
		}
	}
	,{
		title:"修改状态",
		name:"",
		width:150,
		align:"center",
		fixedColumn:false,
		valign:"middle",
		renderer:function(name,rowIndex,rowData){

			var str1 = rowData.xgzt ? 'checked="checked" ' : 'disabled="disabled" ';

			var str2 = rowData.xgzt ? 'disabled="disabled" ' : 'checked="checked" ';

			return '<label><input name="zt'+ rowData.id +'" type="radio" '+  str1 +' />可修改</label><label><input name="'+ rowData.id +'" type="radio"  '+  str2 +'  />不可修改 </label>' ;
		}
	}
	,{
		title:"培训基地（医院）名称",
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
		title:"专业基地（科室）",
		name:"",
		width:100,
		align:"center",
		renderer:function(name,rowIndex,rowData){	    			
			
			var str = "<a href='javascript:;'>"+ rowData.name  +"</a>";
			return str;
			
		}
	}
	,{
		title:"上报时间",
		name:"",
		width:80,
		align:"center",
		renderer:function(name,rowIndex,rowData){	    			
			
			return rowData.startTime;
			
		}
	}

];
	