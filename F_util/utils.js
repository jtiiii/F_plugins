/**
 * 工具包类
 * 依赖：jquery
 */
var F_utils={
    /**
     * 覆盖对象中相同的属性
     * @param target
     * @param source
     */
    replaceProperty:function(target,source){
        if(source){
            $.each(target,function(key){
                if(source[key]){
                    target[key] = source[key];
                }
            });
        }
    }
}