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
    },
    /**
     * 判断一个数据是否有效
     * 无效的数据:
     *  number -- NaN
     *  object -- {},[],null
     *  string -- ''
     *  undefined
     * @param data
     * @returns {boolean}
     */
    isBlank:function (data) {
        var type = typeof data;
        switch(type) {
            case 'number':
                if(data || data == 0){
                    return false;
                }
                return true;
            case 'undefined':
                return true;
            case 'string':
                return !Boolean(data);
            case 'object':
                return $.isEmptyObject(data);
            default:return false;
        }
    },
    /**
     * 获得表单中需要提交的元素的值
     * @param formJq
     * @returns {{}}
     */
    getFormData : function(formJq){
        var keys = formJq.serializeArray();
        var param = {};
        $.each(keys,function(index,key){
            param[key.name] = key.value;
        });
        return param;
    },
    /**
     * 递归显示
     * @param domArr
     * @param index
     */
    showDomRecursive:function (domArr,index){
    var dom =domArr[index];
    if(index < domArr.length-1){
        index++;
        dom.fadeIn(300);
        setTimeout(function(){
            this.showDomRecursive(domArr,index);
        }.bind(this),100);
    }
}
};