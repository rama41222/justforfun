var express = require('express')
var bodyParser = require('body-parser');
var cors = require('cors');
var mongoose = require('mongoose');
var bluebird = require('bluebird');
mongoose.Promise = bluebird

var app = express();
app.use(bodyParser.json())
app.use(cors());

var User = mongoose.model('User',{
  email :String,
  password: String,
  name : String,
});

app.post('/register', (req, res) => {
  var user =  req.body;
  console.log(req.body)

var newUser = new User({
    email: user.email,
    password: user.password
  });

  newUser.save().then( user => {
    res.status(200).json({user: user})
  }).catch( e => {
   res.status(500).json({error: e.message})
  })

});

mongoose.connect('mongodb://localhost/cards', { useMongoClient: true})

var server  = app.listen(9090, function () {
  console.log('Api listening on '+ server.address().port)
});
