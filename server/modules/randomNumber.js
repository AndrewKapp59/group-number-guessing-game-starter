


// produces a random guess and assigns it to correctNumber

let randomNumber = {
  function: random
}

let random = function randomNumberGen() {
  correctNumber = Math.floor(Math.random() * ((25-1) + 1 ));
  console.log('Current correct guess', correctNumber);
  return correctNumber;
}



module.exports = randomNumber;

