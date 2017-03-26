function showLoading(){
	Elf.components.loading();
	setTimeout(
		function(){Elf.components.loading("close");
	},5000);
}
function showConfirm(){
	Elf.components.confirm({
		title:"温馨提示",
		text:"这是提示信息",
		modle:false,
		buttons:{
			"确定":function(){
				console.info("确定 clicked 1");
			},
			"取消":function(){
				console.info("取消 clicked");
			}
		}
	});
}