let order = [];
let playerOrder = [];
let flash;
let turn;
let good;
let compTurn;
let intervalId;
let strict = false;
let noise = true;
let buttonsEnabled;
let win;

const turnCounter = document.getElementById('turn');
const green = document.getElementById('green');
const blue = document.getElementById('blue');
const red = document.getElementById('red');
const yellow = document.getElementById('yellow');
const strictButton = document.getElementById('strict');
const resetButton = document.getElementById('reset');
const start = document.getElementById('start');

start.addEventListener('click', function(e) {
  start.classList.toggle('btn-outline-warning')
  start.classList.toggle('btn-warning')
  play();
});

resetButton.addEventListener('click', function(e) {
    resetGame();
});

strictButton.addEventListener('click', function(e) {
    if (!strict) {
    strict = true;
    strictButton.innerHTML = 'Normal';
    } else {
    strict = false;
    strictButton.innerHTML = 'Strict';
  }
});


function play() {
  win = false;
  order = [];
  playerOrder = [];
  flash = 0;
  intervalId = 0;
  turn = 1;
  turnCounter.innerHTML = 1;
  good = true; 
  for (let i = 0; i < 20; i += 1) {
    order.push(Math.floor(Math.random() * 4) + 1);
  } 
  compTurn = true; 
  intervalId = setInterval(gameRound, 800);
} 

function gameRound() {
  buttonsEnabled = false;
  if (flash === turn) {
    clearInterval(intervalId);
    compTurn = false;
    clearColor();
    buttonsEnabled = true;
  }
  if (compTurn) {
    clearColor();
    setTimeout(function() {
      if(order[flash] === 1) one(); 
      if(order[flash] === 2) two();  
      if(order[flash] === 3) three(); 
      if(order[flash] === 4) four();  
      flash++; 
    }, 100);
  } 
}

function one() {
  if (noise) {
    let audio = document.getElementById('clip1');
    audio.play();
  }
  noise = true;
  green.style.opacity = '0.2';
}

function two() {
  if (noise) {
    let audio = document.getElementById('clip2');
    audio.play();
  }
  noise = true;
  red.style.opacity = '0.2';
}

function three() {
  if (noise) {
    let audio = document.getElementById('clip3');
    audio.play();
  }
  noise = true;
  blue.style.opacity = '0.2';
}

function four() {
  if (noise) {
    let audio = document.getElementById('clip4');
    audio.play();
  }
  noise = true;
  yellow.style.opacity = '0.2';
}

function clearColor() {
  green.style.opacity = '1';
  red.style.opacity = '1';
  blue.style.opacity = '1';
  yellow.style.opacity = '1';
}

function flashColor() {
  green.style.opacity = '0.2';
  red.style.opacity = '0.2';
  blue.style.opacity = '0.2';
  yellow.style.opacity = '0.2';
}

green.addEventListener('click', function(e) {
  if (buttonsEnabled) {
    playerOrder.push(1);
    check();
    one();
    if (!win) {
      setTimeout(function () {
      clearColor();
      }, 300); 
    }
  }
});

red.addEventListener('click', function(e) {
  if (buttonsEnabled) {
    playerOrder.push(2);
    check();
    two();
    if (!win) {
      setTimeout(function() {
        clearColor();
      }, 300);
    }
    }
});

blue.addEventListener('click', function(e) {
  if (buttonsEnabled) {
    playerOrder.push(3);
    check();
    three();
    if (!win) {
      setTimeout(function() {
        clearColor();
            }, 300);
        }
    }
});

yellow.addEventListener('click', function(e) {
  if (buttonsEnabled) {
    playerOrder.push(4);
    check();
    four();
    if (!win) {
      setTimeout(function() {
        clearColor();
      }, 300);
    }
  }
});

function check() {
  if (playerOrder[playerOrder.length - 1] !== order[playerOrder.length - 1]) good = false;
  
  if (playerOrder.length === 20 && good) {
    winGame();
} 

  if (good === false) {
    flashColor(); 
     setTimeout(function() {
      turnCounter.innerHTML = turn;
      clearColor(); 
        
      if (strict) {
        play();
      } else {
        compTurn = true;
        flash = 0;
        playerOrder = [];
        good = true;
        intervalId = setInterval(gameRound, 800);
      }
    }, 800);
    noise = false;
 } 

  if (turn === playerOrder.length && good && !win) {
    turn++;
    playerOrder = [];
    compTurn = true;
    flash = 0;
    turnCounter.innerHTML = turn;
    intervalId = setInterval(gameRound, 800);
  } 
}

function winGame() {
  flashColor();
  turnCounter.innerHTML = 'Win!';
  buttonsEnabled = false;
  win = true;
}

function resetGame() {
  buttonsEnabled = false;
  updateCounter('--');
  location.reload(true);
}

function updateCounter(order) {
  turnCounter.innerHTML = order;
}
