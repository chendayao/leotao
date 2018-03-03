/**
 * Created by chenyao on 2018/3/2.
 */
$(function(){
    // 表单校验
    $('form').bootstrapValidator({
        fields:{
            username:{
                validators:{
                    notEmpty:{
                        message:'用户名不能为空'
                    },
                    stringLength:{
                        min:2,
                        max:6,
                        message:'长度应该在2-6位'
                    },
                    callback:{
                        message:'用户名错误'
                    }
                }
            },
            password:{
                validators:{
                    notEmpty:{
                        message:'密码不能为空'
                    },
                    stringLength:{
                        min:6,
                        max:12,
                        message:'密码长度应在6-12位'
                    },
                    callback:{
                        message:'密码错误'
                    }

                }

            }
        },
        //配置小图标,成功 失败 校验中
       feedbackIcons:{
           valid: 'glyphicon glyphicon-ok',
           invalid:'glyphicon glyphicon-remove',
           validating:'glyphicon glyphicon-refresh'
       },
    })
    $('form').on('success.form.bv',function(e){
        //阻止浏览器的默认行为
        e.preventDefault();
    //发送ajax请求登录
    $.ajax({
        type:'post',
        url:'/employee/employeeLogin',
        data:'$(from).serialize()',
        dataType:'json',
        success:function(info){
            if(info.error ===1000){
                $('form').data('boostrapValidator').updateStatus('username','INVALID','callback');
            }
            if(info.error===1001){
                $('form').data('boostrapValidator').updateStatus('password','INVALID','callback');
            }
            if(info.success){
                location.href = 'index.html'
            }
        }
    })
   })
    //重置表单,清除所有的样式
    $('[type=reset]').on('click',function(){
        $('form').data('bootstrapValidator').resetForm(true);
    })
})



