/**
 * Created by chenyao on 2018/3/2.
 */
$(function(){
    // ��У��
    $('form').bootstrapValidator({
        fields:{
            username:{
                validators:{
                    notEmpty:{
                        message:'�û�������Ϊ��'
                    },
                    stringLength:{
                        min:2,
                        max:6,
                        message:'����Ӧ����2-6λ'
                    },
                    callback:{
                        message:'�û�������'
                    }
                }
            },
            password:{
                validators:{
                    notEmpty:{
                        message:'���벻��Ϊ��'
                    },
                    stringLength:{
                        min:6,
                        max:12,
                        message:'���볤��Ӧ��6-12λ'
                    },
                    callback:{
                        message:'�������'
                    }

                }

            }
        },
        //����Сͼ��,�ɹ� ʧ�� У����
       feedbackIcons:{
           valid: 'glyphicon glyphicon-ok',
           invalid:'glyphicon glyphicon-remove',
           validating:'glyphicon glyphicon-refresh'
       },
    })
    $('form').on('success.form.bv',function(e){
        //��ֹ�������Ĭ����Ϊ
        e.preventDefault();
    //����ajax�����¼
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
    //���ñ�,������е���ʽ
    $('[type=reset]').on('click',function(){
        $('form').data('bootstrapValidator').resetForm(true);
    })
})



