/**
 * Created by chenyao on 2018/3/6.
 */
$(function(){

    var page = 1;
    var pageSize = 5;
    var render=function(){
        $.ajax({
            type:'get',
            url:"/product/queryProductDetailList",
            data:{
                page:page,
                pageSize:pageSize
            },
            success:function(info){
                //console.log(info);
                $("tbody").html(template('product',info));
                $('#pagintor').bootstrapPaginator({
                    bootstrapMajorVersion:3,
                    currentPage:page,
                    totalPages:Math.ceil(info.total/info.size),
                    size:"normal",
                    itemTexts:function(type,page,current){
                        switch(type){
                            case "first":
                                return "首页";
                            case "prev":
                                return "上一页";
                            case "next":
                                return "下一页";
                            case "last":
                                return "尾页";
                            default:
                                return "第"+page+"页";
                        }

                    },
                    tooltipTitles:function(type,page,current){
                        switch(type){
                            case 'first':
                                return '首页';
                            case 'next':
                                return '下一页';
                            case 'prev':
                                return '上一页';
                            case 'last':
                                return '尾页';
                            default:
                                return '第'+page+'页';
                        }
                    },
                    useBootstrapTooltip:true,
                    onPageClicked:function(event,oritinalEvent,type,p){
                        page = p
                        render();
                    }


                })
            }
        })
    }
    render();

    ////添加商品模态框
    $('.btn_add').click(function(){
        $('#addModal').modal('show');
        //发送ajax，渲染二级分类的数据
        $.ajax({
            type:'get',
            url:'/category/querySecondCategoryPaging',
            data:{
                page:1,
                pageSize:100
            },
            success:function(info){
                console.log(info);
                $('.dropdown-menu').html(template('scategory',info));
            }
        })
    })

    //2. 给dropdown-menu下的a注册事件
    $('.dropdown-menu').on('click','a',function(){
       $('.choose_one').html($(this).text());
       $('[ name="brandId"]').html($(this).data('id'));
        //3. 让brandId校验成功
       $("form").data("bootstrapValidator").updateStatus("brandId", "VALID");
    })
    //3. 初始化图片上传
    $('#fileupload').fileupload({
        dataType:'json',
        done:function(e,data){
            if(result.length>=3){
                return;
            }
            //1. 获取到上传的图片地址， 往img_box里面添加图片
            var pic = data.result.picAddr;
            $('.img_box').append('<img src="'+pic+'" width="100" height="100" alt="">');
            result.push(data.result);
            if(result.length === 3){
                $('form').data('bootstrapValidator').updateStatus('productLogo','VALID');
            }else{
                $('form').data('bootstrapValidator').updateStatus('productLogo','INVALID');
            }
        }
    })
    //表单验证
    var $form = $('form');
    $form.bootstrapValidator({
        excluded:[],
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        //配置校验规则
        fields:{

            brandId:{
                validators:{
                    notEmpty:{
                        message:"请选择品牌"
                    }
                }
            },
            proName:{
                validators:{
                    notEmpty:{
                        message:"请输入商品名称"
                    }
                }
            },
            proDesc:{
                validators:{
                    notEmpty:{
                        message:"请输入商品描述"
                    }
                }
            },
            num: {
                validators: {
                    //非空
                    notEmpty: {
                        message: "请输入商品库存"
                    },
                    //必须是非零开头的数字
                    regexp: {
                        regexp: /^[1-9]\d*$/,
                        message: "请输入一个有效的商品库存"
                    }
                }
            },
            size:{
                validators:{
                    //非空
                    notEmpty:{
                        message:"请输入商品尺码"
                    },
                    //要求：2位数字-2位数字
                    regexp:{
                        regexp:/^\d{2}-\d{2}$/,
                        message:"请输入一个合法的尺码（例如32-44）"
                    }
                }
            },
            oldPrice:{
                validators:{
                    notEmpty:{
                        message:"请输入商品原价"
                    }
                }
            },
            price:{
                validators:{
                    notEmpty:{
                        message:"请输入商品价格"
                    }
                }
            },
            productLogo: {
                validators:{
                    notEmpty:{
                        message:"请上传3张图片"
                    }
                }
            }
        }
    });
    //给表单注册一个校验成功的事件
    $('form').on('success.form.bv',function(e){
        e.preventDefault();
        var param = $form.serialize();

        param += "&picName1="+result[0].picName + "&picAddr1="+result[0].picAddr;
        param += "&picName2="+result[1].picName + "&picAddr2="+result[1].picAddr;
        param += "&picName3="+result[2].picName + "&picAddr3="+result[2].picAddr;

        $.ajax({
            type:'post',
            url:'/product/addProduct',
            data: param,
            success:function (info) {
                if(info.success) {
                    //1. 关闭模态框
                    $("#productModal").modal('hide');
                    //2. 重新渲染第一页
                    page = 1;
                    render();

                    //3. 重置样式
                    $("form").data("bootstrapValidator").resetForm(true);
                    $(".dropdown_text").text("请选择二级分类");
                    $(".img_box img").remove();

                    result = [];
                }
            }
        })
    })

})