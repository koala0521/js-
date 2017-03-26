;(function(){

	var header,headertable,headertable,p1,userInfo,userName,logOut;

	header = Elf.controls.createElement('div','full header');
	headertable = Elf.controls.createElement('div','full prl24');
	logo = Elf.controls.createElement('h1','logo fl col-xs-7');
	loginfo = Elf.controls.createElement('div','logInfo full vam tar fr col-xs-5');
	p1 = Elf.controls.createElement('p','');
	userInfo = Elf.controls.createElement('p','userInfo');
	userName = Elf.controls.createElement('span','userName b ml4');
	logOut = Elf.controls.createElement('a','logOut ml4');
	
	userName.innerHTML = '测试账号';
	logOut.innerHTML = '退出';
	logOut.href = 'login.html';
	p1.innerHTML = '<span class="ml4" >您好！</span><span class="ml4 b" >国家卫生和计划生育委员会</span><span class="ml4" >欢迎登录系统</span>';
	userInfo.innerHTML = '<span class="ml4" >您的角色是</span>';
	logo.innerHTML = '住培360评估系统';
	
	Elf.controls.appendTo(userName,userInfo);
	Elf.controls.appendTo(logOut,userInfo);
	Elf.controls.appendTo( p1 , loginfo );
	Elf.controls.appendTo( userInfo , loginfo );
	Elf.controls.appendTo( logo , headertable );	
	Elf.controls.appendTo( loginfo , headertable );
	Elf.controls.appendTo( headertable , header );			
	Elf.controls.appendTo( header,document.body );	


})()
	