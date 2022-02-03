const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const PORT = 5000;

let correctNumber;
let roundCounter=1;

let scoreboard = [];


// This must be added before GET & POST routes.
app.use(bodyParser.urlencoded({extended:true}))

// Serve up static files (HTML, CSS, Client JS)
app.use(express.static('server/public'));


//gets the inputs from the client 
app.post('/guesses', function(req, res){
  // the data that is send from the client is saved for us in req.body
  // i.e. the data object is = req.body
  console.log('req.body from the POST is', req.body);
  // scoreboard.push(req.body.itemToGuess);

  let playerOneNum = req.body.itemToGuess.playerOne;

  let playerOneStatus = checkNum(playerOneNum);
  let playerTwoStatus = checkNum(playerTwo);
  let playerThreeStatus = checkNum(playerThree);
  let playerFourStatus = checkNum(playerFour);

  req.body.itemToGuess['playerOneStatus'] = playerOneStatus;
  req.body.itemToGuess['playerOneStatus'] = playerOneStatus;
  req.body.itemToGuess['playerOneStatus'] = playerOneStatus;
  req.body.itemToGuess['playerOneStatus'] = playerOneStatus;
  
  res.send(201);
})

function checkNum(num){
  if (num === correctNumber) {
    return 'correct';
  }
  else if (num < correctNumber) {
    return 'too low'
  }
  else if (num > correctNumber) {
    return 'too high'
  }

}// end checkNum



// gets the current scoreboard and sends it to the client
app.get('/scoreboard', function(req, res){
  console.log('request at /scoreboard was made', req.body);


  res.send(scoreboard);
});



// Now we need to test those elements against the current correctNumber value
// function checkGuess (guess) {
//   if( guess === correctNumber) {
    
//     return guess; 

//   }
//   else if( guess > correctNumber) {

//   }
//   else if( guess < correctNumber) {

//   }
// }


// produces a random guess and assigns it to correctNumber
function randomNumberGen() {
  correctNumber = Math.floor(Math.random() * ((25-1) + 1 ));
  console.log('Current correct guess', correctNumber);
}

// When the server turns on, the random number is created and stored on the server.
randomNumberGen();






app.listen(PORT, () => {
  console.log ('Server is running on port', PORT)
})







