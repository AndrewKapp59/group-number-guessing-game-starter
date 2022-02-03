const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const PORT = 5000;

let correctNumber ;
let roundCounter = 0 ;

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

  roundCounter += 1;

  let playerOneStatus = checkNum(req.body.itemToGuess.playerOne);
  let playerTwoStatus = checkNum(req.body.itemToGuess.playerTwo);
  let playerThreeStatus = checkNum(req.body.itemToGuess.playerThree);
  let playerFourStatus = checkNum(req.body.itemToGuess.playerFour);
  
  req.body.itemToGuess['playerOneStatus'] = playerOneStatus;
  req.body.itemToGuess['playerTwoStatus'] = playerTwoStatus;
  req.body.itemToGuess['playerThreeStatus'] = playerThreeStatus;
  req.body.itemToGuess['playerFourStatus'] = playerFourStatus;
  req.body.itemToGuess['round'] = roundCounter;
  
  scoreboard.push(req.body.itemToGuess);
  
  res.send(201);
})

function checkNum(num){
  if (num === correctNumber) {
    return 'correct';
  }
  else if (num < correctNumber) {
    return 'too-low';
  }
  else if (num > correctNumber) {
    return 'too-high';
  }

}// end checkNum



// gets the current scoreboard and sends it to the client
app.get('/scoreboard', function(req, res){
  console.log('request at /scoreboard was made', req.body);
  res.send(scoreboard);
});

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







