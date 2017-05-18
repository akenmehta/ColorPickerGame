$(document).ready(function(){

	var colorKey;
	var hexLetters = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f'];
	var colorList = [];
	var gameOver = false;

	// returns a random number with max as the ceiling
	function getRandomNumber(max){
		var randomNumber;
		randomNumber = Math.floor(Math.random() * max);
		return randomNumber;
	}

	//generates random colors for each letters of the h1
	function headerColors(){
		var headerLetterColor;
		for(var i = 1; i < 16; i++){
			headerLetterColor = randomColor();
			$('#letter' + i).css('color', headerLetterColor );
		}
	}

	// generates a random hex color using the hexLetters array
	function randomColor(){
		if( $('input[value = hex]').is(':checked') ){
			var hexColor = '#';	
			for(var i = 0; i < 6; i++){
				hexColor += hexLetters[getRandomNumber(16)];
			}
			return(hexColor);
		}
		else if( $('input[value = rgb]').is(':checked') ){
			var rgbColor;
			rgbColor = 'rgb(' + getRandomNumber(256) + ',' + getRandomNumber(256) + ',' + getRandomNumber(256) + ')';
			return rgbColor;
		}
	}
	//set colors to the different boxes and reset click state
	function setBoxColors(){
		colorList = [];	
		$('.winner-color').css('color', '#fff');
		gameOver = false;

		for(var i = 1; i < 7; i++){
			var boxColor = randomColor();
			$('#box' + i).css({
				'background-color': boxColor,
				'color': boxColor
			});
			colorList.push(boxColor);
		}	
		// console.log(colorList);
	}

	//determines which color is the key out of the six random box colors
	function winnerColor(){
		colorKey = '';
		colorKey = colorList[getRandomNumber(6)];
		$('.winner-color').text(colorKey);
		// console.log(colorKey);
	}

	//checks the color from the colorList array using the box text as the index to the colorKey
	function colorChecker(){
		$('li').on('click', function(){
			var str1 = $(this).text();
			
			if(colorKey == colorList[str1] && !gameOver){
				$('.winner-color').css('color', colorKey);
				$('li').css({
					'background-color': colorKey,
					'color': colorKey
				});
				$('li').removeClass('animated rotateOut');
				$('li').addClass('animated rotateIn');
				gameOver = true;
			}
			else if(!gameOver){
				$(this).addClass('animated rotateOut');
			}
		});
	}	
	//generates new colors depending on which color type is checked, resets colorList
	function reset(){
		gameOver = false;	
		colorList = [];
		if( $('input[value = hex]').is(':checked') ){	
			setBoxColors();
			winnerColor();
			colorChecker();
		}
		else{
			setBoxColors();
			winnerColor();
			colorChecker();
		}
		$('.winner-color').css('color', '#fff');
		// console.log(colorList);
		// console.log(colorKey);
	}
	//Initial function calls
	headerColors();
	setInterval(headerColors, 1000);
	setBoxColors();
	winnerColor();
	colorChecker();

	//sets rgb colors, determines color key and checks if colorList index matches the list.val()
	$('input[value = rgb]').on('click', function(){
		setBoxColors();
		winnerColor();
		colorChecker();
	});
	//sets hex colors, determines color key and checks if colorList index matches the list.val()
	$('input[value = hex]').on('click', function(){
		setBoxColors();
		winnerColor();
		colorChecker();
	});
	//call reset function when reset button clicked
	$('#reset').on('click', function(){
		reset();
	});
	
});