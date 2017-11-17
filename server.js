'use strict'
// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var uuid = require("uuid");
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: false }));
// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

app.use(function(req,res,next) {
  console.log("request", req.url);
  //console.log("headers", req.headers);
  req.d = {};
  req.d.start = new Date().toISOString();
  next();
});

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

//app.use("saml", saml)

app.post("/auth", function(req, res, next){
  console.log('initial login');
  const result = JSON.stringify({ 
    authenticated:true, 
    token:uuid.v4(), 
    att1:'', 
    fullname:`Mr. ${req.body.username}`, 
    sub:req.body.username, 
    att2:'newvalue',
    refresh_token: uuid.v4(),
    expires_in:5
  });
  res.status(200).send(result);
})


app.post("/refresh", function(req, res, next){
  console.log('refreshing');
  const result = JSON.stringify({ 
    authenticated:true, 
    token:uuid.v4(), 
    att1:'', 
    fullname:`Mr. ${req.body.username}`, 
    sub:req.body.username, 
    att2:'newvalue',
    refresh_token: uuid.v4(),
    expires_in:5
  });
  res.status(200).send(result);
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});