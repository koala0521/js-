;(function(){
	
	var content,contentTable,infoTable,tableHead,tHeadData,currentPage,pageSize;
	
	currentPage = data.currentPage;    //当前页码
	pageSize = data.pageSize;       //一页显示的学生信息数量
	tHeadData = data.tableHeadData;
	
	function createTHead( data ){
		
		var tHeadBox = Elf.controls.createElement( 'div','wfull tHeadBox' );
		var table = Elf.controls.createElement( 'table','wfull' );
		var thead = Elf.controls.createElement( 'thead','wfull' );
		var tr = Elf.controls.createElement( 'tr','wfull' );
		var str = '';
		for (var i = 0; i < data.length; i++) {
			
			str += '<th style="width:'+ data[i].width +'px;" >'+ data[i].title + '</th>'; 
			
		}		
		tr.innerHTML = str;
		Elf.controls.appendTo( tr , thead );
		Elf.controls.appendTo( thead , table );
		Elf.controls.appendTo( table , tHeadBox );
		Elf.controls.appendTo( tHeadBox , infoTable );
	}
	
	content = Elf.controls.createElement( 'div','content hfull' );
	contentTable = Elf.controls.createElement( 'div','contentTable hfull p24' );
	infoTable = Elf.controls.createElement( 'div','infoTable' );
	turnPage = Elf.controls.createElement( 'div','turnPage wfull' );		

	Elf.controls.appendTo( infoTable , contentTable );
	Elf.controls.appendTo( turnPage , infoTable );	
	Elf.controls.appendTo( contentTable , content );
	Elf.controls.appendTo( content , document.body );
	
	createTHead( tHeadData );

	
	
})()
