$(function(){
    // 柱状图图标点击出现弹框显示图表
	$('.bar-one').click(function(){
        $('#shade').show();
        $('.tab-right').show();
        $('#bar-chart').show();
        $('#bubble-chart').hide();
        $('.bar-two').attr('src','img/bar-active.png'); 
        $('.bubble-two').attr('src','img/buble.png');  
    })
    // 气泡图图标点击出现弹框显示图表
    $('.bubble-one').click(function(){
        $('#shade').show();
        $('.tab-right').show();
        $('#bubble-chart').show();
        $('#bar-chart').hide(); 
        $('.bubble-two').attr('src','img/bubble-active.png'); 
        $('.bar-two').attr('src','img/bar.png');     
    })
    // 关闭图标点击关闭弹框
    $('.close').click(function(){
        $('#shade').hide();
        $('.tab-right').hide();
        $(this).parent().hide();
    })
    // 地图图标点击关闭弹框
    $('.map').click(function(){
        $('#shade').hide();
        $('.tab-right').hide();
        $('#bubble-chart').hide();
        $('#bar-chart').hide();    
    })
    // 柱状图图标点击由气泡图切换成柱状图
    $('.bar-two').click(function(){
        $(this).attr('src','img/bar-active.png');  
        $('.bubble-two').attr('src','img/buble.png'); 
        $('#bar-chart').show();
        $('#bubble-chart').hide();
    })
     // 气泡图图标点击由柱状图切换成气泡图
    $('.bubble-two').click(function(){
        $(this).attr('src','img/bubble-active.png'); 
        $('.bar-two').attr('src','img/bar.png');  
        $('#bubble-chart').show();
        $('#bar-chart').hide();
    })
    // 
    $('.pageList>li>a').click(function(){
        $(this).parent().addClass('pageListActive');
        $(this).parent().siblings().removeClass('pageListActive');
        $('.baseList>li').removeClass('pageListActive');
    })
    $('.baseList>li').click(function(){
        $(this).addClass('pageListActive');
        $(this).siblings().removeClass('pageListActive');
        $('.pageList>li>a').removeClass('pageListActive');
    })
    $('.emissionList>ul>li').click(function(){
        $(this).addClass('emissionListActive');
        $(this).siblings().removeClass('emissionListActive');
    })
})
