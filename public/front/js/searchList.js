/**
 * Created by chenyao on 2018/3/7.
 */
$(function(){
    //功能一：将地址栏中的key属性放到input框
   var key = getSearch("key");
    //console.log(key);
    $('.search_input').val(key);

    //发送ajax请求，获取关键字对应的商品，渲染出来
    function render(){
        var obj={};
        obj.proName = key;
        obj.page = 1;
        obj.pageSize = 100;

        var sort = $(".lt_sort a.now");
        if(sort.length > 0){
            var sortName = sort.data("type");
            //根据箭头来确定传递的具体的值。判断sort下的span是否有fa-angle-down这个类
            var sortValue = sort.find('span').hasClass('fa-angle-down')?2:1;
            console.log(sortValue);
            obj[sortName] = sortValue;
        }
        $.ajax({
            type:'get',
            url:'/product/queryProduct',
            data:obj,
            success:function(info){
                console.log(info);
                $('.lt_product').html(template('tem',info));
            }
        })

    }
    render();
//功能二：点击搜索按钮
    //1. 直接获取到input框中的value值
    //2. 再次发送ajax请求。
    $('.btn_search').on('click',function(){
        $('.lt_sort a.now').removeClass('now').find('span').removeClass('fa-angle-up').addClass('fa-angle-down');
        key=$('.lt_search .search_input').val();
        render();
    })

    //功能三：排序功能
    //1. 给lt_sort下的a注册点击事件
    //2. 判断点击的a是否有now这个类，
    // 如果没有,加上now这个类，并且删除其他a的类, 让所有的箭头都向下
    // 如果有，改变这个a下的span的箭头方向
    $('.lt_sort a[data-type]').on('click',function(){
        $this=$(this);
        if($this.hasClass('now')){
            $this.find('span').toggleClass('fa-angle-up').toggleClass('fa-angle-down');
        }else{

            $this.addClass("now").siblings().removeClass("now");
            $('.lt_sort span').removeClass('fa-angle-up').addClass('fa-angle-down');
        }
        render();
    })


})