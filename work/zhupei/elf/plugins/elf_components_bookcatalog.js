/**
 * Created by lijianwei on 2016/5/16.
 *
 * 树形组件
 *  Elf.components.tree(options);
 *  @parameters
 *  options
 *      autoOpen:false,自动打开
 *      closable:false,是否可关闭
 *      collapsible:true, 是否可折叠
 *      collapseDirection:true,折叠方向，top,bottom,left,right
 *      vie:false,配置打开互斥，只对兄弟forder生效，如果配置了autoOpen 将不生效
 *      checkable:false,是否有复选框
 *      yes:"ps",勾选时，关联父(parent-p)，关联子(son-s)
 *      not:"ps",取消勾选时，关联父(parent-p)，关联子(son-s)
 *      target:document.body,
 *      store:{},菜单配置Json数据
 *      key:"id",
 *      nameKey:"name",
 *      parentKey:"pid",
 *      pathKey:"path",
 *      onLoaded:function(event){},
 *      onChange:function(event){},
 *      onChecked:function(event){},
 *      onClick:function(event){}
 **/
(function(){
    //激活节点(只针对叶子节点)
    function active(target,item){
        var opts=target.options;
        if(opts.vie){
            if(target.currentItem){
            	unActive(target,target.currentItem);
            }
        }
        Elf.utils.addClass(item,"elf-active");
        target.currentItem=item;
        var parentNode=Elf.utils.closest(item,"li.fold");
        openNode(target,parentNode);
        /*if(opts.onClick && typeof opts.onClick=="function"){
            opts.onClick.call(target,item,item.ownData);
        }*/
    }
    //取消激活节点
    function unActive(target,node){
        Elf.utils.removeClass(node,"elf-active");
    }
    //选中节点
    function selected(target,node){
        Elf.utils.addClass(node,"selected");
    }
    function unSelected(target,node){
        Elf.utils.removeClass(node,"selected");
    }
    function setCurrent(target,item){
        if(Elf.utils.hasClass(item,"fold")){
            toggleNode(target,item);
        }else{
            active(target,item);
        }
    }
    function closeNode(target,node){
        if(node.childNodeLs && node.childNodeLs.children.length>0){
            Elf.utils.removeClass(node,"opened");
        }
    }
    function openNode(target,node){
        var opts=target.options;
        if(opts.vie){
            var siblings=Elf.utils.siblings(node);
            Elf.utils.each(siblings,function(index,el){
                closeNode(target,el);
                unSelected(target,el);
            });
        }
        selected(target,node);
        Elf.utils.addClass(node,"opened");
        opts.onOpen.call(target,node,node.ownData);
    }
    function toggleNode(target,param){
        if(Elf.utils.hasClass(param,"opened")){
            closeNode(target,param);
        }else{
            openNode(target,param);
        }
    }
    function createNode(target,obj,cover,pNode){
    	var node;
    	if(pNode){
    		node=Elf.controls.createElement("li",pNode.childNodeLs);
    	}else{
    		node=Elf.controls.createElement("li",target.childNodeLs);
    	}
        var accordionNode=Elf.controls.createElement("div","elf-accordion-node",node);
        if(cover){
            Elf.controls.createElement("img",{src:cover},accordionNode);
        }
        var handle=Elf.controls.createElement("i","elf-accordion-handle",accordionNode);
        Elf.controls.createElement("a","elf-accordion-point",{innerHTML:obj.name},accordionNode);
        node.ownData=obj;
        target.nodeList[obj.id]=node;
        if(obj.sections && obj.sections.length>0){
            node.childNodeLs=Elf.controls.createElement("ul","animated fast",node);
            Elf.utils.addClass(node,'fold');
            Elf.utils.each(obj.sections,function(index, el) {
                createNode(target,el,"",node);
            });
        }else{
            Elf.utils.addClass(node,'leaf');
        }
    }
    function initView(target){
        var opts=target.options;
        target.nodeList={};//保存所有节点对象
        target.childrenList=[];//保存一级子菜单
        target.childNodeLs=Elf.controls.createElement("ul","animated fast",target);//一级菜单列表UL
        if(opts.target){
            Elf.controls.appendTo(target,opts.target);
        }
        if(opts.store){
        	//创建所有菜单
            Elf.utils.each(opts.store,function(index,obj){
                createNode(target,obj,"images/lALOigRW-c0DV80B4A_480_855_03.jpg");
            });
        }
        if(opts.currentId){
            var currentItem=target.nodeList[opts.currentId];
            setCurrent(target,currentItem);
        }
    }
    function initEvent(target){
        Elf.xEvents.bind(target,"click",function(event){
            var tt=event.target;
            var item=Elf.utils.closest(tt,'li');
            if(item){
                if(Elf.utils.hasClass(item,"fold")){
                    toggleNode(target,item);
                }else{
                    active(target,item);
                    if(target.options.onClick && typeof target.options.onClick=="function"){
                        target.options.onClick.call(target,item,item.ownData);
                    }
                }
            }
        });
    }
    function init(target,param){
        initView(target,param);
        initEvent(target,param);
    }
    Elf.utils.extend(Elf.components,{
        bookcatalog:function(options,param){
            if (typeof options == 'string'){
                return Elf.components.bookcatalog.methods[options](param);
            }
            var _this=Elf.controls.createElement("div","elf-accordion");
            _this.options = Elf.utils.extend({
                autoOpen:false,
                closable:false,
                collapsible:true,
                collapseDirection:true,
                vie:true,
                checkable:false,
                target:document.body,
                activeFirstChild:true,
                store:{},
                currentId:"",
                onInitialized:function(data){},
                onOpen:function(item,data){},
                onClick:function(item,data){}
            },Elf.components.bookcatalog.defaults,options);
            init(_this,param);
            return _this;
        }
    });
    Elf.components.bookcatalog.defaults={};
    Elf.components.bookcatalog.methods = {};
})(Elf);