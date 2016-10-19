$(function(){
	
	//定义不变的盒子的各项值
	var _boxTop = $("#box").offset().top;
	var _boxLeft = $("#box").offset().left;
	var _boxWidth = $("#box").width();
	var _boxHeight = $("#box").height();
	//定义食物的left和top
	var _foodL;
	var _foodT;
	//计数器,控制snake运动速度
	var foodIndex = 0;
	//定义暂停控制变量
	var isPause = false;
	//定义难度
	var isEasy = true; 
	//定义运动速度
	var runSpeed = 100;
	
	//给snake绝对定位
	//(snake原来是float:left)
	var $snake = $("#box p");
	$snake.each(function(){		
		$(this).css({left:$(this).offset().left+20,top:$(this).offset().top+20});	
	});
	$snake.each(function(){
		$(this).css({position:"absolute",margin:0});	
	});
	
	var $snakeStart = $snake;
	var posArrLeft = [];
	var posArrTop = [];
	for(var i = 0;i < $snakeStart.length;i++){
		//console.log($snakeStart[i].style.left);
		posArrLeft.push($snakeStart[i].style.left);
		posArrTop.push($snakeStart[i].style.top);
	}
	console.log(posArrLeft);
	
	
	//初始的left速度和top速度
	var speedL = 20;
	var speedT = 0;
	
	var timer = setInterval(run,runSpeed);
	//snake运动函数
	function run(){
		//每次运动前的snake头部的left和top
		var _headLeft = parseInt($("#snakeHead").css("left"));
		//console.log(_headLeft);
		var _headTop = parseInt($("#snakeHead").css("top"));
		//运动一次后面的身体变为前面的身体上次的位置,透明度设置是为了运动时显示出吃到食物刚生成的新身体
		for(var i = 0;i < $snake.length-1 ;i++){
			$snake.eq(i).css({left:$snake.eq(i+1).css("left"),top:$snake.eq(i+1).css("top"),opacity:"1"});
		}
		//snake头部位置为当前位置加上速度值(通过键盘控制速度方向)
		$("#snakeHead").css({left:_headLeft+speedL,top:_headTop+speedT});
		//判断是否撞墙
		checkResult();
		//判断是否吃到食物
		isEat();
	}
	
	//通过改变speed值来控制方向
	function keyControl(){
		//绑定键盘按下事件
		$(document).on("keydown",function(ev){
			
			if(ev.keyCode == 40 && speedT != -20){
				//按下"↓",速度为向下20(所说的速度都为snake头部速度)
				speedL = 0;
				speedT = 20;
				console.log(speedT);
			} else if(ev.keyCode == 39 && speedL != -20){
				//按下"→",速度为向右20
				speedL = 20;
				speedT = 0;
			} else if(ev.keyCode == 38 && speedT != 20){
				//按下"↑",速度为向上20
				speedL = 0;
				speedT = -20;
			} else if(ev.keyCode == 37 && speedL != 20){
				//按下"←",速度为向左20
				speedL = -20;
				speedT = 0;
			}
			//按下空格键，当isPause为false时，停下定时器,暂停游戏
			if(!isPause && ev.keyCode == 32){
				isPause = true;
				clearInterval(timer);
				
			} else if(isPause && ev.keyCode == 32 && checkResult()){
				//按下空格键，当isPause为true时，打开定时器,继续游戏
				isPause = false;
				timer = setInterval(run,runSpeed);
			}
			
		});
		//keydown结束
		//手机触碰 暂停按钮  控制暂停
		$("#c-pause").on("touchstart",function(){
			if(!isPause && $("#c-pause").html() == "暂停"){
				isPause = true;
				clearInterval(timer);
				$(this).html("继续");
			} else if(isPause && checkResult() && $("#c-pause").html() == "继续"){
				//按下空格键，当isPause为true时，打开定时器,继续游戏
				isPause = false;
				timer = setInterval(run,runSpeed);
				$(this).html("暂停");
			} else if($("#c-pause").html() == "重玩"){
				$("#box").empty().append($snakeStart);
				
				for(var i = 0;i < $snakeStart.length;i++){
					//console.log($snakeStart[i].style.left);
					//console.log(posArrLeft[i]);
					clearInterval(timer);
					$snakeStart[i].style.left=posArrLeft[i];
					$snakeStart[i].style.top=posArrTop[i];
					speedL = 20;
					speedT = 0;
					$("#food").remove();
					createFood();
					foodIndex = 0;
					runSpeed = 100;
					$("#score").html("得分: "+foodIndex);
					timer = setInterval(run,runSpeed);
					$(this).html("暂停");
				}
				//location.href = "index.html";
			}
			console.log("touch");
		});
		//触碰   简单版按钮  
		$("#c-easy").on("touch",function(){
			isEasy = false;
		});
		//按下"↓",速度为向下20(所说的速度都为snake头部速度)
		$("#c-bottom").on("touchstart",function(){
			
			if(speedT != -20){
				//按下"↓",速度为向下20(所说的速度都为snake头部速度)
				speedL = 0;
				speedT = 20;
				console.log(speedT);
			}
		});
		//按下"→",速度为向右20
		$("#c-right").on("touchstart",function(){
			if(speedL != -20){
				//按下"→",速度为向右20
				speedL = 20;
				speedT = 0;
			}	
		});
		//按下"↑",速度为向上20
		$("#c-top").on("touchstart",function(){
			 if(speedT != 20){
				//按下"↑",速度为向上20
				speedL = 0;
				speedT = -20;
			} 
		});
		//按下"←",速度为向左20
		$("#c-left").on("touchstart",function(){
			 if(speedL != 20){
				//按下"←",速度为向左20
				speedL = -20;
				speedT = 0;
			}
		});
		
	}
	
	keyControl();
	//检查结果函数，判断是否游戏结束
	function checkResult(){
		//每次判断使 的snake各项属性值
		var _snakeTop = $("#snakeHead").offset().top;
		var _snakeLeft = $("#snakeHead").offset().left;
		var _snakeWidth = $("#snakeHead").width();
		var _snakeHeight = $("#snakeHead").height();
		
		//当snake超出box时,头部透明度为0,防止头部跑出box,不好看
		if(_snakeTop>=_boxTop && _snakeLeft>=_boxLeft && _snakeTop+_snakeHeight<=_boxTop+_boxHeight && _snakeLeft+_snakeWidth<=_boxLeft+_boxWidth){
			console.log("snake in box");
		} else{
			$("#snakeHead").css({opacity:0});
			clearInterval(timer);
			alert("You die");
			$("#c-pause").html("重玩");
			return false;
		}
		
		//当snake碰触身体,用each遍历每一部分身体
		$("#box p").not("#snakeHead").each(function(){
			//求出此处身体各项值
			var _bodyTop = $(this).offset().top;
			var _bodyLeft = $(this).offset().left;
			var _bodyWidth = $(this).width();
			var _bodyHeight = $(this).height();
			//如果snake头部和该出身体重合,也就是left和top值都相等,则游戏结束,关闭定时器
			if(_bodyTop == _snakeTop && _bodyLeft == _snakeLeft){
				clearInterval(timer);
				alert("You die");
				$("#c-pause").html("重玩");
				return false;
			}
			
		});
		return true;
	}
	//随机创造食物函数
	function createFood(){
		//创建食物的div
		var $foodDiv = $("<div>");
		//为它赋予名为food的id
		$foodDiv.attr({id:"food"});
		//食物大小为20px,20px,绝对定位
		$foodDiv.css({position:"absolute",width:"20px",height:"20px",background:"#847987"});
		//添加到box中
		$("#box").append($foodDiv);
		//求出box内的一个随机定位,算法为:box的left和top加上若干个20(20为食物和snake头部的宽度和高度值)
		
		//left的随机数
		var _foodRandomL = Math.random();
		
		//top的随机数
		var _foodRandomT = Math.random();
		//box的width和food的width的比率,求出一行可以摆放多少个食物
		var rateWidth = parseInt( $("#box").width() ) / $foodDiv.width();
		rateWidth = Math.floor(rateWidth) - 2;
		var rateHeight = parseInt( $("#box").height() ) / $foodDiv.height();
		rateHeight = Math.floor(rateHeight) - 2;
		
		//求出food的left和top
		_foodL = parseInt(_boxLeft + 20 * (parseInt( rateWidth *_foodRandomL) + 1) );
		_foodT = parseInt(_boxTop + 20 * (parseInt( rateHeight *_foodRandomT) + 1) );
		console.log(_boxLeft+":"+_boxTop);
		//把随机定位赋值给foodDiv
		$foodDiv.css({left:_foodL,top:_foodT});
	}
	//游戏一开始先创建一个食物
	createFood();
	//判断是否吃到食物函数
	function isEat(){
		//snake头部当前的left和top
		var _snakeL = $("#snakeHead").offset().left;
		var _snakeT = $("#snakeHead").offset().top;
		//当snake头部和食物重合,则为吃到食物
		if(_snakeL == _foodL && _snakeT == _foodT){
			//移除食物
			$("#food").remove();
			//为snake增加身体,新身体为绝对定位,刚出现时在box左上角,为了视觉美观,刚出现时透明度为0
			var $newBody = $("<p>").css({position:"absolute",opacity:"0"});
			//把新身体加入到box中
			$("#box").prepend($newBody);
			//为snake的jquery集合重新赋值,加上新的身体
			$snake = $("#box p");
			//创建新食物
			createFood();
			foodIndex++;
			$("#score").html("得分: "+foodIndex);
			runSpeed -= 2;
			 clearInterval(timer);
			 timer = setInterval(run,runSpeed);
			 if(runSpeed == 20){
			 	clearInterval(timer);
			 	alert("You win,score: "+foodIndex);
			 }
			/*if(foodIndex >= 2 && foodIndex < 5){
				clearInterval(timer);
				runSpeed = 75;
				timer = setInterval(run,runSpeed);
			} else if(foodIndex >= 10 && !isEasy){
				clearInterval(timer);
				runSpeed = 29;
				timer = setInterval(run,runSpeed);
			} else if(foodIndex >= 5){
				clearInterval(timer);
				runSpeed = 50;
				timer = setInterval(run,runSpeed);
			} */
		}
		
	}
	
})
//$(function)结束
