// global variables for game
var player_lives = 5;
var computer_lives = 5;
var choices = ['paper','rock',  'scissors']; 
var computers_choice="";
var players_choice="";
var message_area = document.getElementById('game_area');
var clearArea = false;
var playerBlood=document.getElementById('playerLives'); 
var computerBlood=document.getElementById('computerLives'); 
var paper=document.getElementById('paper'); 
var rock=document.getElementById('rock'); 
var scissors=document.getElementById('scissors'); 


document.getElementById('playGame').addEventListener("click", runGame);
document.getElementById('resetGame').addEventListener("click", resetGame);


paper.addEventListener("click",paperChoice);
rock.addEventListener("click",rockChoice);
scissors.addEventListener("click",scissorsChoice);

function paperChoice(){
	resetChoice();
	paper.style.border="2px solid";
	players_choice="paper";
}
function rockChoice(){
	resetChoice();
	rock.style.border="2px solid";
	players_choice="rock";
}
function scissorsChoice(){
	resetChoice();
	scissors.style.border="2px solid";
	players_choice="scissors";
}

function resetChoice(){
	rock.style.border="";
	scissors.style.border="";
	paper.style.border="";
}


// game logic
function runGame() {

	resetComputerChoice();
	

// setting game choices

if (players_choice.length<1){
		message_area.innerHTML+= "Well that's not a valid choice. <br />";
		alert("please select your weapon!");
		return;
}

	
	var num=Math.floor(Math.random() * choices.length);
    computers_choice = choices[num];
	changeComputerChoice(num);


 // conditionals for actual game logic
    if (players_choice == computers_choice) {
        message_area.innerHTML+= 'Tie! No one wins, play again! <br />';
    } else if (players_choice == 'rock') {
        checkComputerWins('paper', 'covers', 'smashes');
    } else if (players_choice == 'paper') {
        checkComputerWins('scissors', 'cuts', 'covers');
    } else if (players_choice == 'scissors') {
		checkComputerWins('rock', 'smashes', 'cuts');
    }

 // restart game loop
    checkStatus();
}


function resetPlayerChoice(){
		resetChoice();
		players_choice="";
}
function resetComputerChoice(){
		document.getElementById('choice1').src="./image/none.jpg";
		document.getElementById('choice2').src="./image/none.jpg";
		document.getElementById('choice3').src="./image/none.jpg";
}

function changeComputerChoice(num){
	if(num==0){
		document.getElementById('choice1').src="./image/paper.jpg";
	}else if(num==1){
		document.getElementById('choice2').src="./image/rock.jpg";
	}else{
		document.getElementById('choice3').src="./image/scissors.jpg";
	}
}

// checks whether computer wins against player choice
function checkComputerWins(validateChoice, winMessage, loseMessage) {
    if (computers_choice == validateChoice) {
        message_area.innerHTML += 'You lose! ' + computers_choice + ' ' + winMessage + ' ' + players_choice + '<br />';
        player_lives--;
		playerBlood.style.width=player_lives*20+"%";
    } else {
        message_area.innerHTML += 'You win! ' + players_choice + ' ' + loseMessage + ' ' + computers_choice + '<br />';
        computer_lives--;
		computerBlood.style.width=computer_lives*20+"%";
    }
}

//  check status of game
function checkStatus() {
    if (player_lives == 0) {

        showWinloseMessage("lost");

    } else if (computer_lives == 0) {

        showWinloseMessage("won");

    } else {
        message_area.innerHTML+= "Select another choice! <br />";
        message_area.innerHTML+= "**************************************** <br /><br />";
    }
}

// messaging for winning or losing
function showWinloseMessage(status) {
    message_area.innerHTML+= "=========================== <br />";
    message_area.innerHTML+= "Game Over. <br />";
    message_area.innerHTML+= "You " + status + "! Would you like to play again? <br />";
    message_area.innerHTML+= "=========================== <br />";
    document.getElementById('resetGame').style.display="initial";
    document.getElementById('playGame').style.display="none";
	if(status=="lost"){
		document.getElementById("body").style.background="#f00";
	}else{
		document.getElementById("body").style.background="#42d7ef";
	}

}

// reset game
function resetGame(){
	player_lives = 5;
	computer_lives = 5;
	playerBlood.style.width="100%";
	computerBlood.style.width="100%";
	message_area.innerHTML = '';
	document.getElementById('playGame').style.display="";
	document.getElementById('resetGame').style.display="none";
	resetPlayerChoice();
	resetComputerChoice();
	document.getElementById("body").style.background="";
}