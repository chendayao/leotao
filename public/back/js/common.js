/**
 * Created by chenyao on 2018/3/2.
 */
//����������
//���ý��Ȼ�
NProgress.configure({ showSpinner:false });

//ע��һ��ȫ�ֵ�ajaxStart�¼������е�ajax�ڿ�����ʱ�򣬻ᴥ������¼�
$(document).ajaxStart(function(){
    NProgress.start();
})
$(document).ajaxStop(function(){
    setTimeout(function(){
        //���������
        NProgress.done();
    },500);
});
//�ǵ�½ҳ�棬�жϵ�ǰ�û��Ƿ��ǵ�¼�ˣ������¼�ˣ��ͼ��������û��½����Ҫ��ת����¼ҳ�档
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
