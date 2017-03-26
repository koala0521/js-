
/*
 * Created by lijianwei on 2016/5/13.
 * loading组件
 *  Elf.components.loading(options);
 *  @parameters
 *  options
 *      width Number default 64
 *      height Number default 64
 *      bgColor String default #03b4fa
 *      type:BarChart|LineChart|PieChart|DoughnutChart  柱状图，曲线图，饼图，环形图
 *      target Element Object default document.body
 *
 **/



(function(){
    function init(target,params){
        target.templet=Elf.controls.createElement("div");
        switch (target.options.type){
            case "pie":
                target.options=initPieOptions(target.options);
                pieChart(target,params);
                break;
            case "annular":
                target.options=initPieOptions(target.options);
                annularChart(target,params);
                break;
            default:
                break;
        }
        if(target.options.target){
            target.options.target.innerHTML=target.templet.innerHTML;
        }
    }
    //初始化数据
    function initPieOptions(options){
        //初始化圆心位置
        options.ox= options.ox || options.width/2;
        options.oy= options.oy || options.height/2;
        //初始化半径
        options.radius=options.radius || (options.width <= options.height ? options.width/4:options.height/4);
        options.textRadius=options.radius+options.txtOffset;
        //计算总数
        options.total=getPieTotal(options.data);
        options.radians=[];
        options.points=[];
        options.pie=[];
        var radians=Math.PI;
        //倒叙计算，按顺时针顺序显示
        for(var index=options.data.length-1;index>=0;index--){
            var d={};
            d.baseRadians=radians;
            radians +=(Math.PI / 180) * (Math.round(360*options.data[index].value / options.total));
            d.radians=radians;
            d.txtRadians=d.baseRadians+(Math.PI / 180) * (Math.round(360*options.data[index].value / options.total))/2;
            d.xRotation = 0;
            d.largeFlag = options.data[index].value/options.total > 0.5 ? 1 : 0;
            d.sweepFlag = 1;
            d.data=options.data[index];
            d.startPoint={
                x: options.ox + options.radius * Math.sin(radians),
                y: options.oy + options.radius * Math.cos(radians)
            };
            d.endPoint={
                x: options.ox + options.radius * Math.sin(d.baseRadians),
                y: options.oy + options.radius * Math.cos(d.baseRadians)
            };
            //文本折线的起点坐标
            d.txtLineStartPoint={
                x: options.ox + options.radius * Math.sin(d.txtRadians),
                y: options.oy + options.radius * Math.cos(d.txtRadians)
            }
            //文本折线的中点左边
            d.txtLineEndPoint={
                x: options.ox + options.textRadius * Math.sin(d.txtRadians),
                y: options.oy + options.textRadius * Math.cos(d.txtRadians)
            }
            options.pie.unshift(d);
            /*options.radians.push(radians);
            options.data[index].radians=radians;*/
            options.data[index].xRotation = 0;
            options.data[index].largeFlag = options.data[index].value/options.total > 0.5 ? 1 : 0;
            options.data[index].sweepFlag = 1;
        }
        return options;
    }    
    function makeSVG(tag,ns,attrs,styles){
        var el = document.createElementNS(ns,tag);
        //设置属性
        if(typeof attrs == "object"){
            Elf.utils.each(attrs,function(key,value){
                el.setAttribute(key, value);
                /*if(key in Elf.svg.ATTR_MAP){
                    el.setAttributeNS(Elf.svg.NS_MAP[key], name, value);
                }else{
                    el.setAttribute(name, obj);
                }
                el.setAttributeNS()*/
            });
        }
        //设置样式
        if(typeof styles=="object"){
            var style="";
            Elf.utils.each(styles,function(key,value){
                style+=key+":"+value+";";
            });
            el.setAttribute("style",style);
        }
        return el;
    }
    //创建扇形区域
    function creatFanD(x,y,r,cx1,cy1,xRotation,largeFlag,sweepFlag,cx2,cy2){
        var d="M"+x+","+y;
        d+=" L"+cx1+","+cy1;
        d+=" A"+r+","+r+","+ xRotation +","+largeFlag+","+sweepFlag+","+cx2+","+cy2;
        d+=" L"+x+","+y;
        d+=" Z";
        return d;
    }
    function createLine(x1,y1,x2,y2,offsetX){
        var d="M"+x1+","+y1;        
        d+=" L"+x2+","+y2;
        if(offsetX){
            if(x2>=x1){
                d+=" L"+(x2+offsetX)+","+y2;
            }else{
                d+=" L"+(x2-offsetX)+","+y2;
            }
        }
        return d;
    }
    /*function createText(ns,x,y,length,html,offsetX){
        var text=makeSVG("text",ns,{x:x,y:x},{"text-anchor":"left"});
        var tspan=makeSVG("tspan",opts.ns,{innerHTML:html});
        Elf.controls.appendTo(tspan,text);
        return text;
    }*/
    function getPieTotal(pieData){
        var total=0;
        Elf.utils.each(pieData,function(index,obj){
            total+=obj.value;
        });
        return total;
    }
    //
    function pieChart(target,params){
        var opts=target.options;
        target.svg=makeSVG("svg",opts.ns,{width:opts.width,height:opts.height,version:"1.1"});
        if(opts.keepAspectRatio){
            Elf.utils.attr(target.svg,"viewBox","0 0 "+opts.width+" "+opts.height);
        }
        Elf.controls.appendTo(target.svg,target.templet);
        //Elf.utils.addClass(target.svg,"elf-chart-pie");
        //var group=Elf.controls.createElement("g");
        for(var index=0;index<opts.pie.length;index++){
            var group=Elf.controls.createElement("g");
            var path=Elf.controls.createElement("path");
            var d=creatFanD(
                opts.ox,opts.oy,
                opts.radius,
                opts.pie[index].startPoint.x,
                opts.pie[index].startPoint.y,
                opts.pie[index].xRotation,
                opts.pie[index].largeFlag,
                opts.pie[index].sweepFlag,
                opts.pie[index].endPoint.x,
                opts.pie[index].endPoint.y
            );
            Elf.utils.attr(path,"d",d);
            Elf.utils.attr(path,"fill",opts.pie[index].data.color);
            Elf.utils.attr(path,"stroke-opacity","0");
            Elf.controls.appendTo(path,group);
            //创建折线            
            var txtLinePath=Elf.controls.createElement("path");
            var lineD =createLine(
                opts.pie[index].txtLineStartPoint.x,
                opts.pie[index].txtLineStartPoint.y,
                opts.pie[index].txtLineEndPoint.x,
                opts.pie[index].txtLineEndPoint.y,
                5
            );
            Elf.utils.attr(txtLinePath,"d",lineD);
            Elf.utils.attr(txtLinePath,"stroke",opts.txtLineColor);
            Elf.utils.attr(txtLinePath,"fill","none");
            Elf.controls.appendTo(txtLinePath,group);
            //创建文本
            //var text=createText(opts.ns,opts.pie[index].txtLineEndPoint.x,opts.pie[index].txtLineEndPoint.y,)
            var node=[]; 
            var nodeText="";
            if(opts.displayText=="textAndPercent"){
                node.push(opts.pie[index].data.text);
                node.push((opts.pie[index].data.value/opts.total*100).toFixed(1)+"%");
                nodeText=opts.pie[index].data.text+" "+ (opts.pie[index].data.value/opts.total*100).toFixed(1)+"%";
            }else if(opts.displayText=="percent"){
                nodeText=opts.pie[index].data.value/opts.total*100+"%";
                node.push((opts.pie[index].data.value/opts.total*100).toFixed(1)+"%");
            }else if(opts.displayText=="value"){
                nodeText=opts.pie[index].data.value;
                node.push(opts.pie[index].data.value);
            }else{
                node.push(opts.pie[index].data.text);
                nodeText= opts.pie[index].data.text
            }
            var textOffsetY=opts.fontSize*((node.length-1)/2);

            var text=makeSVG(
                "text",
                opts.ns,
                {
                    x:opts.pie[index].txtLineEndPoint.x>=opts.pie[index].txtLineStartPoint.x?opts.pie[index].txtLineEndPoint.x+6:opts.pie[index].txtLineEndPoint.x-6,
                    y:opts.pie[index].txtLineEndPoint.y+textOffsetY,
                    textLength:60,
                    lengthAdjust:"spacing",
                    fill:opts.txtColor
                },
                {"text-anchor":opts.pie[index].txtLineEndPoint.x>=opts.pie[index].txtLineStartPoint.x?"start":"end"}
            );
            
            if(opts.fontSize){
                Elf.utils.attr(text,"font-size",opts.fontSize);
            }
            Elf.utils.each(node,function(i,obj){
                var tspan=makeSVG("tspan",opts.ns,
                    {
                        x:opts.pie[index].txtLineEndPoint.x>=opts.pie[index].txtLineStartPoint.x?opts.pie[index].txtLineEndPoint.x+6:opts.pie[index].txtLineEndPoint.x-6,
                        y:opts.pie[index].txtLineEndPoint.y+textOffsetY+i*opts.fontSize
                    }
                );
                 tspan.textContent=obj;
                 Elf.controls.appendTo(tspan,text);
            });

            //var tspan=makeSVG("tspan",opts.ns);
                //tspan.innerHTML=opts.pie[index].data.text;
                //textAndPercentValue text,percentValue,value
                
              //  tspan.textContent=nodeText;
            //Elf.controls.appendTo(tspan,text);
            //text.innerHTML=opts.pie[index].data.text;
            Elf.controls.appendTo(text,group);

            Elf.controls.appendTo(group,target.svg);
        }
        //图例
        for(var index=0;index<opts.pie.length;index++){
            var group=Elf.controls.createElement("g");
            var rect=makeSVG(
                "rect", 
                opts.ns,
                {
                    x:index%2===0?24:opts.ox + 24,
                    y:opts.oy*2+ Math.floor(index/2)*(opts.txtHeight+4)-opts.txtHeight+8,
                    width:10,
                    height:10,
                    fill:opts.pie[index].data.color
                }
            );

            var text=makeSVG(
                "text",
                opts.ns,
                {
                    x:index%2===0?38:opts.ox + 38,
                    y:opts.oy*2+ Math.floor(index/2)*(opts.txtHeight+4),
                    lengthAdjust:"spacing",
                    fill:opts.txtColor
                },
                {"text-anchor":"start","font-size":opts.fontSize}
            );
            text.textContent=opts.pie[index].data.text;
            //var path=Elf.controls.createElement("path");
            Elf.controls.appendTo(rect,group);
            Elf.controls.appendTo(text,group);
            Elf.controls.appendTo(group,target.svg);
        }
        //Elf.controls.appendTo(group,target.svg);
    }
    /*function barChart(target){
        var opts=target.options;
        target.svg=makeSVG("svg",opts.ns,{width:opts.width,height:opts.height,version:"1.1","viewBox":"0 0 "+opts.width+" "+opts.height});

    }*/
    function annularChart(target){
        var opts=target.options;
        //创建饼图
        pieChart(target);
        //创建内圆        
        var innerGroup=makeSVG("g",opts.ns,{id:"inCircle"});
        var innerCircle=makeSVG("circle",opts.ns,{cx:opts.ox,cy:opts.oy,r:opts.radius*0.618,fill:"#fff"});
        Elf.controls.appendTo(innerCircle,innerGroup);
        var names=opts.names.split("_");
        if(names.length>=2){
            for(var i=0;i<names.length;i++){
                var text=makeSVG("text",opts.ns,{x:opts.ox,y:opts.oy+opts.annularTxtHeight*i-(opts.annularTxtHeight-opts.annularTxtSize),fill:opts.txtColor},{"text-anchor":"middle","font-size":opts.annularTxtSize,"font-weight":"bold"});
                text.textContent=names[i];
                Elf.controls.appendTo(text,innerGroup);
            }
        }else{
            var text=makeSVG("text",opts.ns,{x:opts.ox,y:opts.oy+opts.txtHeight/2},{"text-anchor":"middle"});
            text.textContent=names.toString();
            Elf.controls.appendTo(text,innerGroup);
        }
        
        //var text2=makeSVG("text",opts.ns,{x:opts.ox,y:opts.oy+opts.fontSize+2},{"text-anchor":"middle"});
        //text2.textContent="测试";

        
        
        //Elf.controls.appendTo(text2,innerGroup);
        Elf.controls.appendTo(innerGroup,target.svg);
    }
    Elf.utils.extend(Elf.components,{
        chart:function(options,params){
            if (typeof options == 'string'){
                return Elf.components.chart.methods[options](params);
            }
            options = Elf.utils.extend({
                ns:"'http://www.w3.org/2000/svg'",
                xmlns:"http://www.w3.org/2000/xmlns/",
                xLinkNs:'http://www.w3.org/1999/xlink',
                width:"",
                height:"",
                radius:"",
                ox:"",
                oy:"",
                names:"",
                labels:[],
                colors:"",
                fills:"",
                txtOffset:24,
                keepAspectRatio:true,
                txtLineColor:"#333",
                txtLineOffset:24,
                txtColor:"#333",
                txtBgColor:"#fff",
                txtHeight:18,
                fontSize:14,
                annularTxtHeight:18,
                annularTxtSize:16,
                bgColor:"#03b4fa",
                type:"pie",
                data:pieData,
                displayText:"textAndPercent",
                target:document.body
            },options);
            var me=document.createDocumentFragment();
            me.options=options;
            init(me,params);
            return me;
        }
    });
    Elf.components.chart.methods = {};
})(Elf);