
var DragOn = {
    openDrag:function(dragDom,moveDom){
        $(dragDom).bind('mousedown',function(evt){
            var subX = evt.pageX - parseInt($(moveDom).css("left"));
            var subY = evt.pageY - parseInt($(moveDom).css("top"));
            $(this).data('dragSubX',subX);
            $(this).data('dragSubY',subY);
            $(this).data('dragOn',true);
        });
        $(document).bind('mousemove',function(evt){
            if(!$(dragDom).data('dragOn')){
                return;
            }
            var subX = $(dragDom).data('dragSubX');
            var subY = $(dragDom).data('dragSubY');

            $(moveDom).css({'left':evt.pageX-subX,'top':evt.pageY-subY});
        });
        $(dragDom).bind('mouseup',function(evt){
            $(this).data('dragOn',false);
        });
    }
};