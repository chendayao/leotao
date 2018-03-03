/**
 * Created by chenyao on 2018/3/2.
 */
//进度条功能
//禁用进度环
NProgress.configure({ showSpinner:false });

//注册一个全局的ajaxStart事件，所有的ajax在开启的时候，会触发这个事件
$(document).ajaxStart(function(){
    NProgress.start();
})
$(document).ajaxStop(function(){
    setTimeout(function(){
        //进度条完成
        NProgress.done();
    },500);
});
//非登陆页面，判断当前用户是否是登录了，如果登录了，就继续，如果没登陆，需要跳转到登录页面。
if(location.href.indexOf('login.html')== -1){
    $.ajax({
        type:'get',
        url:'/employee/checkRootLogin',
        success:function(data){
            if(data.error===400){
                location.href ="login.html";
            }
        }
    })
}
