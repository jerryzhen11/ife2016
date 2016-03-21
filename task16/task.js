/**
 * Created by caffrey_xu on 2016/3/21.
 */
/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};
var num=-1;

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
    var key= $.trim($('#aqi-city-input').val());
    var value= $.trim($('#aqi-value-input').val());
    var reg_key=/^[A-Za-z\u4e00-\u9fa5]{0,}$/;
    var reg_value=/^[0-9]{0,}$/;
    if(!reg_key.test(key)){
        alert("城市名必须为中英文字符");
    }else if(!reg_value.test(value)){
        alert("指数必须为数字");
    }else{
        aqiData[key]=value;
        num++;
    }
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
    $('#aqi-table').html("<tr> <td>城市</td><td>空气质量</td><td>操作</td></tr>");
    if(aqiData){
        $.each(aqiData,function(key,value){
            $('#aqi-table').append("<tr><td>"+key+"</td><td>"+value+"</td><td><button num='"+num+"' class='del'>删除</button></td></tr>");
        })
    }
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
    addAqiData();
    renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(no) {
    // do sth.
    var key=$('.del').eq(no).parent().prev().prev().html();
    delete  aqiData[key];
    num--;
    renderAqiList();
}

function init() {
    $('#add-btn').on('click',function(){
      addBtnHandle();
    });
    $('#aqi-table').on('click','.del',function(){
        var no=$(this).attr('num');
        delBtnHandle(no);
    });
    // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数

    // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数

}

init();