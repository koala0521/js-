/**
 * Created by lijianwei on 2016/6/20.
 *	圆形进度条
 *	@author 李见伟
 *	@parameters 
 *	options
 *		size:String default:10rem 尺寸大小，
 *		textSize:string default:1rem 中心字体大小，
 *		value:number  显示数值0-100
 *		hollowColor:空心背景颜色，这里只圆心背景颜色
 *		solidColor：数值颜色，圆环和字体颜色
 *		emptyColor：空圆环颜色
 *
 **/
(function(){
	function init(target,params){
		var opts=target.options;

		var styles=makeStyles(opts);
		Elf.utils.css(target,styles);

		var ring=Elf.controls.createElement("div","flex-box flex-justify-center flex-align-items-center");
		if(opts.textHtml){
			ring.innerHTML=opts.textHtml;
			Elf.utils.addClass(ring,"elf-ringProgress-html");
			Elf.utils.css(ring,{
				backgroundColor:opts.hollowColor
			});
		}else{
			ring.innerHTML=opts.value+"%";
			Elf.utils.addClass(ring,"elf-ringProgress-text");
			var textStyles=makeTextStyles(opts);
			Elf.utils.css(ring,textStyles);
		}
		Elf.controls.appendTo(ring,target);
	}
	function makeTextStyles(opts){
		var css={};
		if(opts.textSize){
			css.fontSize= opts.textSize;
		}
		css.color=opts.solidColor;
		css.backgroundColor=opts.hollowColor;
		return css;
	}
	function makeStyles(opts){
		var css={};
		css.width=opts.size;
		css.height=opts.size;
		var deg=-1;
		if(opts.value<=50){
			deg=90+opts.value*360/100;
			css.backgroundImage="linear-gradient(90deg, "+opts.emptyColor+" 50%, transparent 50%, transparent), linear-gradient("+deg+"deg, "+opts.solidColor+" 50%, "+opts.emptyColor+" 50%, "+opts.emptyColor+")";
		}else{
			deg=270+(opts.value-50)*360/100;
			css.backgroundImage="linear-gradient("+deg+"deg, "+opts.solidColor+" 50%, transparent 50%, transparent), linear-gradient(270deg, "+opts.solidColor+" 50%, "+opts.emptyColor+" 50%, "+opts.emptyColor+")";
		}
		//console.info(css);
		return css;
	}
	Elf.utils.extend(Elf.components,{
		ringProgress:function(options,params){
            if (typeof options == 'string'){
                return Elf.components.ringProgress.methods[options](params);
            }
            var me=Elf.controls.createElement("div","elf-ringProgress flex-align-items-center flex-box flex-justify-center flex-align-content-center ");
            options = Elf.utils.extend({},Elf.components.ringProgress.defaults,options);
			options.value=options.value<0?0:options.value>100?100:options.value;
            me.options=options;
            init(me,params);
            if(options.target){
                Elf.controls.appendTo(me,options.target);
            }
            return me;
        }
    });
    Elf.components.ringProgress.defaults={
		size:"10rem",
		textSize:"1rem",
		value:0,
		hollowColor:"#fff",
		emptyColor:"#ccc",
		solidColor:"#f00",
		textHtml:"",
		target:document.body
    };
    Elf.components.ringProgress.methods ={};
})(Elf);