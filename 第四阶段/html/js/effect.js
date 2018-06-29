$(function(){
	addScroll()

	$(".monitor-infor").find(".ps-scrollbar-y").css({"background-color":"#1e6ffc","height":"326"});
	$(".monitor-infor").find(".ps-scrollbar-y-rail").css({"opacity":'0.6'});
	$(".monitor-infor").find(".ps-container").addClass('ps-active-y');

	$(".pop1-content").find(".ps-scrollbar-y").css({"background-color":"#1e6ffc","height":"326"});
	$(".pop1-content").find(".ps-scrollbar-y-rail").css({"opacity":'0.6'});
	$(".pop1-content").find(".ps-container").addClass('ps-active-y');

	$(".tab3-content").find(".ps-scrollbar-y").css({"background-color":"#1e6ffc","height":"204"});
	$(".tab3-content").find(".ps-scrollbar-y-rail").css({"opacity":'0.6'});
	$(".tab3-content").find(".ps-container").addClass('ps-active-y');
	
	$(".exchange-bottom").find(".ps-scrollbar-y").css({"background-color":"#1e6ffc","height":"309"});
	$(".exchange-bottom").find(".ps-scrollbar-y-rail").css({"opacity":'0.6'});
	$(".exchange-bottom").find(".ps-container").addClass('ps-active-y');

	function addScroll(){
		if($('.addScroll').length>0){
			$('.addScroll').perfectScrollbar();
		}
	}

	topResize('.monitor-table','.table-parent',42);
	topResize('.table5','.table6-parent',9)
	topResize('.elec-table1','.elec-parent',23)
	function topResize(class1,class2,h1){
		window.addEventListener("resize",function(){
	       var  table1H = $(class1).height();
	       $(class2).css('top',(table1H+h1)+'px');
	    });
	}
	
	tabClick('.item1','.step1');
	tabClick('.item2','.step2');
	tabClick('.item3','.step3');
	tabClick('.item5','.step5');
	function tabClick(class1,class2){
		$(class1).click(function(){
			$(class2).show().siblings().hide();
			$(this).children('img').attr('src','img/dot1.png');
			$(this).prevAll().children('img').attr('src','img/dot3.png');
			$(this).nextAll().children('img').attr('src','img/dot2.png');
		})
	}

	
})

