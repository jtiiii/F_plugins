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
    },
    /**
     * 获得basePath路径
     */
    getBasePath:function(){
        var projectPath = window.location.pathname == 'null'?'':window.location.pathname.substring(0,window.location.pathname.indexOf('/',1));
        var serverPath = window.location.origin;
        var basePath = serverPath + projectPath;
        return basePath;
    }
}