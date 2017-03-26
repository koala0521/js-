;(function(){
	
	var treeMenuWarp,treeData,menu;
	
	treeData = data.treeData;
	
	treeMenuWarp = Elf.controls.createElement('div','hfull treeMenu');
	
	//点击事件
	Elf.components.accordionNav.defaults.onClick=function(e){
		
		console.info(e.key);
	
	};	
	//树形菜单实例
	menu = Elf.components.accordionNav({
				store:treeData,
				key:"iD",
				nameKey:"categoryName",
				parentKey:"parentID",
				autoOpen:false,
				currentId:"1",
				target:treeMenuWarp
			});

	Elf.controls.appendTo( treeMenuWarp,document.body );		
	

	
})();
