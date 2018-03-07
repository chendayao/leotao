/**
 * Created by chenyao on 2018/3/7.
 */
$(function(){
    //1. 从本地缓存中获取到需要渲染的数据
    function getHistory(){
        var history = localStorage.getItem("search_list")||'[]';
        var arr =JSON.parse(history);
        return arr;
    }

    function render(){
        var arr = getHistory();
        //console.log(arr);
        $('.lt_history').html(template('tem',{arr:arr}))

    }
    render();

    //功能二：清空
    //1. 给清空按钮注册点击事件(委托)
    //2. 清空 search_list 这个值
    //3. 重新渲染
    $('.lt_history').on('click','.empty_btn',function(){
        mui.confirm("你确定清空所有数据吗?","温馨提示",['是','否'],function(e){
            //console.log(e.index);
            if(e.index===0){
                localStorage.removeItem('search_list');
                render();
            }
        });
    });
    //功能3：删除
    //1. 给删除按钮注册点击事件
    //2. 获取到删除的下标
    //3. 获取到web存储中的数组
    //4. 删除数组中对应下标那项
    //5. 重新设置search_list的值
    //6. 重新渲染。
    $('.lt_history').on('click','.btn_delete',function(){
        var that = $(this);
        mui.confirm('你确定清除此行数据吗?','温馨提示',['是','否'],function(e){
            if(e.index===0){
                //console.log(e.index);
                var index = that.data('index');
                var arr = getHistory();
                arr.splice(index,1);
                localStorage.setItem('search_list',JSON.stringify(arr));
                render();
            }

        })

    })

    //功能4： 增加
    //1. 给搜索按钮注册事件
    //2. 获取到文本框value值
    //3. 获取到存储中的数组
    //4. 把value值添加到数组中的最前面
    //5. 重新设置search_list的值
    //6. 重新渲染 （跳转到搜索详情页）
    $('.btn_search').on('click',function(){
        var text = $('.search_input').val().trim();
        if(text===""){
            mui.toast('请输入搜索关键词');
            return;
        }
        var arr = getHistory();
        var copy = arr.indexOf(text);
        console.log(copy);
        if(copy != -1){
            arr.splice(copy,1);
        }
        if(arr.length>=10){
            arr.pop()
        }
        arr.unshift(text);
        localStorage.setItem('search_list',JSON.stringify(arr));
        location.href = "searchList.html?key="+text;
        //render();
    })




})