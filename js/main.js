/*
El juego de memotest deberá cumplir las siguientes consignas:

1- Tener un tablero de 12 fichas (6 pares)
2- Deben acomodarse las fichas de forma aleatoria, cada vez que se inicie un nuevo juego.
3- Al completar todos los pares mostrar un mensaje de ganó.
4- Permitir ingresar el nombre del jugador al iniciar el juego
5- Tener 24 oportunidades, si no descubre todo el tablero en esa cantidad perderá.

*/

/* Initial setup */
const numberOfCards = 12;
const numberOfTypes = 3;
let turn = 1;
const chances = 24;
let position = [];

/*filling am array with random numbers*/

function fillPositions(array) {
  let random = Math.floor(Math.random() * numberOfCards);
  while (array.length < numberOfCards) {
    if (array.indexOf(random) == -1) {
      array.push(random);
      }
    random = Math.floor(Math.random() * numberOfCards);
  }
  return array;
}

position = fillPositions(position);

/* seting up my cards in an ordered array */

const card1 = $('<div class="card"><img class="back" src="./img/ada-logo.png"><img class="front" src="./img/ada-lovelace.jpg">');
const card2 = $('<div class="card"><img class="back" src="./img/ada-logo.png"><img class="front" src="./img/grace-hopper.jpg">');
const card3 = $('<div class="card"><img class="back" src="./img/ada-logo.png"><img class="front" src="./img/chien-s.png">');

function getCards(type1, type2, type3) {

  let arr = [];
  for (var i = 0; i < numberOfCards; i++) {
    if (i <= numberOfTypes) {
      arr[i] = Object.assign({}, {front: type1, clicked: false, matched: false});
    }
    else if (i >= numberOfTypes && i <= numberOfTypes * 2 + 1) {
      arr[i] = Object.assign({}, {front: type2, clicked: false, matched: false});
    }
    else {
      arr[i] = Object.assign({}, {front: type3, clicked: false, matched: false});
    }
  }
  return arr;
}

function setCards (arr, masterArr) {
  for (var i = 0; i < masterArr.length; i++) {
      var z = masterArr.indexOf(i);
      masterArr[z] = arr[i];
  }
  return masterArr;
}

/* here is my ordered array */
let cards = getCards(card1, card2, card3);

/* and now we shuffle */

cards = setCards(cards, position);

/* END INITIAL SETUP */

/* Appending the cards to the page container */

$('#begin').one('click', function(){
  let name = $('#name').val();
  $('#name').html(name);
  $('#container').removeClass('invisible');
  for (var i = 0; i < cards.length; i++) {
    console.log(cards[i])
    $('#container').append(cards[i]['front'].clone());
    /* Adding .back class so we don't see the content */
/*    $('.card').each(function() {
    $( this ).addClass('back');
*/    }
  });

/* some functions to check if cards match and if there are
any unmatched left */

function match (clicked) {
    if (clicked[0]['front'] == clicked[1]['front']) {
      return true;
    } else {
      return false;
    }
  }

function endGame (cards) {
  let cont = false;
  for (var i = 0; i < cards.length; i++) {
    if (cards[i]['matched'] != true) {
      cont = true;
    }
  }
  return cont;
}

// let the game begin //

let clicked = [];
let clickedDiv = [];
let keepGoing = endGame(cards);

$(document).on('click', '.card', function() {
    /* Using the index of the clicked element should give me the index
    of my desired object */
    let index = $(this).index();

    if (turn <= chances && keepGoing == true && $( this ).hasClass('clicked-card') == false) {

      if (cards[index]['clicked'] == false ) {
      $( this ).addClass('flip').addClass('flipped');
      cards[index]['clicked'] = true;

        /* We need to save both the object and its corresponding
        div */
        clicked.push(cards[index]);
        clickedDiv.push( this );

          if (clicked.length > 1) {

            if (match(clicked) == true) {
              clicked[0]['matched'] = true;
              clicked[1]['matched'] = true;
              $(clickedDiv[0]).removeClass('card').addClass('clicked-card').removeClass('flipped');
              $(clickedDiv[1]).removeClass('card').addClass('clicked-card').removeClass('flipped');
            }

            else {

              setTimeout(function() {
                $('.flipped').removeClass('flip').removeClass('flipped').removeClass('clicked-card');
              }, 600);

              clicked[0]['clicked'] = false;
              clicked[1]['clicked'] = false;
            }

          clicked = [];
          clickedDiv = [];
          $('#turnos').html(turn);
          keepGoing = endGame(cards);
          turn++;
          }
        }
      }

      if (turn <= chances && keepGoing == false) {
        $('#status').removeClass('hidden').addClass('status');
        $('#message').html('ganaste!');
      }

      if (turn > chances) {
        $('#status').removeClass('hidden').addClass('status')
        $('#message').html('perdiste');
      }
  });

$('#retry').on('click', function(){
  window.location.reload(true);
});