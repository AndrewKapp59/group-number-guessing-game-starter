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
  // turns inputs into values
  let playerOneInput = $('#input-player-one-guess').val();
  let playerTwoInput = $('#input-player-two-guess').val();
  let playerThreeInput = $('#input-player-three-guess').val();
  let playerFourInput = $('#input-player-four-guess').val();
  // empties inputs
  $('#input-player-one-guess').val('');
  $('#input-player-two-guess').val('');
  $('#input-player-three-guess').val('');
  $('#input-player-four-guess').val('');
  
  // using AJAX to make a post request to the server
  $.ajax({
    method: 'POST', 
    url: '/guesses',
    data: {
      itemToGuess: {
        round: '',
        playerOne: playerOneInput,
        playerOneStatus: '',
        playerTwo: playerTwoInput,
        playerTwoStatus: '',
        playerThree: playerThreeInput,
        playerThreeStatus: '',
        playerFour: playerFourInput,
        playerFourStatus: '',
      }
    }
  }).then(function(response){
    console.log('Guess Added', response);
    // runs getScoreboard to refresh the DOM with the new item
    getScoreboard(); 
  }).catch(function(response){
    console.log('UGHHHH addGuess not Working');
  })
}

function getScoreboard () {
  console.log('inside getScoreboard');
  // using AJAX to make a get request to the server for the scoreboard array
  $.ajax({
    method: 'GET',
    url: '/scoreboard'
  }).then(function(response){
    console.log('Scoreboard appended', response);
    // runs renderToDom to append the updated scoreboard array from the server
    renderToDom(response);
  }).catch(function(response){
    console.log('getScoreboard not working', response);
  });
}

function renderToDom(scoreboard){
  // empties HTML element before re-appending the updated scoreboard array
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