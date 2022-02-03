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
//   }).then(function(response){
//    
// };
// </Game Start> ---------------------------------------



function addGuesses() {
  console.log('inside addGuesses');
  let playerOneInput = $('#input-player-one-guess').val();
  let playerTwoInput = $('#input-player-two-guess').val();
  let playerThreeInput = $('#input-player-three-guess').val();
  let playerFourInput = $('#input-player-four-guess').val();
  $('#input-player-one-guess').val('');
  $('#input-player-two-guess').val('');
  $('#input-player-three-guess').val('');
  $('#input-player-four-guess').val('');
  console.log('inputs emptied');
  
  // use AJAX to make a post request to the server
  $.ajax({
    method: 'POST', 
    url: '/guesses',
    data: {
      itemToGuess: {
        round: '',
        playerOne: playerOneInput,
        playerOneStatus: '',
        playerTwo: playerTwoInput,
        playerThree: playerThreeInput,
        playerThreeStatus: '',
        playerFour: playerFourInput,
        playerFourStatus: '',
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
      <td class="${round.playerOneStatus}">${round.playerOne}</td>
      <td class="${round.playerTwoStatus}">${round.playerTwo}</td>
      <td class="${round.playerThreeStatus}">${round.playerThree}</td>
      <td class="${round.playerFourStatus}">${round.playerFour}</td>

      </tr>`)
  }
}