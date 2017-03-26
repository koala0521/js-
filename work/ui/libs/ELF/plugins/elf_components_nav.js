/**
 * Created by lijianwei on 2016/5/16.
 *
 * navbar
 *
 **/
(function(){
    function active(target,param){
        for(var o in target.navMap){
            if(target.navMap[o].key==param){
                Elf.utils.addClass(target.navMap[o],"active");
            }else{
                Elf.utils.removeClass(target.navMap[o],"active");
            }
        }
    }
    function initView(target,param){
        var opts=target.options;
        target.navRoot=Elf.controls.createElement("ul",null,"nav-bar");
        target.navMap={};
        if(opts.target){
            Elf.controls.appendTo(target.navRoot,opts.target);
        }
        if(opts.store){
            var fragment=document.createDocumentFragment();
            for(var o in opts.store){
                var obj=opts.store[o];
                var item=Elf.controls.createElement("li",{"data-id":obj[opts.key]});
                item.linkNode=Elf.createChild(item,{name:"a"});
                item.linkNode.innerHTML=obj[opts.titleKey];
                item.key=obj[opts.key];
                item.ownData=opts.store[o];
                target.navMap[obj[opts.key]]=item;
                if(item.ownData.url){
                    Elf.utils.attr(item.linkNode,"href",item.ownData.url);
                }
                Elf.controls.appendTo(item,fragment);
            }
            Elf.controls.appendTo(fragment,target.navRoot);
        }
    }
    function initEvent(target,param){
        var opts=target.options;
        Elf.utils.iterate(target.navMap,function(key){
            var item=target.navMap[key];
            Elf.xEvents.bind(item.linkNode,"click",function(e){
                e.stopPropagation();
                active(target,item.key);
                if(opts.jumpType=="action"){
                    e.preventDefault();
                    if(Elf.utils.isFunction(opts.onClick)){
                        opts.onClick(item.ownData);
                    }
                }
            });
        });
    }
    function init(target,param){
        initView(target,param);
        initEvent(target,param);
        active(target,target.navRoot.children[0].key);
    }
    Elf.utils.extend(Elf.components,{
        nav:function(options,param){
            if (typeof options == 'string'){
                return Elf.components.nav.methods[options](param);
            }
            var _this={root:""};
            _this.options = Elf.utils.extend({},Elf.components.nav.defaults,options);
            init(_this,param);
            return _this;
        }
    });
    Elf.components.nav.defaults={
        store:{},
        key:"id",
        titleKey:"title",
        jumpType:"link",//a_link 链接方式,action:
        onClick:function(event){}
    };
    Elf.components.nav.methods = Elf.utils.extend({},{
        openAll:function(target,param){
            return openAll(target,param);
        },
        closeAll:function(target,param){
            return closeAll(target,param);
        },
        getChecked:function(target,param){
            return getChecked(target,param);
        }
    });
})(Elf);