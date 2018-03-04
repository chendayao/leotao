/**
 * Created by chenyao on 2018/3/2.
 */
$(function(){
//进度条功能
//禁用进度环
NProgress.configure({ showSpinner:false });

//注册一个全局的ajaxStart事件，所有的ajax在开启的时候，会触发这个事件
    $(document).ajaxStart(function(){
        NProgress.start();
    });
    $(document).ajaxStop(function(){
        setTimeout(function(){
            NProgress.done();
        },500)
    });

//二级菜单的显示与隐藏
//思路： 找到二级分类的a标签
  $('.child').prev().on('click',function(){
      $(this).next().slideToggle();
  })

//找到icon_menu注册点击事件
  $('.icon_menu').on('click',function(){
      $('.lt_aside').toggleClass('now');
      $('.lt_main').toggleClass('now');

  })
//退出功能
    $('.icon_logout').on('click',function(){
        $('#logoutModal').modal('show');
    });

//不要在事件里面注册事件
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

//非登陆页面，判断当前用户是否是登录了，如果登录了，就继续，如果没登陆，需要跳转到登录页面。
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
