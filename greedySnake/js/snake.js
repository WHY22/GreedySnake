$(function(){
	
	
	var _boxTop = $("#box").offset().top;
	var _boxLeft = $("#box").offset().left;
	var _boxWidth = $("#box").width();
	var _boxHeight = $("#box").height();
	
	var _foodL;
	var _foodT;
	
	var isPause = false;
	
	//给sanke绝对定位
	var $snake = $("#box p");
	$snake.each(function(){		
		$(this).css({left:$(this).offset().left+20,top:$(this).offset().top+20});	
	});
	$snake.each(function(){
		$(this).css({position:"absolute",margin:0});	
	});
	
	var speedL = 20;
	var speedT = 0;
	
	var timer = setInterval(run,100);
	
	function run(){
		var _headLeft = parseInt($("#snakeHead").css("left"));
		//console.log(_headLeft);
		var _headTop = parseInt($("#snakeHead").css("top"));
		
		for(var i = 0;i < $snake.length-1 ;i++){
			$snake.eq(i).css({left:$snake.eq(i+1).css("left"),top:$snake.eq(i+1).css("top"),opacity:"1"});
		}
		$("#snakeHead").css({left:_headLeft+speedL,top:_headTop+speedT});
		//判断是否撞墙
		checkResult();
		//判断是否吃到食物
		isEat();
	}
	
	//控制方向
	function keyControl(){
		
		$(document).on("keydown",function(ev){
			if(ev.keyCode == 40 && speedT != -20){
				speedL = 0;
				speedT = 20;
				console.log(speedT);
			} else if(ev.keyCode == 39 && speedL != -20){
				speedL = 20;
				speedT = 0;
			} else if(ev.keyCode == 38 && speedT != 20){
				speedL = 0;
				speedT = -20;
			} else if(ev.keyCode == 37 && speedL != 20){
				speedL = -20;
				speedT = 0;
			}
			
			if(!isPause && ev.keyCode == 32){
				isPause = true;
				clearInterval(timer);
				
			} else if(isPause && ev.keyCode == 32 && checkResult()){
				isPause = false;
				timer = setInterval(run,100);
			}
		});
		
	}
	
	keyControl();
	
	function checkResult(){
		var _snakeTop = $("#snakeHead").offset().top;
		var _snakeLeft = $("#snakeHead").offset().left;
		var _snakeWidth = $("#snakeHead").width();
		var _snakeHeight = $("#snakeHead").height();
		
		//当snake超出box时
		if(_snakeTop>=_boxTop && _snakeLeft>=_boxLeft && _snakeTop+_snakeHeight<=_boxTop+_boxHeight && _snakeLeft+_snakeWidth<=_boxLeft+_boxWidth){
			console.log("snake in box");
		} else{
			$("#snakeHead").css({opacity:0});
			clearInterval(timer);
			alert("You die");
			return false;
		}
		
		//当snake碰触身体
		$("#box p").not("#snakeHead").each(function(){
			
			var _bodyTop = $(this).offset().top;
			var _bodyLeft = $(this).offset().left;
			var _bodyWidth = $(this).width();
			var _bodyHeight = $(this).height();
			
			if(_bodyTop == _snakeTop && _bodyLeft == _snakeLeft){
				clearInterval(timer);
				alert("You die");
				return false;
			}
			
		});
	}
	
	function createFood(){
		var $foodDiv = $("<div>");
		$foodDiv.attr({id:"food"});
		$foodDiv.css({position:"absolute",width:"20px",height:"20px",background:"#847987"});
		$("#box").append($foodDiv);
		
		_foodL = parseInt(_boxLeft + 20 * parseInt(25*Math.random()));
		_foodT = parseInt(_boxTop + 20 * parseInt(25*Math.random()));
		console.log(_boxLeft+":"+_boxTop);
		$foodDiv.css({left:_foodL,top:_foodT});
	}
	createFood();
	
	function isEat(){
		var _snakeL = $("#snakeHead").offset().left;
		var _snakeT = $("#snakeHead").offset().top;
		if(_snakeL == _foodL && _snakeT == _foodT){
			$("#food").remove();
			var $newBody = $("<p>").css({position:"absolute",opacity:"0"});
			$("#box").prepend($newBody);
			$snake = $("#box p");
			createFood();
		}
		
	}
	
})
//$(function)结束
