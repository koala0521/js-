/**
 * [global description]
 * @Author   liweiliang  QQ:406320591(406320591@QQ.com).
 * @DateTime 2017-02-21.
 * @version  1.0
 */
 var page = {};
 function signOnLoad(){
    var testBrowser=window.Elf && Elf.isBrowserSupported;
    if(!testBrowser){
        window.location.href="../../../../unsupport/unsupported1.html";
    }
    else{
        var token=Elf.utils.getParam("token");
        if(Elf.utils.isEmpty(token)){
            showLogin();
        }else{
            // getUserByToken(token);
            // 假数据star
            // roleType控制sysMenu数组菜单
            // fType 数组惨淡中的第几个菜单选择
            User.token=token;
            User.info={
                fixedProvince:36,
                fName:"国家卫生和计划生育委员会",
                fType:"0",
                provinceName:"北京市",
                roleName:"培训基地",
                roleType:"2"
            };
            initPage();
            // 假数据end
        }
    }
}
function onLoaded(){
    var testBrowser=window.Elf && Elf.isBrowserSupported;
    if(!testBrowser){
        window.location.href="../../../../unsupport/unsupported1.html";
    }else{
        var token=Elf.utils.getParam("token");
        if(Elf.utils.isEmpty(token)){
            window.location.href = "login.html";
            // showLogin();
        }else{
            // getUserByToken(token);
            // 假数据star
            User.token=token;
            User.info={
                fixedProvince:36,
                fName:"国家卫生和计划生育委员会",
                fType:"0",
                provinceName:"北京市",
                roleName:"培训基地",
                roleType:"2"
            };
            initPage();
            // 假数据end
        }
    }
}
function getUserByToken(token){
    User.token=token;
    var service = {
        serviceModule:serviceInfo.serviceModule,
        serviceNumber:'validateToken',
        token:User.token,
        args:{
            token:User.token
        }
    };
    commonLogic.serviceCaller(service,function(data){
        if (data.result == "true"){
            var senddata = {
                serviceModule:serviceInfo.serviceModule,
                serviceNumber:'getUserInfoByToken',
                token:User.token,
                args:{
                    token:User.token
                }
            };
            commonLogic.serviceCaller(senddata,function(data){
                if(data.flag == "true"){
                   var dataObj =  data.data.userInfo;
                   User.info=dataObj;
                   User.info.roleName = DataConfig.roleNames[User.info.fType];
                   User.info.provinceName=DataConfig.province[User.info.fProvince];
                   User.info.roleType=User.info.fType;
                   initPage();
               }
           });

        } else {
            User.token=-1;
            Elf.components.toast({text:data.errorMessage});
            setTimeout('window.location.href = "login.html"',1000);
            // showLogin();
        }
    });
}

function createLoginWin(){
    var loginForm=Elf.controls.createElement("form","login-form noselect");
    var formPanel=Elf.controls.createElement("div","prl60 pt16");
    var tableCells=Elf.components.cells({cols:[{className:"vam ptb6 tar"},{className:"vam tal ptb6"}],rows:3,target:formPanel});
    var uNameLable=Elf.controls.createElement("label",{innerHTML:"用户名："});
    var uPwdLable=Elf.controls.createElement("label",{innerHTML:"密码："});
    var uNameTypeIn=Elf.controls.createElement("input","wfull",{type:"text",name:"userName",placeholder:"输入用户名",required:"required"});
    var uPwdTypeIn=Elf.controls.createElement("input","wfull",{type:"password",name:"password",placeholder:"输入密码",required:"required"});
    var loginSubmitBtn=Elf.controls.createElement("input","login_btn mt10",{type:"submit",value:"登录"});
    Elf.controls.appendTo(uNameLable,tableCells.rows[0][0]);
    Elf.controls.appendTo(uNameTypeIn,tableCells.rows[0][1]);
    Elf.controls.appendTo(uPwdLable,tableCells.rows[1][0]);
    Elf.controls.appendTo(uPwdTypeIn,tableCells.rows[1][1]);
    Elf.controls.appendTo(loginSubmitBtn,tableCells.rows[2][1]);
    Elf.controls.appendTo(formPanel,loginForm);
    var loginElement = document.getElementById("login");
    Elf.controls.appendTo(loginForm,loginElement);
    Elf.xEvents.bind(loginForm,"submit",function(evt){
        evt.preventDefault();
        window.location.href = "index.html?token=56fc81e5191d4e58aebafbbe1b79dcfd";
        // 正式环境切换Switch formal 
       //  var formData=Elf.utils.serializeObject(loginForm);
       //  var args=formData;
       //  var service = {
       //      serviceModule:serviceInfo.serviceModule,
       //      serviceNumber:'login',
       //      token:User.token,
       //      args:args
       //  };
       //  commonLogic.serviceCaller(service,function(data){
       //      if (data.result == "true"){
       //          User.token=data.token;
       //          var jumpUrl = "index.html"+"?token=" + User.token;
       //          window.location.href = jumpUrl;
       //     }else{
       //         Elf.components.toast({text:data.errorMessage});
       //     }
       // });
   });
    return loginForm;
}


