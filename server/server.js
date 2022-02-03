const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const PORT = 5000;

// This must be added before GET & POST routes.
app.use(bodyParser.urlencoded({extended:true}))

// Serve up static files (HTML, CSS, Client JS)
app.use(express.static('server/public'));


app.post('/guesses', function(req, res){
  // the data that is send from the client is saved for us in req.body
  // without body-parser set up, req.body is undefined 
  console.log('req.body from the POST is', req.body);

  // // grabs the new item from the request body
  // let item = req.body.itemToAdd;

  // inventoryList.push(item);

  // // send back a status code of 201
  // res.sendStatus(201);
})






// GET & POST Routes go here

app.listen(PORT, () => {
  console.log ('Server is running on port', PORT)
})
