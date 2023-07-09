/* global Swal */
import {VALID_GUESSES} from './Woordle_Paraules5LletresCatala.js';


/**
 * Palabra seleccionada de la lista de palabras válidas en catalán.
 */
const palabra = VALID_GUESSES[Math.floor(Math.random() * VALID_GUESSES.length)];
console.log(palabra);

/**
 * Esta función escribe en la primera celda disponible
 * cuando se presiona una tecla del teclado fisico.
 * @param {*} evento Evento para identificar la letra pulsada.
 */
function escribirTecladoFisico(evento) {
  const teclaContenido = evento.key;
  const celdas = document.querySelectorAll('.celda');

  if (teclaContenido === 'Backspace') {
    borrar();
  }
  if (teclaContenido === 'Enter') {
    event.preventDefault();
    comprobarPalabra();
  }
  if (teclaContenido !== 'Backspace' && teclaContenido !== 'Enter') {
    for (let i = 0; i < celdas.length; i++) {
      const celda = celdas[i];
      if (celda.innerHTML === '' && celda.ariaDisabled === 'false') {
        // eslint-disable-next-line max-len
        if (/^[a-zA-Z]$/.test(teclaContenido) || teclaContenido === 'Ç' || teclaContenido === 'ç') {
          celda.innerHTML = teclaContenido.toLowerCase();
          celda.classList.add('escrito');
        }
        break;
      }
    }
  }
}
document.addEventListener('keydown', escribirTecladoFisico);

/**
 * Verifica si la palabra escrita existe en la lista de palabras válidas.
 */
function comprobarPalabra() {
  const divsActivos = document.querySelectorAll('div[aria-disabled="false"]');
  let palabraIngresada = '';

  divsActivos.forEach((div) => {
    const letra = div.innerHTML;
    palabraIngresada += letra.toLowerCase();
  });

  if (VALID_GUESSES.includes(palabraIngresada)) {
    comprobarPalabraExistente(divsActivos, palabraIngresada);
  } else if (palabraIngresada.length === 5) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Esta palabra no existe en el diccionario catalan!',
    });
  } else if (palabraIngresada.length < 5 && palabraIngresada.length > 0) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'La palabra debe tener 5 letras',
    });
  } else if (divsActivos.length === 0) {
    setTimeout(() => {
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        // eslint-disable-next-line max-len
        text: 'El juego se ha terminado. Haz click en el boton de reiniciar para volver a ha emprezar',
      });
    }, 1500);
  }
}

/**
 * Comprueba si la palabra ingresada es correcta
 * y asigna estilos a las celdas correspondientes.
 * @param {*} divsPalabra - Divs de las celdas con contenido.
 * @param {*} palabraIngresada - Palabra ingresada por el jugador.
 */
function comprobarPalabraExistente(divsPalabra, palabraIngresada) {
  const divsActivos = divsPalabra;
  const palabraEntrada = palabraIngresada;
  let posicionLetra = 0;

  if (palabraEntrada === palabra) {
    divsActivos.forEach((div) => {
      div.classList.add('verde');
      div.ariaDisabled = 'true';
      // eslint-disable-next-line max-len
      document.querySelector(`div[data-tecla="${div.innerHTML.toUpperCase()}"]`).style.backgroundColor = 'green';
      posicionLetra++;
    });
    setTimeout(function() {
      Swal.fire({
        icon: 'success',
        title: 'Enhorabuena',
        text: '¡Has conseguido la victoria!',
      });
    }, 1500);
  } else {
    divsActivos.forEach((div) => {
      if (div.innerHTML === palabra[posicionLetra]) {
        // eslint-disable-next-line max-len
        document.querySelector(`div[data-tecla="${div.innerHTML.toUpperCase()}"]`).style.backgroundColor = 'green';
        div.classList.add('verde');
        div.ariaDisabled = 'true';
      } else {
        if (palabra.includes(div.innerHTML)) {
          // eslint-disable-next-line max-len
          if (document.querySelector(`div[data-tecla="${div.innerHTML.toUpperCase()}"]`).style.backgroundColor !== 'green') {
            // eslint-disable-next-line max-len
            document.querySelector(`div[data-tecla="${div.innerHTML.toUpperCase()}"]`).style.backgroundColor = 'orange';
          }
          div.classList.add('naranja');
          div.ariaDisabled = 'true';
        } else {
          div.classList.add('gris');
          // eslint-disable-next-line max-len
          document.querySelector(`div[data-tecla="${div.innerHTML.toUpperCase()}"]`).style.backgroundColor = 'gray';
          div.ariaDisabled = 'true';
        }
      }
      posicionLetra++;
    });
    asignarAriaDisabled();
  }
}

let contadorGlobal = 0;

/**
 * Asigna el atributo aria-disabled a las celdas correspondientes.
 */
function asignarAriaDisabled() {
  const divsCelda = document.querySelectorAll('.celda');
  let contadorLocal = 0;

  divsCelda.forEach((div) => {
    if (contadorLocal < 5 && div.innerHTML === '') {
      div.setAttribute('aria-disabled', 'false');
      contadorLocal++;
    }
  });
  contadorGlobal += 5;
  console.log(contadorGlobal);
  if (contadorGlobal === divsCelda.length) {
    setTimeout(() => {
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        // eslint-disable-next-line max-len
        text: 'El juego se ha terminado. Haz click en el boton de reiniciar para volver a ha emprezar',
      });
    }, 1500);
  }
}

/**
 * Guarda todos los elementos con la clase 'tecla' en un array llamado 'teclas'.
 */
const teclas = document.getElementsByClassName('tecla');

/**
 * Añade el evento 'click' a todos los elementos con la clase 'tecla'.
 */
for (let i = 0; i < teclas.length; i++) {
  teclas[i].addEventListener('click', () => {
    escribirTecladoDigital(teclas[i]);
  });
}

/**
 * Función que escribe en una celda cuando se hace clic en una tecla.
 * @param {*} evento - Evento del clic en la tecla.
 */
function escribirTecladoDigital(evento) {
  const teclaContenido = evento.innerHTML;
  const celdas = document.querySelectorAll('.celda');

  if (teclaContenido === 'BCK') {
    borrar();
  }
  if (teclaContenido === 'ENTER') {
    comprobarPalabra();
  }
  if (teclaContenido !== 'BCK' && teclaContenido !== 'ENTER') {
    for (let i = 0; i < celdas.length; i++) {
      const celda = celdas[i];
      if (celda.innerHTML === '' && celda.ariaDisabled === 'false') {
        celda.innerHTML = teclaContenido.toLowerCase();
        celda.classList.add('escrito');
        break;
      }
    }
  }
}

/**
 * Función que borra la última celda con contenido.
 */
function borrar() {
  const celdas = document.querySelectorAll('.celda');
  for (let i = celdas.length - 1; i >= 0; i--) {
    const celda = celdas[i];
    if (celda.innerHTML !== '' && celda.ariaDisabled === 'false') {
      celda.innerHTML = '';
      celda.classList.remove('escrito');
      break;
    }
  }
}
