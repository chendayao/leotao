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

