/**
 * Created by chenyao on 2018/3/6.
 */
//获取二级分类列表
$(function(){
    var page = 1;
    var pageSize = 5;
   var render = function(){

       $.ajax({
           type:'get',
           url:'/category/querySecondCategoryPaging',
           data:{
               page:page,
               pageSize:pageSize
           },
           success:function(info) {
               //console.log(info);
               $('tbody').html(template('secondCategory', info));
               $('#pagintor').bootstrapPaginator({
                   bootstrapMajorVersion:3,
                   currentPage:page,
                   totalPages:Math.ceil(info.total/pageSize),
                   onPageClicked:function(event, originalEvent, type,p) {
                       //为按钮绑定点击事件 page:当前点击的按钮值
                       page = p,
                       render()

                   }
               })
           }
       })

   }
    render();

    //添加分类
    $('.btn_add').on('click',function(){
        $('#addModal').modal('show');
        $.ajax({
            type:'get',
            url:'/category/queryTopCategoryPaging',
            data:{
                page:1,
                pageSize:100
            },
            success:function(info){
                //console.log(info);
                $('.dropdown-menu').html(template('category',info))

            }
        })
    })
    //给下拉列表所有a注册事件
    $('.dropdown-menu').on('click',"a",function(){
        var text = $(this).text();
        $('.choose_one').html(text);
        var id = $(this).data('id');
        $('[name="categoryId"]').val(id);
        //3. 让categoryId校验变成成功
       //$form.data('bootstrapValidator').updateStatus('categoryId',"VALID");
       $form.data("bootstrapValidator").updateStatus("categoryId", "VALID");

    })
    //初始化图片上传
    $("#fileup").fileupload({
        dataType:"json",
        //e：事件对象
        //data：图片上传后的对象，通过e.result.picAddr可以获取上传后的图片地址
        done:function (e, data) {
            console.log(data);
            $('.img_box img').attr('src',data.result.picAddr);
            $('[name="brandLogo"]').val(data.result.picAddr);
            $form.data('bootstrapValidator').updateStatus('brandLogo','VALID');
        }
    });
    var $form = $('form');
    $form.bootstrapValidator({
        excluded:[],
        feedbackIcons:{
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        //校验规则
        fields: {
            categoryId: {
                validators: {
                    notEmpty: {
                        message: "请选择一级分类"
                    }
                }
            },
            brandName: {
                validators: {
                    notEmpty: {
                        message: "请输入二级分类的名称"
                    }
                }
            },
            brandLogo: {
                validators: {
                    notEmpty: {
                        message: "请上传品牌图片"
                    }
                }
            }
        }
    })




     //给表单注册校验成功事件
    $form.on('success.form.bv',function(e){
        e.preventDefault();
        $.ajax({
            type:'post',
            url:'/category/addSecondCategory',
            data:$form.serialize(),
            success:function(info){
                console.log(info)
                if(info.success){
                    $('#addModal').modal('hide');
                    page=1;
                    render();
                    //重置内容和样式
                    $form.data("bootstrapValidator").resetForm(true);
                     //4. 重置下拉框组件和图片
                    $('.choose_one').text('请选择一级分类');
                    $(".img_box img").attr("src", "images/none.png");
                }
            }
        })
    })




})



