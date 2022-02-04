$(document).ready(handleReady);

function handleReady() {
  console.log("jquery is loaded!")
  $('#button-submit').on('click', addGuesses)
  $('#button-reset').on('click', startNewGame)
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
    console.log('Guess made');
    // runs getScoreboard to refresh the DOM with the new item
    getScoreboard(); 
  }).catch(function(response){
    console.log('UGHHHH addGuess not Working');
  })
}

function getScoreboard () {
  // using AJAX to make a get request to the server for the scoreboard array
  $.ajax({
    method: 'GET',
    url: '/scoreboard'
  }).then(function(response){
    console.log('Scoreboard updated', response);
    // runs renderToDom to append the updated scoreboard array from the server
    renderToDom(response);
  }).catch(function(response){
    console.log('getScoreboard not working', response);
  });
}

// sends a request to the server to reset the correct number, round count and scoreboard
function startNewGame() {
  //use AJAX to make a post request to the server
  $.ajax({
    method: 'POST', 
    url: '/reset',
  }).then(function(response){
    console.log('Correct Number Changed');
  }).catch(function(response){
    console.log('UGHHHH clear not Working');
  })
  // runs resetTable to empty HTML scoreboard
  resetTable();
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

// empties the scoreboard for a new game
function resetTable(){
  $('#scoreboard').empty();
  console.log('Scoreboard emptied');
}