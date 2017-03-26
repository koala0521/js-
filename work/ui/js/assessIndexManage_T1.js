/**
 * [assessment_T1 description]
 * @Author   liweiliang  QQ:406320591(406320591@QQ.com).
 * @DateTime 2017-02-27.
 * @version  1.0                                [description]
 */

assessment.indexManage_T1 = function(data){
	page.layout.centerRegion.innerHTML="";
	var fbar=Elf.controls.createElement("div", "elf-fbar large");
	var pagingBox=Elf.controls.createElement("div", "pt16");
	Elf.controls.appendTo(pagingBox,fbar);
	var tbar=Elf.controls.createElement("div", "elf-tbar large prl10");
	var title=Elf.controls.createElement("h1","tac assessTit",{innerHTML:"带教老师对住院医师的评估"});
	Elf.controls.appendTo(title, tbar);
	var content = Elf.controls.createElement("div", "elf-content prl24");
	var contentBody=Elf.controls.createElement("div", "elf-content-body");
	Elf.controls.appendTo(contentBody, content);
	Elf.controls.appendTo(fbar,page.layout.centerRegion);
	Elf.controls.appendTo(tbar,page.layout.centerRegion);
	Elf.controls.appendTo(content,page.layout.centerRegion);
	loadTemplet("templates/assessindexManage_T1.html",function(templet) {
		assessment.assessindexManage_T1_Form=Elf.controls.createElement("form");
		var doc = Elf.utils.perser(templet, "text/html");
		var _df = Elf.utils.toDocumentFragment(doc.body);
		Elf.controls.appendTo(_df,assessment.assessindexManage_T1_Form);
		Elf.controls.appendTo(assessment.assessindexManage_T1_Form,contentBody);
	});
};