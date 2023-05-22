//SCORE SETTINGS
let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};

//UPDATE SCORE ON PAGE LOAD/REFRESH
updateScoreElement();

//AUTOPLAY FUNCTIONALITY
let isAutoPlaying = false;
let intervalID;

function autoPlay() {
  if(!isAutoPlaying){
      intervalID = setInterval(function() {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    isAutoPlaying = true;
    document.querySelector('.auto-play-button')
      .innerHTML = 'Stop Playing';
  } else {
    clearInterval(intervalID);
    isAutoPlaying = false;
    document.querySelector('.auto-play-button')
      .innerHTML = 'Auto Play';
  }
}

//PLAY GAME FUNCTIONALITY
function playGame(playerMove) {
  //RANDOM COMPUTER MOVE SELECTED
  const computerMove = pickComputerMove();
  let result = '';

  //PLAYER MOVE SELECTION
  if(playerMove === 'scissors'){
    if (computerMove === 'rock') {
      result = 'You lose.';
    } else if (computerMove === 'paper') {
      result = 'You win.';
    } else if (computerMove === 'scissors') {
      result = 'Tie.';
    }

  } else if (playerMove === 'paper') {
    if (computerMove === 'rock') {
      result = 'You win.';
    } else if (computerMove === 'paper') {
      result = 'Tie.';
    } else if (computerMove === 'scissors') {
      result = 'You lose.';
    }
    
  } else if (playerMove === 'rock') {
    if (computerMove === 'rock') {
      result = 'Tie.';
    } else if (computerMove === 'paper') {
      result = 'You lose.';
    } else if (computerMove === 'scissors') {
      result = 'You win.';
    }
  }

  //RESULTS AND SCORE UPDATE
  if (result === 'You win.') {
    score.wins += 1;
  } else if (result === 'You lose.') {
    score.losses += 1;
  } else if (result === 'Tie.') {
    score.ties += 1;
  }

  //SAVING SCORE IN LOCALSTORAGE
  localStorage.setItem('score', JSON.stringify(score));

  //SCORE UPDATED
  updateScoreElement();

  //DISPLAY RESULTS AND COMPUTER/PLAYER MOVE
  document.querySelector('.js-result')
    .innerHTML = result;

  document.querySelector('.js-moves')
    .innerHTML = `You
      <img class="move-icon" src="/RPS/IMAGES/${playerMove}-emoji.png">
      <img class="move-icon" src="/RPS/IMAGES/${computerMove}-emoji.png">
      Computer`;
}

//UPDATE SCORE FUNCTIONALITY
function updateScoreElement() {
  document.querySelector('.js-score')
    .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
};

//RANDOM COMPUTER MOVE FUNCTIONALITY
function pickComputerMove() {
  const randomNumber = Math.random();
  let computerMove = '';
  if (randomNumber >= 0 && randomNumber < 1/3) {
    computerMove = 'rock';
  } else if (randomNumber >= 1/3 && randomNumber < 2/3) {
    computerMove ='paper';
  } else if (randomNumber >= 2/3 && randomNumber < 1) {
    computerMove ='scissors';
  }
  return computerMove;
}

//EVENT LISTENERS FOR BUTTONS------------------------

//AUTOPLAY
document.querySelector('.js-auto-play-button').addEventListener('click', () => {
  autoPlay();
});

//RESET SCORE
document.querySelector('.js-reset-score-button').addEventListener('click', () => {
  score.wins = 0;
  score. losses = 0;
  score.ties = 0;
  localStorage.removeItem('score');
  updateScoreElement();
});

//GAME
document.querySelector('.js-rock-button').addEventListener('click', () => {
  playGame('rock');
});

document.querySelector('.js-paper-button').addEventListener('click', () => {
  playGame('paper');
});

document.querySelector('.js-scissors-button').addEventListener('click', () => {
  playGame('scissors');
});

//EVENT LISTENER FOR KEYDOWN
document.body.addEventListener('keydown', (event) => {
  if (event.key === 'r') {
    playGame('rock');
  } else if (event.key === 'p') {
    playGame('paper');
  } else if (event.key === 's') {
    playGame('scissors');
  }
});