/**
 * 使用bootstrap风格的dialog插件
 * 前置：jquery,bootstrap,F_dragOn
 * @param contentJq
 * @param options
 * @constructor
 */
function F_BootstrapDialog(contentJq,options) {
    this.$ = {
        window:$('<div class="dialog-window" style="display: none;"></div>'),
        panel:$('<div class="panel panel-info"></div>'),
        heading:$('<div class="dialog-panel-heading panel-heading"></div>'),
        content:$(contentJq),
        closeBtn:$('<a class="dialog-close-button" href ="javascript:void(0);" title="close"></a>')
    };
    this.options = {
        title: '窗口',
        onClose: null,
        onOpen: null,
        width:300,
        height:150
    };
    this._init(options);
    contentJq.data('F_BootstrapDialog','init');
}
F_BootstrapDialog.prototype = {
    constructor:F_BootstrapDialog,
    reInit:function(options){
        replaceProperty(this.options,options);
        this._resetCss();
        this.$.heading.empty();
        this.$.heading.append('<span>'+this.options.title+'</span>');
        this.$.heading.append(this.$.closeBtn);
    },
    _init: function (options) {
        replaceProperty(this.options,options);
        this._resetCss();
        this.$.heading.append('<span>'+this.options.title+'</span>');
        this.$.closeBtn.bind('click', this.close.bind(this, [this.options.onClose]));
        this.$.heading.append(this.$.closeBtn);
        this.$.panel.append(this.$.heading);
        this.$.panel.append(this.$.content);
        this.$.window.append(this.$.panel);
        $('body').append(this.$.window);
    },
    close: function (callback) {
        // this.windowJq.css('display', 'none');
        this.$.window.fadeOut(200);
        if (typeof callback == 'function') {
            callback(this);
        }
    },
    open: function (callback) {
        // this.windowJq.css('display', 'block');
        this.$.window.fadeIn("800");
        if (typeof callback == 'function') {
            callback(this);
        }
    },
    _resetCss:function(){
        if (!this.$.content.hasClass('panel-body')) {
            this.$.content.addClass('panel-body');
        }
        var left = (window.innerWidth-parseInt(this.options.width))/2;
        var top = (window.innerHeight-parseInt(this.options.height))/2;
        this.$.window.css({
            'width':this.options.width+'px',
            'height':this.options.height+'px',
            'left': left+'px',
            'top':top+'px'
        });
    },
    dragOn:function(){
        //开启拖动，需要F_dragOn的支持
        DragOn.openDrag(this.$.heading[0],this.$.window[0]);
    }
};

function replaceProperty(target,source){
    if(source){
        $.each(target,function(key){
            if(source[key]){
                target[key] = source[key];
            }
        });
    }
}