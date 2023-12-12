let puntuacion = JSON.parse(localStorage.getItem('puntuacion')) || {
  victorias: 0,
  derrotas: 0,
  empates: 0
};

updatePuntuacionElement();

let isAutoPlaying = false;
let intervalId;

function autoPlay() {
  if (!isAutoPlaying) {
    intervalId = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    isAutoPlaying = true;

  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
  }
}

document.querySelector('.js-button-piedra')
  .addEventListener('click', () => {
    playGame('piedra');
  });

document.querySelector('.js-button-papel')
  .addEventListener('click', () => {
    playGame('papel');
  });

document.querySelector('.js-button-tijera')
  .addEventListener('click', () => {
    playGame('tijera');
  });

document.body.addEventListener('keydown', (event) => {
  if (event.key === '1') {
    playGame('piedra');
  } else if (event.key === '2') {
    playGame('papel');
  } else if (event.key === '3') {
    playGame('tijera');
  }
});

function playGame(playerMove) {
  const computerMove = pickComputerMove();

  let resultado = '';

  if (playerMove === 'tijera') {
    if (computerMove === 'piedra') {
      resultado = 'Derrota';
    } else if (computerMove === 'papel') {
      resultado = 'Victoria';
    } else if (computerMove === 'tijera') {
      resultado = 'Empate';
    }

  } else if (playerMove === 'papel') {
    if (computerMove === 'piedra') {
      resultado = 'Victoria';
    } else if (computerMove === 'papel') {
      resultado = 'Empate';
    } else if (computerMove === 'tijera') {
      resultado = 'Derrota';
    }

  } else if (playerMove === 'piedra') {
    if (computerMove === 'piedra') {
      resultado = 'Empate';
    } else if (computerMove === 'papel') {
      resultado = 'Derrota';
    } else if (computerMove === 'tijera') {
      resultado = 'Victoria';
    }
  }

  if (resultado === 'Victoria') {
    puntuacion.victorias += 1;
  } else if (resultado === 'Derrota') {
    puntuacion.derrotas += 1;
  } else if (resultado === 'Empate') {
    puntuacion.empates += 1;
  }

  localStorage.setItem('puntuacion', JSON.stringify(puntuacion));

  updatePuntuacionElement();

  document.querySelector('.js-resultado').innerHTML = resultado;

  document.querySelector('.js-movimientos').innerHTML = `
<img src="styles/images/${playerMove}-emoji.png" class="icono-movimiento">
<img src="styles/images/${computerMove}-emoji.png" class="icono-movimiento">
`;
}

function updatePuntuacionElement() {
  document.querySelector('.js-puntuacion')
    .innerHTML = `Victorias: ${puntuacion.victorias}, Derrotas: ${puntuacion.derrotas}, Empates: ${ puntuacion.empates}`;
}

function pickComputerMove() {
  const randomNumber = Math.random();

  let computerMove = '';

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = 'piedra';
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = 'papel';
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = 'tijera';
  }

  return computerMove;
}