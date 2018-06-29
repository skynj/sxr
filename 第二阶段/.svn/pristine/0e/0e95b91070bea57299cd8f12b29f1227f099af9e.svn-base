$(function(){
	// 移入div出现滚动条。移出消失
	// scroll('wait-ul');
	// scroll('news-ul-two');
	// scroll('news-ul-one');
	// function scroll(a){
	// 	$('.'+a).mouseover(function(){
	// 		$(this).css('overflow','auto');
	// 	}).mouseout(function(){
	// 		$(this).css('overflow','hidden');
	// 	})
	// }
	
	// 滚动条
	addScroll()
	function addScroll(){
		if($('.addScroll').length>0){
			$('.addScroll').perfectScrollbar();
		}
	}




	// 与以往数据相比判断是上升还是下降
	var numArray=[];
	$('.data-num>span:first-child').each(function(){
		numArray.push(parseInt($(this).html()));
	})
	imgChoose(numArray[0],15,0);
	imgChoose(numArray[1],800,1);
	imgChoose(numArray[2],50,2);
	imgChoose(numArray[3],18,3);
	imgChoose(numArray[4],60,4);
	imgChoose(numArray[5],700,5);
	
	function imgChoose(num,munimum,i){
		// console.log(num,munimum)
		if(num<munimum){
			// console.log('小于')
			$('.comparison-right>img').eq(i).attr('src','img/decline.png');
			$('.comparison-right').eq(i).addClass('decline-color').removeClass('add-color');			
		}else{
			// console.log('大于')
			$('.comparison-right>img').eq(i).attr('src','img/add.png');
			// console.log('大于1')
			$('.comparison-right').eq(i).addClass('add-color').removeClass('decline-color');
		}
	}

	// 将CO2的2变为下标
	// for(var i=0;i<$('.unit').length;i++){
	// 	var CO2=$('.unit').eq(i).text();
	// 	if(CO2.indexOf('CO2')>0){
	// 		var CONew=CO2.split('2');
	// 		$('.unit').eq(i).remove();
	// 		$('.data-num').eq(i).append('<span class="unit">'+CONew[0]+'<sub>2</sub>'+CONew[1]+'</span>');
	// 	}
	// }
	
	$('.each-tab').eq(0).click(function(){
		$('.project-pop').show();
		$('.energy-right').show();
		$('.supervision-right').hide();
		$('.contain').addClass('energy-bg');
		// $('.each-tab').eq(1).children().addClass('removeBg');
	})
	$('.each-tab').eq(1).click(function(){
		$('.project-pop').hide();
		$('.energy-right').hide();
		$('.supervision-right').show();
		$('.contain').removeClass('energy-bg');
		// $('.each-tab').eq(1).children().removeClass('removeBg');
	})

	for(var i=0;i<$('.each-tab').length;i++){
		$('.each-tab').eq(i).click(function(){			
			$(this).children().addClass('tabAcive');
			$(this).siblings().children().removeClass('tabAcive');
			$(this).children().children('.tringle-right').show();
			$(this).siblings().children().children('.tringle-right').hide();
		})
	}

	for(var i=0;i<$('.supervision-div2').children().length-1;i++){
		$('.supervision-div2').children().eq(i).click(function(){
			$(this).children().children().eq(0).addClass('div2-titleAcitve');
			$(this).children().addClass('div2-borderActive');
			$(this).siblings().children().children('.div2-title').removeClass('div2-titleAcitve');
			$(this).siblings().children().removeClass('div2-borderActive');
		})
	}	

	$('.popup-close').click(function(){
		$('.pop-up').hide();
	})
	$('.green-icon').click(function(){
		$('.pop-up').show();
	})

	$('.pageList>li').click(function(){
		$(this).addClass('pageActive');
		$(this).siblings().removeClass('pageActive');
		$('.baseList>li').removeClass('pageActive');
	})	
	$('.baseList>li').click(function(){
		$(this).addClass('pageActive');
		$(this).siblings().removeClass('pageActive');
		$('.pageList>li').removeClass('pageActive');
	})


})
