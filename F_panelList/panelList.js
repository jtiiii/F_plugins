/**
 * 列表展示框插件
 *  前置：jquery
 * @param $dom
 * @param options
 * @constructor
 */

function F_panelList($dom,options){
    this.$dom = $dom;
    this.options = {
        id:undefined,
        items:[
            {idField:undefined,content:null,detail:null}
        ]
    };
    this._init(options);
}

F_panelList.prototype = {
    constructor:F_panelList,
    _panelId:0,
    generatorId:function(){
        return ++this._panelId;
    },
    resetItems:function(items){
        this.$dom.empty();
        this.$dom.data('panelList_id',this.options.id);
        $.each(items,function(key,item){
            var contentDetail = this._initItem(item);
            this.$dom.append(contentDetail);
        }.bind(this));
    },
    /**
     * 初始化
     * @param options
     * @private
     */
    _init:function(options){
        this.$dom.addClass("panelList");
        this.options.id != undefined && id?id:this.generatorId();
        this.options.items=options.items;
        this.resetItems(options.items);
    },
    /**
     * 初始化item
     * @param item
     * @returns {[null,null]}
     * @private
     */
    _initItem:function(item){
        var content = this._initItemContent(item);
        var detail = this._initItemDetail(item);
        content.append(this._generatorDetailBtn(detail));
        return [content,detail];
    },
    /**
     * 初始化itemContent
     * @param item
     * @returns {void|jQuery|HTMLElement}
     * @private
     */
    _initItemContent:function(item){
        var content = $('<li class="panelList-item-content"></li>');
        content.data('idFiled_item',item.idField);
        content.append(item.content);
        return content;
    },
    /**
     * 生成明细框展开收缩的控制按钮
     * @param detail
     * @returns {void|jQuery|HTMLElement}
     * @private
     */
    _generatorDetailBtn:function(detail){
        var detailBtn = $('<a class="panelList-detailBtn" href="javascript:void(0);"></a>');
        detailBtn.bind('click',function(){
            this._showOrHideDetail(detail,detailBtn);
        }.bind(this));
        return detailBtn;
    },
    /**
     * 展示或者隐藏明细框
     * @param detail
     * @param detailBtn
     * @private
     */
    _showOrHideDetail:function(detail,detailBtn){
        if(detail.data("detail_show")){
            detailBtn.css({'animation':'btn-shrink 0.2s','transform':'rotate(0deg)'});
            this._hideDetail(detail);
        }else{
            detailBtn.css({'animation':'btn-expend 0.2s','transform':'rotate(45deg)'});
            this._showDetail(detail);
        }
    },
    /**
     * 展开明细框
     * @param detail
     * @private
     */
    _showDetail:function(detail){
        var height = detail.css('height');
        detail.css('height','0px');
        detail.css('display','block');
        detail.animate({
            padding:"10px",
            height:height
        },200,function () {
            detail.data("detail_show",true);
        });
    },
    /**
     * 收缩明细框
     * @param detail
     * @private
     */
    _hideDetail:function(detail){
        var height = detail.css('height');
        detail.animate({
            height:"0px",
            padding:"0px"
        },200,function(){
            detail.css({'display':'none','height':height});
            detail.data("detail_show",false);
        });
    },
    /**
     * 初始化明细框
     * @param item
     * @returns {void|jQuery|HTMLElement}
     * @private
     */
    _initItemDetail:function(item){
        var detail = $('<li class="panelList-item-detail"></li>');
        detail.data("detail_show",false);
        detail.append(item.detail);
        return detail;
    }
};