function showLogin(){
    if(!page.loginWin){
        page.loginWin=createLoginWin();
    }
    // page.popWin=Elf.components.pop({
    //     closeable:false,
    //     closeInContent:true,
    //     onCloseDestroy:false,
    //     content:page.loginWin
    // });
}


//初始化页面
function initPage(){
    //菜单点击统一处理事件
    Elf.components.accordionNav.defaults.onClick = function(e){
        switch (e.ownData.url){
            /*********************中国医师协会 begin*************************/
            // 带教老师评估住院医师
            case "assessIndexManage_T1":
            assessment.initAssessmentIndexManage_T1();
            // stateOD.initPlanAndActualBS();
            // Elf.components.toast({text:"此模块正在开发中..."});
            break;
            // 护理人员评估住院医师
            case "assessIndexManage_T2":
            assessment.initAssessmentIndexManage_T2();
            // Elf.components.toast({text:"此模块正在开发中..."});
            break;
            // 住院医师评估带教老师
            case "assessIndexManage_T3":
            assessment.initAssessmentIndexManage_T3();
            // Elf.components.toast({text:"此模块正在开发中..."});
            break;
            // 住院医师评估专业基地
            case "assessIndexManage_T4":
            assessment.initAssessmentIndexManage_T4();
            // Elf.components.toast({text:"此模块正在开发中..."});
            break;
            // 专业基地评估批次设置
            case "professEvaluationSetting":
            Elf.components.toast({text:"此模块正在开发中..."});
            break;
            // 培训基地评估报告
            case "trainAssessmentReport_T1":
            assessReport.initAssessReport_T1();
            // Elf.components.toast({text:"此模块正在开发中..."});
            break;
            // 专业基地评估报告
            case "ProfessionAssessmentReport_T2":
            // assessReport.initAssessReport_T2();
            Elf.components.toast({text:"此模块正在开发中..."});
            break;
            // 不合格指标统计
            case "unqualifiedIndexStatistics":
            Elf.components.toast({text:"此模块正在开发中..."});
            break;
            // 评估不合格提醒
            case "evaluationFailedToRemind":
            Elf.components.toast({text:"此模块正在开发中..."});
            break;
            // 修改密码
            case "modifyPassword":
            Elf.components.toast({text:"此模块正在开发中..."});
            break;
            /*********************中国医师协会 end*************************/




            /*********************培训基地 begin***************************/

            // 2培训基地权限 评估批次设置
            case "trainBase_evaluateBatchSettings":
            Elf.components.toast({text:"此模块正在开发中..."});
            break;

            // 2培训基地权限 住院医师评估专业基地
            case "trainBase_residentAssessmentProfessionalBase":
            Elf.components.toast({text:"此模块正在开发中..."});
            break;

            // 2培训基地权限 培训基地评估报告
            case "trainBase_trainAssessmentReport_T1":
            trainBase_AssessReport.initAssessReport_T1();
            // Elf.components.toast({text:"此模块正在开发中..."});
            break;

            // 2培训基地权限 专业基地评估报告
            case "trainBase_ProfessionAssessmentReport_T2":
            Elf.components.toast({text:"此模块正在开发中..."});
            break;

            // 2培训基地权限 不合格指标统计
            case "trainBase_unqualifiedIndexStatistics":
            Elf.components.toast({text:"此模块正在开发中..."});
            break;

            // 2培训基地权限 评估不合格提醒
            case "trainBase_evaluationFailedToRemind":
            Elf.components.toast({text:"此模块正在开发中..."});
            break;

            // 2培训基地权限 学员信息管理
            case "trainBase_studentInfoManage":
            Elf.components.toast({text:"此模块正在开发中..."});
            break;

            // 2培训基地权限 师资信息管理
            case "trainBase_teacherInfoManage":
            Elf.components.toast({text:"此模块正在开发中..."});
            break;

            // 2培训基地权限 护理人员信息管理
            case "trainBase_nursingStaffInfoManage":
            Elf.components.toast({text:"此模块正在开发中..."});
            break;
            /*********************培训基地 end*****************************/
            
            default :
            Elf.components.toast({text:"此模块没有配置"});
            break;
        }        
    };
    //创建视图
    page.layout=createLayout();
    //创建头部
    Elf.controls.appendTo(createHeader(),page.layout.topRegion);
    switch (User.info.fType+""){        
        case "0":
        createMainMenus(User.info.roleType,1);
        break;
        case "1":
        createMainMenus(User.info.roleType,3);
        break;
        default :
        break;
    }

}

