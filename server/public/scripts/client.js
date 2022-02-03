$(document).ready(handleReady);

function handleReady() {
  console.log("jquery is loaded!")
  $('#button-submit').on('click', addGuesses)
}


function addGuesses() {
  let brantInput = $('#input-brant-guess').val();
  let drewInput = $('#input-drew-guess').val();
  let markInput = $('#input-mark-guess').val();
  let joshInput = $('#input-josh-guess').val();
  $('#input-brant-guess').val('');
  $('#input-drew-guess').val('');
  $('#input-mark-guess').val('');
  $('#input-josh-guess').val('');
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
    console.log('Item Added');
    getInventory(); // to refresh the DOM with the new item
  }).catch(function(response){
    console.log('UGHHHH addItem not Working');
  })
}
