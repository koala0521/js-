/*
 * Created by lijianwei on 2016/8/9.
 */
Elf.svg={
    NS:"http://www.w3.org/2000/svg",
    XML_NS:"http://www.w3.org/2000/xmlns/",
    X_LINK_NS:'http://www.w3.org/1999/xlink',
    ATTR_MAP:{
        "className":"class",
        "svgHref":"href",
    },
    NS_MAP:{

    },
    doc:document,
    createSVG:function(tag,params){
        var el = document.createElementNS(Elf.svg.NS,tag);
        Elf.utils.each(params,function(key,obj){
            var name=(key in Elf.svg.ATTR_MAP ? Elf.svg.ATTR_MAP[key] : key);
            if(key in Elf.svg.ATTR_MAP){
                el.setAttributeNS(Elf.svg.NS_MAP[key], name, obj);
            }else{
                el.setAttribute(name, obj);
            }
            el.setAttributeNS()
        });
        return el;
    }
};