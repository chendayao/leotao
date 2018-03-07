/**
 * Created by chenyao on 2018/3/5.
 */
$(function(){
    //获取一级分类
    $.ajax({
        type:'GET',
        url:'/category/queryTopCategory',
        success:function(info){
            //console.log(info);
            $('.nav').html(template('category',info));
            //console.log(info.rows[0].id);
            render(info.rows[0].id);
        }

    })
    function render(id){
        $.ajax({
            type:'get',
            url:'/category/querySecondCategory',
            data:{
                id:id
            },
            success:function(info){
                //console.log(info);
                $('.right_content ul').html(template('content',info))
            }

        })
    }
    //给一级分类注册点击事件
    $('.left_nav ul').on('click','li',function(){
        console.log($(this));
        $(this).addClass("now").siblings().removeClass("now");
        var id = $(this).data('id');
        //console.log(id);
        render(id);
        //让右边的区域滚动滚回 0，0
        mui('.mui-scroll-wrapper').scroll()[1].scrollTo(0,0,500);

    })

})
