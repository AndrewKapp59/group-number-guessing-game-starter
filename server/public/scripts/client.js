$(document).ready(handleReady);

function handleReady() {
  console.log("jquery is loaded!")
  $('#button-submit').on('click', addGuesses)
  // startNewGame();

}

// <Game Start> ---------------------------------------
// function startNewGame(){
//   $.ajax({
//     method: 'GET',
//     url:'/startNewGame'
//   })
// };
// </Game Start> ---------------------------------------



function addGuesses() {
  console.log('inside addGuesses');
  
  let brantInput = $('#input-brant-guess').val();
  let drewInput = $('#input-drew-guess').val();
  let markInput = $('#input-mark-guess').val();
  let joshInput = $('#input-josh-guess').val();

  
  $('#input-brant-guess').val('');
  $('#input-drew-guess').val('');
  $('#input-mark-guess').val('');
  $('#input-josh-guess').val('');
  console.log('inputs emptied');
  

  // use AJAX to make a post request to the server
  $.ajax({
    method: 'POST', 
    url: '/guesses',
    data: {
      itemToGuess: {
        round: '',
        brant: brantInput,
        drew: drewInput,
        mark: markInput,
        josh: joshInput,
      }
    }
  }).then(function(response){
    console.log('Item Added', response);
    getScoreboard(); // to refresh the DOM with the new item
  }).catch(function(response){
    console.log('UGHHHH addItem not Working');
  })
}


function getScoreboard () {
  console.log('inside getScoreboard');

  // gets inventory array from the server using AJAX
  $.ajax({
    method: 'GET',
    url: '/scoreboard'
  }).then(function(response){
    console.log('Scoreboard appended', response);
    // TODO append quotes to DOM
    renderToDom(response);
  }).catch(function(response){
    console.log('getScoreboard not working', response);
  });
}

function renderToDom(scoreboard){
  // empty element before re-appending everything
  $('#scoreboard').empty();
  for (let round of scoreboard){
      $('#scoreboard').append(`<tr>
      <td>${round.round}</td>
      <td>${round.brant}</td>
      <td>${round.drew}</td>
      <td>${round.mark}</td>
      <td>${round.josh}</td>
      </tr>`)
  }
}