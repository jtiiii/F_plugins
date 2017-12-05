/**
 * 页脚插件
 * 依赖：jquery.js,F_utils
 * @param $ul
 * @param options
 * @constructor
 */
function F_footer($ul,options){
    this.$ul = $ul;
    this.options={
        active:0,
        items:[
            {text:1}
        ],
        maxShow:5,
        onResetActive:null
    };
    this._init(options);
}

F_footer.prototype = {
    constructor:F_footer,
    _init:function(options){
        F_utils.replaceProperty(this.options,options);
        if(!this.$ul.hasClass('f_footer')){
            this.$ul.addClass('f_footer');
        }
        this.resetItems(this.options.items,this.options.active);
    },
    resetActive:function(active){
        this.resetItems(this.options.items,active);
        if(typeof this.options.onResetActive == 'function'){
            this.options.onResetActive(active,this.options.items[this.options.active]);
        }
    },
    resetItems:function(items,active){
        if(active !=undefined){
            if(active < 0){
                active = 0;
            }
            if(active > items.length-1){
                active = items.length-1;
            }
            this.options.items[this.options.active].active = false;
            this.options.active = active;
        }
        this.options.items = items;
        var firstAndEnd = this._generatorFirsAndEnd();
        var upAndDown = this._generatorUpAndDown();
        var lis = [];
        lis.push(firstAndEnd[0]);
        lis.push(upAndDown[0]);
        lis = lis.concat(this._initItems(this.options.items));
        lis.push(upAndDown[1]);
        lis.push(firstAndEnd[1]);
        this.$ul.empty();
        this.$ul.append(lis);
    },
    _initItems:function(items){
        var upAndDownMore = this._generatorUpAndDownMore();
        var lis = [];
        var range = parseInt(this.options.maxShow/2);
        var start = this.options.active - range;
        if(start <= 0){
            start = 0;
        }
        var end = start + this.options.maxShow - 1;
        if(end >= items.length-1){
            end = items.length-1;
            if(end-this.options.maxShow+1 >= 0){
                start = end-this.options.maxShow+1;
            }
        }
        $.each(items.slice(start,end+1),function(index,item){
            var key = start+index;
            if(key == this.options.active){
                item.active = true;
            }else{
                item.active = false;
            }
            lis.push(this._initItem(key,item));
        }.bind(this));
        if(start != 0){
            lis.unshift(upAndDownMore[0]);
        }
        if(end != items.length-1){
            lis.push(upAndDownMore[1]);
        }

        return lis;
    },
    _initItem:function(key,item){
        var li = $('<li><button class="f_button-default">'+item.text+'</button></li>');
        li.bind('click',function(){
            if(li.hasClass('active')){
                return;
            }
            this.resetActive(key);
        }.bind(this));
        if(item.active){
            li.addClass('active');
        }
        return li;
    },
    _generatorUpAndDownMore:function () {
        var upMore = $('<li class="upMore"><button class="f_button-default">...</button></li>');
        upMore.bind('click',function(){
            this.resetActive(this.options.active - this.options.maxShow);
        }.bind(this));
        var downMore = $('<li class="downMore"><button class="f_button-default">...</button></li>');
        downMore.bind('click',function(){
            this.resetActive(this.options.active + this.options.maxShow);
        }.bind(this));
        return [upMore,downMore];
    },
    _generatorFirsAndEnd:function(){
        var first = $('<li class="firstOrEnd"><button class="f_button-default"><<</button></li>');
        first.bind('click',function(){
            this.resetActive(0);
        }.bind(this));
        var end = $('<li class="firstOrEnd"><button class="f_button-default">>></button></li>');
        end.bind('click',function(){
            this.resetActive(this.options.items.length-1);
        }.bind(this));
        return [first,end];
    },
    _generatorUpAndDown:function(){
        var up = $('<li class="upOrDown"><button class="f_button-default"><</button></li>');
        up.bind('click',function(){
            this.resetActive(this.options.active - 1);
        }.bind(this));
        var down = $('<li class="upOrDown"><button class="f_button-default">></button></li>');
        down.bind('click',function(){
            this.resetActive(this.options.active + 1);
        }.bind(this));
        return [up,down];
    }
};