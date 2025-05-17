const buttons = document.querySelectorAll('.choice-btn');
const resultDisplay = document.querySelector('.result p');
const playerScoreDisplay = document.getElementById('player-score');
const computerScoreDisplay = document.getElementById('Computer-score');
const roundDisplay = document.getElementById('round');
const gameOverDisplay = document.querySelector('.game-over');
const winnerMessage = document.getElementById('winner-message');
const restartBtn =document.getElementById('restart-btn');
let playerScore =0;
let computerScore=0;
let round =1;
const maxRounds=5;

function playgame(playerChoice){
    if(round > maxRounds) return;
    const choices=['Rock','Paper','Scissor'];
    const computerChoice = choices[Math.floor(Math.random() *3)];

    let result="";
    if(playerChoice===computerChoice){
        result ="It's a Tie!🤝";
        playSound(tieSound);
    } else {
        switch (playerChoice){
            case 'Rock':
         result=(computerChoice==='Scissor') ? "You Win!🎉🤩":"Computer Wins!😔";
         break;
         case 'Paper':
            result=(computerChoice==='Rock') ? "You Win!🎉🤩":"Computer Wins!😔";
            break;
            case 'Scissor':
                result=(computerChoice==='Paper') ? "You Win!🎉🤩":"Computer Wins!😔";
                break;
        }

        result.includes("You win") ? playSound(winSound) : playSound(loseSound);
    }
    if(result.includes("You Win")) playerScore++;
    else if(result.includes("Computer Wins")) computerScore++;

    resultDisplay.textContent =`You chose ${playerChoice}, Computer chose ${computerChoice}. ${result}`;
    playerScoreDisplay.textContent = playerScore;
    computerScoreDisplay.textContent = computerScore;

    round++;
    roundDisplay.textContent =round;

    if(round>maxRounds){
        endGame();
    }
}

function endGame(){
    let message="";
    if(playerScore>computerScore){
        message=`You win${playerScore}-${computerScore}🎉🏆 !`;
    } else if(computerScore>playerScore) {
        message=`Computer win${computerScore}-${playerScore}😔!`;

    } else {
        message=`Its a tie${playerScore}-${computerScore}!🤝`;
    }
    winnerMessage.textContent = message;
    gameOverDisplay.style.display = "flex";
}

function resetGame(){
    playerScore=0;
    computerScore=0;
    round=1;


    playerScoreDisplay.textContent=playerScore;
    computerScoreDisplay.textContent=computerScore;
    roundDisplay.textContent = round;
    resultDisplay.textContent="Choose an option above!";
    gameOverDisplay.style.display="none";
}

buttons.forEach(button=> {
    button.addEventListener('click', ()=> {
        playgame(button.dataset.choice);
    });
});

restartBtn.addEventListener('click',resetGame);

const winSound = document.getElementById('win-sound');
const loseSound = document.getElementById('lose-sound');
const tieSound = document.getElementById('tie-sound');
const clickSound = document.getElementById('click-sound');
const bgMusic = document.getElementById('bg-music');
const bgmToggle = document.getElementById('bgm-toggle');

let isMusicOn=true;

bgmToggle.addEventListener('click', () => {
    isMusicOn = !isMusicOn;
    bgmToggle.textContent = `🔊 BGM: ${isMusicOn ? 'ON' : 'OFF'}`;
    isMusicOn ? bgMusic.play() : bgMusic.pause();
});

function playSound(sound) {
    sound.currentTime = 0; // Rewind to start
    sound.play();
}
window.addEventListener('load', () => {
    bgMusic.volume = 0.3; // Lower volume
    if (isMusicOn) bgMusic.play();
});

    
