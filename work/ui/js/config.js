/**
 * [config description]
 * @Author   liweiliang  QQ:406320591(406320591@QQ.com).
 * @DateTime 2017-02-21.
 * @version  1.0
 */
//菜单配置
 var sysMenu = {
 	//0 中国医师协会
 	"0":[
 	{
 		"name":"评估指标管理",
 		"id":"1",
 		"pid":"",
 		"url":""
 	},
 	{
 		"name":"带教老师评估住院医师",
 		"id":"6",
 		"pid":"1",
 		"url":"assessIndexManage_T1"
 	},
 	{
 		"name":"护理人员评估住院医师",
 		"id":"7",
 		"pid":"1",
 		"url":"assessIndexManage_T2"
 	},
 	{
 		"name":"住院医师评估带教老师",
 		"id":"8",
 		"pid":"1",
 		"url":"assessIndexManage_T3"
 	},
 	{
 		"name":"住院医师评估专业基地",
 		"id":"9",
 		"pid":"1",
 		"url":"assessIndexManage_T4"
 	},
 	// {
 	// 	"name":"专业基地评估批次设置",
 	// 	"id":"2",
 	// 	"pid":"",
 	// 	"url":""
 	// },
  //   {
  //       "name":"详情",
  //       "id":"10",
  //       "pid":"2",
  //       "url":"professEvaluationSetting"
  //   },
 	{
 		"name":"评估报告",
 		"id":"3",
 		"pid":"",
 		"url":""
 	},
 	{
 		"name":"培训基地评估报告",
 		"id":"11",
 		"pid":"3",
 		"url":"trainAssessmentReport_T1"
 	},
 	{
 		"name":"专业基地评估报告",
 		"id":"12",
 		"pid":"3",
 		"url":"ProfessionAssessmentReport_T2"
 	},
 	{
 		"name":"不合格指标统计",
 		"id":"4",
 		"pid":"",
 		"url":""
 	},
    {
        "name":"详情",
        "id":"13",
        "pid":"4",
        "url":"unqualifiedIndexStatistics"
    },
 	// {
 	// 	"name":"评估不合格提醒",
 	// 	"id":"5",
 	// 	"pid":"",
 	// 	"url":""
 	// },
  //   {
  //       "name":"详情",
  //       "id":"14",
  //       "pid":"5",
  //       "url":"evaluationFailedToRemind"
  //   }
 	],
 	// 1省卫计委
 	"1":[
 	{
 		"name":"评估报告",
 		"id":"1",
 		"pid":"",
 		"url":""
 	},
 	{
 		"name":"培训基地评估报告",
 		"id":"4",
 		"pid":"1",
 		"url":"province_trainAssessmentReport_T1"
 	},
 	{
 		"name":"专业基地评估报告",
 		"id":"5",
 		"pid":"1",
 		"url":"province_ProfessionAssessmentReport_T2"
 	},
 	{
 		"name":"不合格指标统计",
 		"id":"2",
 		"pid":"",
 		"url":"province_unqualifiedIndexStatistics"
 	},
    {
        "name":"详情",
        "id":"6",
        "pid":"2",
        "url":""
    },
 	{
 		"name":"评估不合格提醒",
 		"id":"3",
 		"pid":"",
 		"url":""
 	},
    {
        "name":"详情",
        "id":"7",
        "pid":"3",
        "url":"province_evaluationFailedToRemind"
    },
 	],
 	// 2培训基地
 	"2":[
 	{
 		"name":"评估批次设置",
 		"id":"1",
 		"pid":"",
 		"url":""
 	},
 	{
 		"name":"详情",
 		"id":"7",
 		"pid":"1",
 		"url":"trainBase_evaluateBatchSettings"
 	},
 	// {
 	// 	"name":"住院医师评估专业基地",
 	// 	"id":"2",
 	// 	"pid":"",
 	// 	"url":""
 	// },
 	// {
 	// 	"name":"详情",
 	// 	"id":"8",
 	// 	"pid":"2",
 	// 	"url":"trainBase_residentAssessmentProfessionalBase"
 	// },
 	{
 		"name":"评估报告",
 		"id":"3",
 		"pid":"",
 		"url":""
 	},
 	{
 		"name":"培训基地评估报告",
 		"id":"9",
 		"pid":"3",
 		"url":"trainBase_trainAssessmentReport_T1"
 	},
 	{
 		"name":"专业基地评估报告",
 		"id":"10",
 		"pid":"3",
 		"url":"trainBase_ProfessionAssessmentReport_T2"
 	},
 	{
 		"name":"不合格指标统计",
 		"id":"4",
 		"pid":"",
 		"url":""
 	},
    {
        "name":"详情",
        "id":"11",
        "pid":"4",
        "url":"trainBase_unqualifiedIndexStatistics"
    },
 	{
 		"name":"评估不合格提醒",
 		"id":"5",
 		"pid":"",
 		"url":""
 	},
    {
        "name":"详情",
        "id":"12",
        "pid":"5",
        "url":"trainBase_evaluationFailedToRemind"
    },
 	{
 		"name":"信息管理",
 		"id":"6",
 		"pid":"",
 		"url":""
 	},
 	{
 		"name":"学员信息管理",
 		"id":"13",
 		"pid":"6",
 		"url":"trainBase_studentInfoManage"
 	},
 	{
 		"name":"师资信息管理",
 		"id":"14",
 		"pid":"6",
 		"url":"trainBase_teacherInfoManage"
 	},
 	{
 		"name":"护理人员信息管理",
 		"id":"15",
 		"pid":"6",
 		"url":"trainBase_nursingStaffInfoManage"
 	}
 	],
 	// 3专业基地
 	"3":[
 	{
 		"name":"评估批次设置",
 		"id":"1",
 		"pid":"",
 		"url":""
 	},
 	{
 		"name":"详情",
 		"id":"6",
 		"pid":"1",
 		"url":"proBase_evaluateBatchSettings"
 	},
 	{
 		"name":"住院医师评估专业基地",
 		"id":"2",
 		"pid":"",
 		"url":""
 	},
    {
        "name":"详情",
        "id":"7",
        "pid":"2",
        "url":"proBase_residentAssessmentProfessionalBase"
    },
 	{
 		"name":"评估报告",
 		"id":"3",
 		"pid":"",
 		"url":""
 	},
 	{
 		"name":"培训基地评估报告",
 		"id":"8",
 		"pid":"3",
 		"url":"proBase_trainAssessmentReport_T1"
 	},
 	{
 		"name":"专业基地评估报告",
 		"id":"9",
 		"pid":"3",
 		"url":"proBase_ProfessionAssessmentReport_T2"
 	},
 	{
 		"name":"评估不合格提醒",
 		"id":"4",
 		"pid":"",
 		"url":""
 	},
    {
        "name":"详情",
        "id":"9",
        "pid":"4",
        "url":"proBase_evaluationFailedToRemind"
    },
 	{
 		"name":"信息管理",
 		"id":"5",
 		"pid":"",
 		"url":""
 	},
 	{
 		"name":"学员信息管理",
 		"id":"10",
 		"pid":"5",
 		"url":"proBase_studentInfoManage"
 	},
 	{
 		"name":"师资信息管理",
 		"id":"11",
 		"pid":"5",
 		"url":"proBase_teacherInfoManage"
 	},
 	{
 		"name":"护理人员信息管理",
 		"id":"12",
 		"pid":"5",
 		"url":"proBase_nursingStaffInfoManage"
 	}
 	]
 };

 /**
 * 用户基本信息
 * @type {{token: string}}
 */
 var User = {
    token: "-1",
    info:{}
};
/**
 * 服务信息
 * @type {{serviceModule: string}}
 */
 var serviceInfo = {
    serviceModule: "CAS"
};
/**
 * 静态数据  判断是点击省平分管理还是基地平分管理
 * @type {{}}
 */
 var DataConfig={
    roleNames:{
        "0": "中国医师协会",
        "1": "省卫计委",
        "2": "培训基地",
        "3": "专业基地"
    },
    province:{
        "110000":"北京市",
        "120000":"天津市",
        "130000":"河北省",
        "140000":"山西省",
        "150000":"内蒙古自治区",
        "210000":"辽宁省",
        "220000":"吉林省",
        "230000":"黑龙江省",
        "310000":"上海市",
        "320000":"江苏省",
        "330000":"浙江省",
        "340000":"安徽省",
        "350000":"福建省",
        "360000":"江西省",
        "370000":"山东省",
        "410000":"河南省",
        "420000":"湖北省",
        "430000":"湖南省",
        "440000":"广东省",
        "440300":"深圳市",
        "450000":"广西壮族自治区",
        "460000":"海南省",
        "500000":"重庆市",
        "510000":"四川省",
        "520000":"贵州省",
        "530000":"云南省",
        "540000":"西藏自治区",
        "610000":"陕西省",
        "620000":"甘肃省",
        "630000":"青海省",
        "640000":"宁夏回族自治区",
        "650000":"新疆维吾尔自治区",
        "660000":"兵团",
        "710000":"台湾省",
        "810000":"香港特别行政区",
        "820000":"澳门特别行政区"
    },
    majorCode:{
        "0100":"内科",
        "0200":"儿科",
        "0300":"急诊科",
        "0400":"皮肤科",
        "0500":"精神科",
        "0600":"神经内科",
        "0700":"全科",
        "0800":"康复医学科",
        "0900":"外科",
        "1000":"外科（神经外科方向）",
        "1100":"外科（胸心外科方向）",
        "1200":"外科（泌尿外科方向）",
        "1300":"外科（整形外科方向）",
        "1400":"骨科",
        "1500":"儿外科",
        "1600":"妇产科",
        "1700":"眼科",
        "1800":"耳鼻咽喉科",
        "1900":"麻醉科",
        "2000":"临床病理科",
        "2100":"检验医学科",
        "2200":"放射科",
        "2300":"超声医学科",
        "2400":"核医学科",
        "2500":"放射肿瘤科",
        "2600":"医学遗传科",
        "2700":"预防医学科",
        "2800":"口腔全科",
        "2900":"口腔内科",
        "3000":"口腔颌面外科",
        "3100":"口腔修复科",
        "3200":"口腔正畸科",
        "3300":"口腔病理科",
        "3400":"口腔颌面影像科",
        "3500":"中医科",
        "3600":"中医全科"
    }
};
var Config = {
	environment: "debug"//config for local debug
    // environment:"release"//config for release test
    //environment:"produce"//config for produce
    // environment:"oss"//config for oss
    //environment:"oss826"//config for oss
}
switch (Config.environment){
    case "debug":
        Config.busUrl = "http://" + "192.168.1.25:5005" + "/services";
        Config.logOutUrl = "login.html";
        Config.uploader = {
            action:"http://192.168.8.155:8081/servicesGp2016",//本地上传接口用来上传Excel文档，批量导入
            exportUrl: "http://192.168.1.25:2020/rcp-util",
            service: "http://192.168.1.25:5005/services",
            bucketName: "mvw-develop",
            basePath: "gp-test",
            token: "a9fc46ef-c73d-4c64-ad2c-7fdb5891b73f&type=mobile&p0latform=android"
        };
        break;
        case "release":
        Config.busUrl = "http://" + "192.168.1.25:5005" + "/services";
        Config.logOutUrl = "/";
        Config.uploader = {
            action:"http://192.168.1.25:2020/rcp-util/servicesGp2016",//本地上传接口用来上传Excel文档，批量导入
            exportUrl: "http://192.168.1.25:2020/rcp-util",
            service: "http://192.168.1.25:5005/services",
            bucketName: "mvw-develop",
            basePath: "gp-test",
            token: "a9fc46ef-c73d-4c64-ad2c-7fdb5891b73f&type=mobile&p0latform=android"
        };
        break;
        case "oss":
        Config.busUrl = "http://" + "123.56.20.80" + "/services";
        Config.logOutUrl = "/";
        Config.uploader = {
            action:"http://123.56.20.80:8200/rcp-util/servicesGp2016",//本地上传接口用来上传Excel文档，批量导入
            exportUrl: "http://123.56.20.80:8200/rcp-util",
            service: "http://123.56.20.80/services",
            bucketName: "ccgme-gp",
            basePath: "uploads",
            token: "a9fc46ef-c73d-4c64-ad2c-7fdb5891b73f&type=mobile&p0latform=android"
        };
        break;
        default :
        break;
    }