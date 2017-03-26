/**
 * [assessment_T4 description]
 * @Author   liweiliang  QQ:406320591(406320591@QQ.com).
 * @DateTime 2017-02-27.
 * @version  1.0                                [description]
 */
assessment.indexManage_T4 = function(){
	page.layout.centerRegion.innerHTML="";
	var fbar=Elf.controls.createElement("div", "elf-fbar large");
	var pagingBox=Elf.controls.createElement("div", "pt16");
	Elf.controls.appendTo(pagingBox,fbar);
	var tbar=Elf.controls.createElement("div", "elf-tbar large prl10");
	var title=Elf.controls.createElement("h1","tac assessTit",{innerHTML:"住院医师评估专业基地"});
	Elf.controls.appendTo(title, tbar);
	var content = Elf.controls.createElement("div", "elf-content prl24");
	var contentBody=Elf.controls.createElement("div", "elf-content-body");
	Elf.controls.appendTo(contentBody, content);
	Elf.controls.appendTo(fbar,page.layout.centerRegion);
	Elf.controls.appendTo(tbar,page.layout.centerRegion);
	Elf.controls.appendTo(content,page.layout.centerRegion);
	loadTemplet("templates/assessindexManage_T4.html",function(templet) {
		assessment.assessindexManage_T4_Form=Elf.controls.createElement("form");
		var doc = Elf.utils.perser(templet, "text/html");
		var _df = Elf.utils.toDocumentFragment(doc.body);
		Elf.controls.appendTo(_df,assessment.assessindexManage_T4_Form);
		Elf.controls.appendTo(assessment.assessindexManage_T4_Form,contentBody);
	});
};