/**
 * Created by lijianwei on 2016/5/16.
 *
 * 应用场景，全局布局适应浏览器布局
 * */
(function(){
    function init(target,options){
        if(options.border){
            Elf.utils.css(target,{border:options.border});
        }
        if(options.top){
            target.top=Elf.createChild(target,{name: "div",className: "elf_fiexd_top"});
            Elf.utils.css(target.top,{
                height:options.top.height,
                left:(options.flow=="clomn" ? 0 : (!!options.left && !!options.left.width ? options.left.width : 0)),
                right:(options.flow=="clomn" ? 0 : (!!options.right && !!options.right.width ? options.right.width : 0))
            });
        }
        if(options.left){
            target.left=Elf.createChild(target,{name: "div",className: "elf_fiexd_left"});
            Elf.utils.css(target.left,{
                width:options.left.width,
                top:(options.flow=="clomn" ? (!!options.top && !!options.top.height ? options.top.height : 0) : 0),
                bottom:(options.flow=="clomn" ? (!!options.bottom && !!options.bottom.height ? options.bottom.height : 0) : 0)
            });
        }
        if(options.right){
            target.right=Elf.createChild(target,{name: "div",className: "elf_fiexd_right"});
            Elf.utils.css(target.right,{
                width:options.right.width,
                top:(options.flow=="clomn" ? (!!options.top && !!options.top.height ? options.top.height : 0) : 0),
                bottom:(options.flow=="clomn" ? (!!options.bottom && !!options.bottom.height ? options.bottom.height : 0) : 0)
            });
        }
        if(options.bottom){
            target.bottom=Elf.createChild(target,{name: "div",className: "elf_fiexd_bottom"});
            Elf.utils.css(target.bottom,{
                height:options.bottom.height,
                left:(options.flow=="clomn" ? 0 : (!!options.left && !!options.left.width ? options.left.width : 0)),
                right:(options.flow=="clomn" ? 0 : (!!options.left && !!options.left.width ? options.left.width : 0))
            });
        }
        target.center=Elf.createChild(target,{name: "div",className: "elf_fiexd_center"});
        Elf.utils.css(target.center,{
            top:(!!options.top && options.top.height ? options.top.height : 0),
            left:(!!options.left && options.left.width ? options.left.width : 0),
            right:(!!options.right && options.right.width ? options.right.width : 0),
            bottom:(!!options.bottom && options.bottom.height ? options.bottom.height : 0)
        });
    }
    Elf.utils.extend(Elf.layout,{
        flow:function(options,param){
            if (typeof options == 'string'){
                return Elf.layout.flow.methods[options](this,param);
            }
            options = Elf.utils.extend({flow:"clomn",target:document.body,border:""},options);
            var layout=Elf.controls({name: "div",className: "elf_flow"});
            init(layout,options);
            if(options.target){
                options.target.appendChild(layout);
            }
            return layout;
        }
    });
    Elf.layout.flow.methods = Elf.utils.extend({},{
    });
})(Elf);