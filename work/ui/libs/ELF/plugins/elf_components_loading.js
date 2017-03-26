/*
 * Created by lijianwei on 2016/5/13.
 * loading组件
 *  Elf.components.loading(options);
 *  @parameters
 *  options
 *      width Number default 64
 *      height Number default 64
 *      color String default #03b4fa 
 *      target Element Object default document.body
 **/
(function(){
    function init(){
        Elf.components.loading.root=Elf.controls({
            name: "div",className: "elf_loading"
        });
        Elf.components.loading.mask=Elf.createChild(Elf.components.loading.root,{
            name: "div",className: "elf_loading_mask"
        });
        Elf.components.loading.position=Elf.createChild(Elf.components.loading.root,{
            name: "div",className: "elf_loading_position"
        });
        Elf.components.loading.frames=Elf.createChild(Elf.components.loading.position,{
            name: "ul",className:"elf_loading_frames elf_loading_rotate"
        });
        //Elf.components.loading.frames
        for(var i=1;i<=12;i++){
            Elf.createChild(Elf.components.loading.frames,{
                name: "li",
                className:"elf_loading_frames_"+i
            });
        }
    }
    Elf.utils.extend(Elf.components,{
        loading:function(options,param){
            if (typeof options == 'string'){
                return Elf.components.loading.methods[options](this,param);
            }
            options = Elf.utils.extend({
                width:"64",
                height:"64",
                color:"#03b4fa",
                target:document.body
            },options);
            if(!Elf.components.loading.root){
                init(options,param);
                if(options.target){
                    options.target.appendChild(Elf.components.loading.root);
                }
            }
            Elf.components.loading.count=Elf.components.loading.count>=0?Elf.components.loading.count:0;
            Elf.components.loading.count+=1;
        }
    });
    Elf.components.loading.count=0;
    Elf.components.loading.methods = Elf.utils.extend({},{
        close:function(){
            Elf.components.loading.count-=1;
            if(Elf.components.loading.count<=0 && !!Elf.components.loading.root){
                Elf.effects.hidden(Elf.components.loading.root,null,function(){
                    Elf.components.loading.root=Elf.utils.remove(Elf.components.loading.root);
                });
            }
        }
    });
})(Elf);