//创建页面布局
function createLayout(){
    return Elf.layout.fixed({
        flow:"clomn",
        top:{height:"75px"},
        left:{ width:"240px"}
    });
}
//创建头部
function createHeader(){
    var fragment=document.createDocumentFragment();
    var header=Elf.controls.createElement("header","full");
    var headerBg=Elf.controls.createElement("div","bg");
    Elf.controls.appendTo(headerBg,header);
    var tableCells=Elf.components.cells({cols:[{className:"vam"},{className:"vam tar"}],target:header});
    Elf.utils.addClass(tableCells,"full prl24");
    //logo
    var headLogo=Elf.controls.createElement("h1","logo",{innerHTML:"住培360评估系统"});
    Elf.controls.appendTo(headLogo,tableCells.rows[0][0]);
    //User info
    var userinfo=Elf.controls.createElement("div","user-info");
    var p1=Elf.controls.createElement("p");
    Elf.controls.appendTo(Elf.controls.createElement("span","ml4",{innerHTML:"您好！"}),p1);
    Elf.controls.appendTo(Elf.controls.createElement("b","ml4",{innerHTML:User.info.fName}),p1);
    Elf.controls.appendTo(Elf.controls.createElement("span","ml4",{innerHTML:"欢迎登录系统"}),p1);
    var p2=Elf.controls.createElement("p");
    Elf.controls.appendTo(Elf.controls.createElement("span","ml4",{innerHTML:"您的角色是"}),p2);
    Elf.controls.appendTo(Elf.controls.createElement("b","ml4",{innerHTML:User.info.roleName}),p2);
    Elf.controls.appendTo(Elf.controls.createElement("a","ml4",{href:Config.logOutUrl,innerHTML:"退出"}),p2);
    Elf.controls.appendTo(p1,userinfo);
    Elf.controls.appendTo(p2,userinfo);
    Elf.controls.appendTo(userinfo,tableCells.rows[0][1]);
    Elf.controls.appendTo(header,fragment);
    return fragment;
}
function createMainMenus(utype,cid){
    if(Elf.utils.isEmpty(utype+"")){
        Elf.components.toast({text:"请先登录！"});
        return;
    }
    Elf.components.accordionNav({
        store:sysMenu[utype],
        key:"id",
        nameKey:"name",
        parentKey:"pid",
        currentId:cid,
        vie:true,
        autoOpen:false,
        target:page.layout.leftRegion
    });
}
function loadTemplet(url,callback){
    Elf.components.ajax({
        url:url,
        dataType:"html",
        beforeSend:function(xhr){
            Elf.components.loading();
        },
        complete:function(xhr){
            Elf.components.loading("close");
        },
        success:function(data){
            callback.call(this,data);
        },
        error:function(xhr){
            //console.info(xhr);
        }
    });
}
