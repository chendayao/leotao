/**
 * Created by chenyao on 2018/3/5.
 */
mui('.mui-scroll-wrapper').scroll({
    indicators:false//滚动条能否出现
});
//轮播图
//获得slider插件对象
var gallery = mui('.mui-slider');
gallery.slider({
    interval:2000//自动轮播周期，若为0则不自动播放，默认为0；
});

//截取地址栏中的数据
function getSearch(key){
    //从地址栏获取参数
    var search = location.search;
    //进行解码
    search = decodeURI(search);
    //去掉问号
    search = search.slice(1);
    //把字符串切割成数组
    var arr = search.split('&');
    var obj ={};
    arr.forEach(function(element,index){
        var k = element.split('=')[0];
        var v = element.split('=')[1];
        obj[k]=v;
    })
    return obj[key];
}


