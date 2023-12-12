const tableroJuego = document.querySelector('#tablero');
const displayInformacion = document.querySelector('#info');
const botonReinicio = document.querySelector('#reiniciar');
const celdasIniciales = ["", "", "", "", "", "", "", "", ""];

let turno = "circulo";
displayInformacion.textContent = "El circulo comienza";

function crearTablero() {
  celdasIniciales.forEach((celda, indice) => {
    const celdaElemento = document.createElement('div');
    celdaElemento.classList.add('casilla');
    celdaElemento.id = indice;
    celdaElemento.addEventListener('click', agregarMarca);
    tableroJuego.append(celdaElemento);
  });
}
crearTablero();

function agregarMarca(evento) {
  const marcaVisual = document.createElement('div');
  marcaVisual.classList.add(turno);
  evento.target.append(marcaVisual);
  turno = turno === "circulo" ? "cruz" : "circulo";
  displayInformacion.textContent = "Ahora es el turno de " + turno;
  evento.target.removeEventListener("click", agregarMarca);
  verificarPuntuacion();
}

function mostrarGanador(ganador) {
  const mensaje = `Gana ${ganador}`;
  alert(mensaje);
  displayInformacion.textContent = mensaje;
  setTimeout(() => {
    reiniciarTablero();
  }, 100);
}

function verificarPuntuacion() {
  const todasLasCasillas = document.querySelectorAll(".casilla");
  const combinacionesGanadoras = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  combinacionesGanadoras.forEach(combinacion => {
    let circuloGana = combinacion.every(celda =>
      todasLasCasillas[celda].firstChild?.classList.contains('circulo')
    );

    if (circuloGana) {
      combinacion.forEach(celda => {
        todasLasCasillas[celda].classList.add('ganador');
      });

      setTimeout(() => {
        alert("Gana círculo");
        reiniciarTablero();
      }, 100);
      return;
    }

    let cruzGana = combinacion.every(celda =>
      todasLasCasillas[celda].firstChild?.classList.contains('cruz')
    );

    if (cruzGana) {
      combinacion.forEach(celda => {
        todasLasCasillas[celda].classList.add('ganador');
      });

      setTimeout(() => {
        alert("Gana cruz");
        reiniciarTablero();
      }, 100);
      return;
    }
  });
}

botonReinicio.addEventListener('click', reiniciarTablero);

function reiniciarTablero() {
  const todasLasCasillas = document.querySelectorAll('.casilla');
  todasLasCasillas.forEach(casilla => {
    casilla.textContent = '';
    casilla.addEventListener('click', agregarMarca);
  });
  turno = 'circulo';
  displayInformacion.textContent = 'El circulo comienza';
}

