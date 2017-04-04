var gridData = [
	
	{
		title:"基地名称",
		name:"",
		width:100,
		align:"center",
		fixedColumn:false,
		checkCol:false,
		valign:"middle",
		renderer:function(name,rowIndex,rowData){
		
			return rowData.yiyuanname;
		}
	}
	,{
		title:"密码",
		name:"",
		width:150,
		align:"center",
		fixedColumn:false,
		valign:"middle",
		renderer:function(name,rowIndex,rowData){
	
			return "******" ;
		}
	}
	,{
		title:"批次",
		name:"",
		width:100,
		align:"center",
		fixedColumn:false,
		valign:"middle",
		renderer:function(name,rowIndex,rowData){
		
			//rowData.pici
			return "第一批";
	
		}
	}
	,{
		title:"备注",
		name:"",
		width:100,
		align:"center",
		renderer:function(name,rowIndex,rowData){	    			
			
			return "我是备注";
			
		}
	}
	,{
		title:"操作",
		name:"",
		width:80,
		align:"center",
		renderer:function(name,rowIndex,rowData){	    			
			
			return "<a href='javascript:;' class='caozuo' >操作</a>";
				
			}
		}

];
 

//培训基地审核页面

 var data1 = [

	{
		title:"编号",
		name:"",
		width:48,
		align:"center",
		fixedColumn:true,
		checkCol:true,
		valign:"middle",
		renderer:function(name,rowIndex,rowData){
			return '<div class="fixedCell">'+ (rowIndex+1) +'</div>';
		}
	},
	{
		title:"审核状态",
		name:"我是aaa",
		width:48,
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
		width:48,
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
		width:48,
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

			return rowData.name;
			
		}
	}
	,{
		title:"联系人",
		name:"",
		width:100,
		align:"center",
		renderer:function(name,rowIndex,rowData){	    			
			
			return rowData.name;
			
		}	    		
		
	}
	
	,{
		title:"联系电话",
		name:"",
		width:100,
		align:"center",
		renderer:function(name,rowIndex,rowData){	    			
			
			return rowData.mobileNum;
			
		}	    		
		
	}
	
	,{
		title:"基地申报表",
		name:"",
		width:100,
		align:"center",
		renderer:function(name,rowIndex,rowData){	    			
			
			var str = "<a class='open-grid2 prl12' href='javascript:;'>表2</a><a  class='open-grid3 prl12' href='javascript:;'>表3</a>";
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

 		
//专业科室审核页面

var data2 = [

    	{
    		title:"编号",
		name:"",
		width:48,
		align:"center",
		fixedColumn:true,
		checkCol:true,
		valign:"middle",
		renderer:function(name,rowIndex,rowData){
			return '<div class="fixedCell">'+ (rowIndex+1) +'</div>';
		}
	},
	{
		title:"审核状态",
		name:"我是aaa",
		width:48,
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
		width:48,
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
		width:48,
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

//协同单位审核页面
var data3 = [	    	
	{
		title:"编号",
		name:"",
		width:48,
		align:"center",
		fixedColumn:true,
		checkCol:true,
		valign:"middle",
		renderer:function(name,rowIndex,rowData){
			return '<div class="fixedCell">'+ (rowIndex+1) +'</div>';
		}
	},
	{
		title:"审核状态",
		name:"我是aaa",
		width:48,
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
		width:48,
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
		width:48,
		align:"center",
		fixedColumn:false,
		valign:"middle",
		renderer:function(name,rowIndex,rowData){
		

			return rowData.yiyuanname;

		}
	}
	,{
		title:"协同单位1",
		name:"",
		width:100,
		align:"center",
		renderer:function(name,rowIndex,rowData){	    			
			//接受一个数组，循环生成协同单位
			var str = "<div><a href='javascript:;'>"+ rowData.name  +"</a></div><div><a href='javascript:;'>"+ rowData.name  +"</a></div>";
			return str;
			
		}
	}
	,{
		title:"协同单位2",
		name:"",
		width:80,
		align:"center",
		renderer:function(name,rowIndex,rowData){	    			
			//接受一个数组，循环生成协同单位
			var str = "<div><a href='javascript:;'>"+ rowData.name  +"</a></div><div><a href='javascript:;'>"+ rowData.name  +"</a></div>";
			return str;
		}
	}
	,{
		title:"基层培养基地",
		name:"查看",
		width:80,
		align:"center",
		renderer:function(name,rowIndex,rowData){
			
			var str = "<a href='javascript:;'>"+ name  +"</a>";
			return str;
			
		}
	}

];
