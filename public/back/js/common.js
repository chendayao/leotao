/**
 * Created by chenyao on 2018/3/2.
 */
$(function(){
//����������
//���ý��Ȼ�
NProgress.configure({ showSpinner:false });

//ע��һ��ȫ�ֵ�ajaxStart�¼������е�ajax�ڿ�����ʱ�򣬻ᴥ������¼�
    $(document).ajaxStart(function(){
        NProgress.start();
    });
    $(document).ajaxStop(function(){
        setTimeout(function(){
            NProgress.done();
        },500)
    });

//�����˵�����ʾ������
//˼·�� �ҵ����������a��ǩ
  $('.child').prev().on('click',function(){
      $(this).next().slideToggle();
  })

//�ҵ�icon_menuע�����¼�
  $('.icon_menu').on('click',function(){
      $('.lt_aside').toggleClass('now');
      $('.lt_main').toggleClass('now');

  })
//�˳�����
    $('.icon_logout').on('click',function(){
        $('#logoutModal').modal('show');
    });

//��Ҫ���¼�����ע���¼�
  $('.btn_logout').on('click',function(){
      $.ajax({
          type:'GET',
          url:'/employee/employeeLogout',
          success:function(info){
              //console.log(info);
              if(info.success){
                  location.href='login.html';
              }
          }
      })
  });

//�ǵ�½ҳ�棬�жϵ�ǰ�û��Ƿ��ǵ�¼�ˣ������¼�ˣ��ͼ��������û��½����Ҫ��ת����¼ҳ�档
    if(location.href.indexOf('login.html')==-1){
        $.ajax({
            type:'GET',
            url:'/employee/checkRootLogin',
            success:function(info){
                //console.log(info);
                if(info.error===400){
                    location.href='login.html';
                }
            }
        })
    }

})
