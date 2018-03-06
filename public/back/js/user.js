/**
 * Created by chenyao on 2018/3/4.
 */
$(function(){
    var page=1;
    var pageSize=5;
    function render(){
    $.ajax({
        type:'GET',
        url:'/user/queryUser',
        data:{
            page:page,
            pageSize:pageSize
        },
        success:function(info){
            console.log(info);
            $('tbody').html(template('user_tel',info))
              $('#paginator').bootstrapPaginator({
                  bootstrapMajorVersion:3,
                  currentPage:page,
                  totalPages: Math.ceil(info.total/pageSize),
                  //numberOfPages:5,设置控件显示的页码数
                  onPageClicked:function(a,b,c,p){
                      page=p;
                      render();
                }
            });
        }
    })
    }
    render();
    //禁用用户
    $('tbody').on('click','.btn',function(){
        $('#userModal').modal('show');
        var id = $(this).parent().data('id');
        var isDelete = $(this).hasClass("btn-success")?1:0
        $('.btn_confirm').off().on('click',function(){
            $.ajax({
                type:'POST',
                url:'/user/updateUser',
                data:{
                    id:id,
                    isDelete:isDelete
                },
                success:function(info){
                    if(info.success){
                        $('#userModal').modal('hide');
                        render();
                    }
                }
            })
        })
    })
})
