/**
 * Created by chenyao on 2018/3/5.
 */
mui('.mui-scroll-wrapper').scroll({
    indicators:false//�������ܷ����
});
//�ֲ�ͼ
//���slider�������
var gallery = mui('.mui-slider');
gallery.slider({
    interval:2000//�Զ��ֲ����ڣ���Ϊ0���Զ����ţ�Ĭ��Ϊ0��
});

//��ȡ��ַ���е�����
function getSearch(key){
    //�ӵ�ַ����ȡ����
    var search = location.search;
    //���н���
    search = decodeURI(search);
    //ȥ���ʺ�
    search = search.slice(1);
    //���ַ����и������
    var arr = search.split('&');
    var obj ={};
    arr.forEach(function(element,index){
        var k = element.split('=')[0];
        var v = element.split('=')[1];
        obj[k]=v;
    })
    return obj[key];
}


