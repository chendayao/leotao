/**
 * Created by chenyao on 2018/3/6.
 */
$(function(){
    var page = 1;
    var pageSize = 5;
    var render = function (){
        $.ajax({
            type:'get',
            url:'/category/queryTopCategoryPaging',
            data:{
                page:page,
                pageSize:pageSize
            },
            success:function(info){
                //console.log(info);
                $("tbody").html(template('category',info));
                //渲染分页
                $("#pagintor").bootstrapPaginator({
                    bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
                    currentPage:page,//当前页
                    totalPages:Math.ceil(info.total/info.size),//总页数
                    onPageClicked:function(event, originalEvent, type,p){
                        //为按钮绑定点击事件 page:当前点击的按钮值
                        page = p
                        render();
                    }
                });

            }
        })

    }
    render();

    //添加分类功能
    $('.btn_add').click(function(){
        $('#addModal').modal('show');
    })
//初始化表单校验
    var $form = $('form');
    $form.bootstrapValidator({
        excluded:[],
        feedbackIcons:{
            valid:'glyphicon glyphicon-ok',
            invalid:'glyphicon glyphicon-remove',
            validating:'glyphicon glyphicon-refresh'
        },
        fields:{
            categoryName:{
                validators:{
                    notEmpty:{
                        message:'一级分类名称不能为空'
                    }
                }
            }

        }
    });

    ////给表单注册校验成功的事件
    $form.on('success.form.bv', function (e) {
        e.preventDefault();
        //使用ajax提交逻辑
        $.ajax({
            type:'post',
            url:'/category/addTopCategory',
            data:$form.serialize(),
            success:function(info){
                //console.log(info);
                if(info.success){
                    //关闭模态框
                    $('#addModal').modal('hide');
                    //清除表单样式
                    $form.data('bootstrapValidator').resetForm(true);
                    console.log($form);
                    console.log($form.data('bootstrapValidator'));

                    render();
                }

            }
        })
    });


})