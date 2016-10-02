$(function(){
	var _left = 0;
	
	/*var tempSpeedT;*/
	var speedT = -20;
	var speedL = 5;
	var timer = setInterval(run,15);
	var _topB2Start = $("#board2").offset().top;
	//run();
	function run(personDom,boardDom){
		
		speedT++;
		tempSpeedT = speedT;
		//person的top,left,width,height
		//人的top,left和宽,高
		var _top = $("#person").offset().top;
		var _left = $("#person").offset().left;
		var _width = $("#person").width();
		var _height = $("#person").height();
		
		//board的top,left,width,height
		//板1的各值
		var _topB = $("#board").offset().top;
		var _leftB = $("#board").offset().left;
		var _widthB = $("#board").width();
		var _heightB = $("#board").height();
		
		
		//board的top,left,width,height
		//板2的各值
		var _topB2 = $("#board2").offset().top;
		var _leftB2 = $("#board2").offset().left;
		var _widthB2 = $("#board2").width();
		var _heightB2 = $("#board2").height();
		
		
		
		
		//如果person在board上,speedT为0
		if(_left+_width >= _leftB && _left <= _leftB + _widthB){
			//console.log("zuoyou");
			if(_top + _height >= _topB && _top <= _topB + _heightB){
			//	console.log("shangxia");
				
				speedT = 0;
				
				$("#person").css({"top":_topB - _height +"px"});
				_top = $("#person").css("top");
			}
		}
		
		if(_left+_width >= _leftB2 && _left <= _leftB2 + _widthB2){
			//console.log("zuoyou");
			if(_top + _height >= _topB2 && _top <= _topB2 + _heightB2){
				//console.log("shangxia");
				
				speedT = 0;
				
				$("#person").css({"top":_topB2 - _height +"px"});
				_top = $("#person").css("top");
				//console.log(_left - _leftB - _widthB);
				//console.log(_top + _height - _topB);
			}
		}
		
		
		//person的left增加
		$("#board").css({"left":_leftB-speedL+"px"});
		$("#board2").css({"left":_leftB2-speedL+"px"});
		$("#person").css({"top":_top+speedT+"px"});
		
		
		
		//console.log(_leftB);
		if(_leftB <= -850){
			$("#board").css({"left":_leftB2+_widthB2 + 150 +"px"});
		}
		if(_leftB2 <= - 750){
			$("#board2").css({"left":_leftB+_widthB+150+"px"});
			
			var addTopB2 = parseInt(80 * (0-Math.random()));
			//console.log(addTopB2);
			$("#board2").css({"top":_topB2Start+addTopB2+"px"});
			//console.log($("#board2").css("top"));
		}
		
		var resultTop = _topB>=_topB2?_topB:_topB2;
		console.log(resultTop + ": topB " + _topB + ": " + _topB2);
		if(resultTop +15 < _top + _height){
			clearInterval(timer);
			/*if(speedT > 20){
				alert("叫你不听话");
				return;
			}*/
			//console.log(speedT);
			alert("You die");
			speedT = 0;
			speedL = 0;
		}
		
	}
	
	//当空格被按下时
	(function pressSpace(){
		
			//当空格被按下,speedT为-20
			$(document).get(0).onkeydown = function(ev){
				
				clearInterval(timer);
				
				//人的top,left和宽,高
				var _top = $("#person").offset().top;
				var _left = $("#person").offset().left;
				var _width = $("#person").width();
				var _height = $("#person").height();
				
				//board的top,left,width,height
				//板1的各值
				var _topB = $("#board").offset().top;
				var _leftB = $("#board").offset().left;
				var _widthB = $("#board").width();
				var _heightB = $("#board").height();
				
				
				//board的top,left,width,height
				//板2的各值
				var _topB2 = $("#board2").offset().top;
				var _leftB2 = $("#board2").offset().left;
				var _widthB2 = $("#board2").width();
				var _heightB2 = $("#board2").height();
		
				
				//如果person在board上,speedT为0
				if(_left+_width >= _leftB && _left <= _leftB + _widthB){
					var resultTop = _topB;
				}
				
				if(_left+_width >= _leftB2 && _left <= _leftB2 + _widthB2){
					var resultTop = _topB2;
				}
				
				
				
				console.log(_topB2);
				console.log(resultTop + ": " +_top);
				if(ev.keyCode == 32 && _top+5 >= resultTop - _height){
					speedT = -20;
					
					$("#person").css({"top":_top+speedT+"px"});
				}
				timer = setInterval(run,15);
				
				/*if(_top+_height != _topB){
					$(document).get(0).onkeydown = function(ev){
						speedT = tempSpeedT;
					}
				} */
				
				
			}
			
			
		
		
	})();
	
});
