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
    function closeAll(target){
        return target;
    }
    function openAll(target){
        return target;
    }
    function getChecked(target){
        //console.info("openAll");
        //return target.
    }
    function closeNode(target,param){
        if(param.childTreeNode){
            Elf.utils.removeClass(param,"opened");
        }
    }
    function openNode(target,param){
        var opts=target.options;
        if(param.childTreeNode){
            Elf.utils.addClass(param,"opened");
        }
        if(opts.vie){
            var parent=target.nodeList[param.parentKey]||target;
            for(var i=0;i<parent.childTreeNodes.length;i++){
                var item=parent.childTreeNodes[i];
                if(item.key!=param.key){
                    closeNode(target,item);
                }
            }
        }
    }
    function openParents(target,item){
        if(item.parentKey>0){
            var parent=getParent(target,item);
            if(!parent.isRoot){
                openNode(target,parent);
                openParents(target,parent);
            }
        }
    }
    function setCurrent(target,item){
        Elf.utils.iterate(target.nodeList,function(key,obj){
            Elf.utils.removeClass(obj.treeNode,"elf-active");
        });
        Elf.utils.addClass(item.treeNode,"elf-active");
    }
    function openCurrentPath(target,path){
        var ids=path.split("/");
        Elf.utils.each(ids,function(index,obj){
            var node=target.nodeList[obj];
            openNode(target,node);
            if(index==ids.length-1){
                setCurrent(target,node);
            }
        });
        return target;
    }
    function toggleTreeNode(target,param){
        if(Elf.utils.hasClass(param,"opened")){
            closeNode(target,param);
        }else{
            openNode(target,param);
        }
    }
    function creatTreeRoot(target){
        var opts=target.options;
        target.rootNode=Elf.controls({name:"div",className:"elf_treeview"});
        target.isRoot=true;
        target.nodeList={};
        target.childTreeNode=Elf.createChild(target.rootNode,{name: "ul"});
        target.childTreeNodes=[];
        if(opts.target){
            Elf.controls.appendTo(target.rootNode,opts.target);
        }
        return target;
    }
    function creatTreeNode(target,obj){
        var opts=target.options;
        var item=Elf.controls({name: "li"});
        item.ownData=obj;
        item.parentKey=obj[opts.parentKey];
        item.key=obj[opts.key];
        item.treeNode=Elf.createChild(item,{name: "div",className: "elf_tree_node"});
        item.handle=Elf.createChild(item.treeNode,{name: "i",className: "elf_tree_handle"});
        if(opts.checkable){
            item.checkbox=Elf.controls.createElement("input",{type:"checkbox",name:"checkbox",value:item.key});
            Elf.controls.appendTo(item.checkbox,item.treeNode);
        }
        item.link=Elf.createChild(item.treeNode,{name: "a",className: "elf_tree_node_point"});
        item.link.innerHTML=obj[opts.nameKey];
        item.childTreeNodes=[];
        item.childTreeNode=Elf.createChild(item,{name: "ul"});
        if(!opts.vie && opts.autoOpen){
            Elf.utils.addClass(item,"opened");
        }
        Elf.utils.addClass(item,"leaf");
        return item;
    }
    function getParent(target,param){
        return target.nodeList[param.parentKey]||target;
    }
    function initView(target,param){
        var opts=target.options;
        creatTreeRoot(target,param);
        if(opts.store){
        	Elf.utils.each(opts.store,function(index,obj){
        		var item=creatTreeNode(target,obj);
                Elf.utils.attr(item,"data-id",index);
                target.nodeList[item.key]=item;
        	});
            for(var key in target.nodeList){
                var item=target.nodeList[key];
                var parent=getParent(target,item);
                if(parent){
                    Elf.utils.addClass(parent,"fold");
                    Elf.utils.removeClass(parent,"leaf");
                    Elf.controls.appendTo(item,parent.childTreeNode);
                    parent.childTreeNodes.push(item);
                }
            }

        }
        if(opts.currentId){
            var currentItem=target.nodeList[opts.currentId];
            setCurrent(target,currentItem);
            openParents(target,currentItem);
        }
    }
    //所有子项是否已选中
    function isChildrenChecked(target,param){
        for(var i=0;i<param.childTreeNodes.length;i++){
            var item=param.childTreeNodes[i];
            if(!item.checkbox.checked){
                return false;
                break;
            }
        }
        return true;
    }
    /*子项是否有选中的项*/
    function hasChecked(target,param){
        for(var i=0;i<param.childTreeNodes.length;i++){
            var item=param.childTreeNodes[i];
            if(item.checkbox.checked){
                return true;
                break;
            }
        }
        return false;
    }
    /* children */
    function checkedChildren(target,param){
        for(var i=0;i<param.childTreeNodes.length;i++){
            var item=param.childTreeNodes[i];
            var dataid=Elf.utils.attr(item,"data-id");
            target.options.store[dataid]["checked"]=true;
            item.checkbox.checked="checked";
            item.checkbox.indeterminate=false;
            if(item.childTreeNodes.length>0){
                checkedChildren(target,item);
            }
        }
    }
    function checkedAll(target){
    	Elf.utils.each(target.nodeList,function(key,obj){
    		obj.checkbox.checked="checked";
    	});
    	Elf.utils.each(target.options.store,function(index,obj){
    		obj["checked"]="checked";
    	});
    }
    function unCheckChildren(target,param){
        for(var i=0;i<param.childTreeNodes.length;i++){
            var item=param.childTreeNodes[i];
            var dataid=Elf.utils.attr(item,"data-id");
            target.options.store[dataid].checked=false;
            item.checkbox.checked="";
            if(item.childTreeNodes.length>0){
                unCheckChildren(target,item);
            }
        }
    }
    function unCheckedAll(target){
    	Elf.utils.each(target.nodeList,function(key,obj){
    		obj.checkbox.checked="";
    	});
    	Elf.utils.each(target.options.store,function(index,obj){
    		obj["checked"]="";
    	});
    }
    /* 包含冒泡 */
    function checkedParents(target,param){
        var parent=getParent(target,param);
        if(!parent.isRoot){
            if(isChildrenChecked(target,parent)){
                parent.checkbox.checked="checked";
                var dataid=Elf.utils.attr(parent,"data-id");
                target.options.store[dataid]["checked"]=true;
                parent.checkbox.indeterminate=false;
            }else if(hasChecked(target,parent)){
                parent.checkbox.indeterminate=true;
            }
            checkedParents(target,parent);
        }
    }
    function unCheckedParents(target,param){
        var parent=getParent(target,param);
        if(!parent.isRoot){
            parent.checkbox.checked="";
            var dataid=Elf.utils.attr(parent,"data-id");
            target.options.store[dataid]["checked"]=false;
            if(hasChecked(target,parent)){
                parent.checkbox.indeterminate=true;
            }else{
                parent.checkbox.indeterminate=false;
            }
            var pparent=getParent(target,parent);
            if(!pparent.isRoot){
                unCheckedParents(target,parent);
            }
        }
    }
    function getCheckedData(target){
    	var array=[];
    	Elf.utils.each(target.options.store,function(index,obj){
    		if(obj.checked){
    			array.push(obj);
    		}
    	});
    	return array;
    }
    function initEvent(target){
        var opts=target.options;
        
        Elf.utils.iterate(target.nodeList,function(key,item){
            //var item=target.nodeList[key];
            //点击handle图标打开或关闭
            Elf.xEvents.bind(item.handle,"click",function(e){
                e.stopPropagation();
                if(item.childTreeNodes.length){
                    toggleTreeNode(target,item);
                }
            });
            //双击打开或关闭
            Elf.xEvents.bind(item.treeNode,"dblClick",function(e){
                if(item.childTreeNodes.length){
                    toggleTreeNode(target,item);
                }
            });
            Elf.xEvents.bind(item.treeNode,"click",function(e){
                var tt=e.target;
                if(Elf.utils.hasClass(tt,"elf_tree_handle")){
                    return;
                }
                setCurrent(target,item);
                if(opts.onClick && typeof opts.onClick=="function"){
                	opts.onClick.call(target,item);
                    //opts.onClick(item);
                }
            });
            //item.checkbox 点击事件
            if(opts.checkable){
            	Elf.xEvents.bind(item.checkbox,"click",function(e){
            		e.stopPropagation();
            	});
                Elf.xEvents.bind(item.checkbox,"change",function(e){
                    e.stopPropagation();
                    var dataid=Elf.utils.attr(item,"data-id");
                    if(item.checkbox.checked){
                        target.options.store[dataid]["checked"]=true;
                        if(opts.YS){
                            checkedChildren(target,item);
                        }
                        if(opts.YP){
                            checkedParents(target,item);
                        }
                    }else{
                        target.options.store[dataid]["checked"]=false;
                        if(opts.NS){
                            unCheckChildren(target,item);
                        }
                        if(opts.NP){
                            unCheckedParents(target,item);
                        }
                    }
                });
                Elf.xEvents.bind(item.checkbox,"xClick",function(e){
                    e.stopPropagation();
                });
                Elf.xEvents.bind(item.checkbox,"xDblClick",function(e){
                    e.stopPropagation();
                });
            }
        });
    }
    function init(target,param){
        var opts=target.options;
        opts.YP=false;
        opts.YS=false;
        opts.NP=false;
        opts.NS=false;
        if(opts.yes){
            if(opts.yes=="ps"){
                opts.YP=true;
                opts.YS=true;
            }else if(opts.yes=="p"){
                opts.YP=true;
                opts.YS=false;
            }else if(opts.yes=="s"){
                opts.YP=false;
                opts.YS=true;
            }
        }
        if(opts.not){
            if(opts.not=="ps"){
                opts.NP=true;
                opts.NS=true;
            }else if(opts.not=="p"){
                opts.NP=true;
                opts.NS=false;
            }else if(opts.not=="s"){
                opts.NP=false;
                opts.NS=true;
            }
        }
        target.options=opts;
        initView(target,param);
        initEvent(target,param);
    }
    Elf.utils.extend(Elf.components,{
        tree:function(options,param){
            if (typeof options == 'string'){
                return Elf.components.tree.methods[options](param);
            }
            var _this={root:""};
            _this.options = Elf.utils.extend({
                autoOpen:false,
                closable:false,
                collapsible:true,
                collapseDirection:true,
                vie:false,
                checkable:false,
                yes:"ps",
                not:"ps",
                target:document.body,
                store:{},
                key:"id",
                nameKey:"name",
                parentKey:"pid",
                pathKey:"path",
                currentId:"",
                onLoaded:function(event){},
                onChange:function(event){},
                onChecked:function(event){},
                onClick:function(event){}
            },Elf.components.tree.defaults,options);
            init(_this,param);
            return _this;
        }
    });
    Elf.components.tree.defaults={};
    Elf.components.tree.methods = {
        openAll:function(target,param){
            return openAll(target,param);
        },
        closeAll:function(target,param){
            return closeAll(target,param);
        },
        openCurrentPath:function(target,param){
            return openCurrentPath(target,param);
        },
        getChecked:function(target,param){
            return getChecked(target,param);
        },
        checkedAll:function(target,param){
        	return checkedAll(target,param);
        },
        unCheckedAll:function(target,param){
        	return unCheckedAll(target,param);
        },
        getCheckedData:function(target,param){
        	return getCheckedData(target,param);
        }
    };
})(Elf);