/**
 * Created by lijianwei on 2016/6/20.
 *	分页工具栏
 *	@author 李见伟
 *	@parameters 
 *	options
 *		total:number 总记录数，
 *		currentPage:number default:1 当前页码，
 *		pageSize:number default:1 每页记录数
 *		maxPager:number default:5 最大页码个数，最小为3
 *		showStatus:boolean 是否现在记录状态，
 *		statusFormat:"共 <b>{total}</b> 条记录 <b>{totalPage}</b> 页" 显示状态模板设置
 *
 **/
(function(){
	function initOptions(opts){
		opts.currentPage=Number(opts.currentPage);
		opts.total=Number(opts.total);
		opts.totalPage=Math.ceil(opts.total/opts.pageSize);
		opts.isPrev=opts.current==1 ? true : false;
		opts.isLast=opts.totalPage==opts.totalPage ? true : false;
		opts.currentPage=opts.currentPage>opts.totalPage?opts.totalPage:opts.currentPage;
		opts.currentPage=opts.currentPage<1?1:opts.currentPage;
		return opts
	}
	/*
	function formatStatus(opts){
		var matches=opts.statusFormat.match(/{[a-z_A-Z]\w+}/g);
		var statusFormat=opts.statusFormat;
		Elf.utils.each(matches,function(index,obj){
			statusFormat=statusFormat.replace(obj,opts[obj.match(/[a-z_A-Z]\w+/)]);
		});
		return statusFormat;
	}*/
	function updatePager(target,opts){
		//清除页面
		Elf.utils.each(target.pagers,function(index,obj){
			Elf.utils.remove(obj);
		});
		target.pagers=[];
		var offset=Math.ceil(opts.maxPager/2);
		
		if(opts.currentPage==1){
			Elf.utils.attr(target.toFirst,"disabled","disabled");
		}else{
			Elf.utils.removeAttr(target.toFirst,"disabled");
		}
		if(opts.currentPage==opts.totalPage){
			Elf.utils.attr(target.toLast,"disabled","disabled");
		}else{
			Elf.utils.removeAttr(target.toLast,"disabled");
		}
		if(opts.showStatus){
			var statusHtml=Elf.utils.templateDataMapping(opts.statusFormat,opts);
			target.status.innerHTML=statusHtml;
		}
		if(opts.showQuickJump){
			Elf.utils.attr(target.quickJumpPager,"max",opts.totalPage);
		}
		if(opts.totalPage > opts.maxPager){
			if(opts.currentPage+offset < opts.totalPage && opts.currentPage - offset > 1){
				//页码从currentPage扩展,前后省略号
				target.prevEllipsis=Elf.controls.createElement("button",{"innerHTML":"...","disabled":"disabled"},"btn ml4");
				target.pagers.push(target.prevEllipsis);
				Elf.controls.prependTo(target.prevEllipsis,target,target.toLast);
				for(var i= opts.currentPage-offset;i < opts.currentPage-offset+opts.maxPager;i++){
					var pager=Elf.controls.createElement("button","btn ml4 elf-paging-pager",{innerHTML:i+1,"data-num":i+1});
					target.pagers.push(pager);
					Elf.controls.prependTo(pager,target,target.toLast);
					if(i+1==opts.currentPage){
						Elf.utils.addClass(pager,"current");
					}
				}
				target.nextEllipsis=Elf.controls.createElement("button",{"innerHTML":"...","disabled":"disabled"},"btn ml4");
				target.pagers.push(target.nextEllipsis);
				Elf.controls.prependTo(target.nextEllipsis,target,target.toLast);
			}else if(opts.currentPage-offset<=1){
				//页码冲前往后，后省略号
				for(var i=0;i < opts.maxPager;i++){
					var pager=Elf.controls.createElement("button","btn ml4 elf-paging-pager",{innerHTML:i+1,"data-num":i+1});
					target.pagers.push(pager);
					Elf.controls.prependTo(pager,target,target.toLast);
					if(opts.currentPage==i+1){
						Elf.utils.addClass(pager,"current");
					}
				}
				target.nextEllipsis=Elf.controls.createElement("button",{"innerHTML":"...","disabled":"disabled"},"btn ml4");
				target.pagers.push(target.nextEllipsis);
				Elf.controls.prependTo(target.nextEllipsis,target,target.toLast);
			}else if(opts.currentPage+offset >= opts.totalPage){
				//页码从后往前，前省略号
				target.prevEllipsis=Elf.controls.createElement("button",{"innerHTML":"...","disabled":"disabled"},"btn ml4");
				target.pagers.push(target.prevEllipsis);
				Elf.controls.prependTo(target.prevEllipsis,target,target.toLast);
				for(var i=opts.totalPage-opts.maxPager;i < opts.totalPage;i++){
					var pager=Elf.controls.createElement("button","btn ml4 elf-paging-pager",{innerHTML:i+1,"data-num":i+1});
					target.pagers.push(pager);
					Elf.controls.prependTo(pager,target,target.toLast);
					if(i+1==opts.currentPage){
						Elf.utils.addClass(pager,"current");
					}
				}
			}
			opts.displayPage=opts.totalPage > opts.maxPager?opts.maxPager:opts.totalPage;
		}else{
			//显示所有页码
			for(var i=0;i < opts.totalPage;i++){
				var pager=Elf.controls.createElement("button","btn ml4 elf-paging-pager",{innerHTML:i+1,"data-num":i+1});
				target.pagers.push(pager);
				Elf.controls.prependTo(pager,target,target.toLast);
				if(i+1==opts.currentPage){
					Elf.utils.addClass(pager,"current");
				}
			}
		}
	}
	function init(target,params){
		var opts=target.options;
		if(opts.showStatus){
			target.status=Elf.controls.createElement("label");
			Elf.controls.appendTo(target.status,target);
		}
		target.toFirst =Elf.controls.createElement("button",{"innerHTML":"首页"},"btn ml10 elf-paging-toFirst");
		Elf.controls.appendTo(target.toFirst,target);
		target.toLast =Elf.controls.createElement("button",{"innerHTML":"尾页"},"btn ml4 elf-paging-toLast");
		Elf.controls.appendTo(target.toLast,target);
		if(opts.maxPager>3){
			target.pagers=[];
			//updatePager(target,opts);
		}else{
			target.toPrev =Elf.controls.createElement("button",{"innerHTML":"上一页"},"btn ml4 elf-paging-toNext");
			Elf.controls.appendTo(target.toPrev,target);
			target.toNext =Elf.controls.createElement("button",{"innerHTML":"下一页"},"btn ml4 elf-paging-toPrev");
			Elf.controls.appendTo(target.toNext,target);
		}
		if(opts.showQuickJump){
			target.quickJumpPager=Elf.controls.createElement("input",{"type":"number",min:1,max:opts.totalPage,name:"jumpTo",style:"width:45px;"},"ml4");
			Elf.controls.appendTo(target.quickJumpPager,target);
			target.jumpToBtn =Elf.controls.createElement("button",{"innerHTML":"跳转","disabled":"disabled"},"btn ml4 elf-paging-jumpTo");
			Elf.controls.appendTo(target.jumpToBtn,target);
			Elf.xEvents.bind(target.quickJumpPager,"keyup",function(e){
				
				var value=target.quickJumpPager.value;
				value=value.replace(/[^\d]/g,'')-0;
				if(value > target.options.totalPage){
					value="";
				}
				if(value < 1){
					value="";
				}
				target.quickJumpPager.value=value;
				if(value>=1 && value<= target.options.totalPage && value != target.options.currentPage){
					Elf.utils.removeAttr(target.jumpToBtn,"disabled");
				}else{
					Elf.utils.attr(target.jumpToBtn,"disabled","disabled");
				}
			});
		}
		updatePager(target,opts);
		Elf.xEvents.bind(target,"click",function(evt){
			var tt=evt.target;
			if(Elf.utils.hasClass(tt,"elf-paging-pager")){
				if(Elf.utils.hasClass(tt,"current")){
					return;
				}else{
					pager=Elf.utils.attr(tt,"data-num");
					jumpTo(target,pager);
				}
			}
			if(Elf.utils.hasClass(tt,"elf-paging-toNext")){
				jumpTo(target,target.options.currentPage+1);
			}
			if(Elf.utils.hasClass(tt,"elf-paging-toPrev")){
				jumpTo(target,target.options.currentPage-1);
			}
			if(Elf.utils.hasClass(tt,"elf-paging-toFirst")){
				jumpTo(target,1);
			}
			if(Elf.utils.hasClass(tt,"elf-paging-toLast")){
				jumpTo(target,target.options.totalPage);
			}
			if(Elf.utils.hasClass(tt,"elf-paging-jumpTo")){
				jumpTo(target,target.quickJumpPager.value);
				target.quickJumpPager.value="";
				Elf.utils.attr(target.jumpToBtn,"disabled","disabled");
			}
		});
		if(opts.target){
			Elf.controls.appendTo(target,opts.target);
		}
	}
	//跳转到
	function jumpTo(target,param){
		target.options.currentPage=Number(param);
		updatePager(target,target.options);
		target.options.onPagerChange.call(target,param);
	}
	function setCuttentPage(target,param){
		currentPage=Number(param) > target.options.totalPage ? target.options.totalPage:Number(param);
		currentPage=currentPage < 1 ? 1 : currentPage;
		target.options.currentPage=currentPage;
		updatePager(target,target.options);
	}
	function update(target,options){
		options = Elf.utils.extend({},target.options,options);
		target.options=initOptions(options);
		updatePager(target,options);
	}
	Elf.utils.extend(Elf.components,{
        paging:function(options,params){
            if (typeof options == 'string'){
                return Elf.components.paging.methods[options](params);
            }
            var me=Elf.controls.createElement("div","elf-paging");
            options = Elf.utils.extend({
				total:0,
				pageSize:1,
				totalPage:1,
				currentPage:1,
				maxPager:5,
				showQuickJump:true,
				showStatus:true,
				statusFormat:"共 <b>{{total}}</b> 条记录 <b>{{totalPage}}</b> 页",
				onPagerChange:function(p){},
				target:document.body
			},Elf.components.paging.defaults,options);
			me.options=options=initOptions(options);
            //me.options=options;
            init(me,params);
            return me;
        }
    });
    Elf.components.paging.defaults={};
    Elf.components.paging.methods ={
    	setCuttentPage:function(target,param){
    		return setCuttentPage(target,param);
    	},
    	update:function(target,options){
    		return update(target,options);
    	}
	};
})();