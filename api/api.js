var express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors')
var mongoose = require('mongoose')
var bluebird = require('bluebird')
var User = require('./models/User')
var jwt = require('./services/jwt')
mongoose.Promise = bluebird

var app = express()
app.use(bodyParser.json())
app.use(cors())

app.post('/register', (req, res) => {
  var user =  req.body;

var newUser = new User.model({
    email: user.email,
    password: user.password
  });

var payload  = {
  iss: req.hostname,
  sub: user._id,
}

var token = jwt.encode(payload,'shhhh')

  newUser.save().then( user => {
    res.status(200).send({user: user.toJSON(), token: token })
  }).catch( e => {
   res.status(500).json({error: e.message})
  })
})

mongoose.connect('mongodb://localhost/cards', { useMongoClient: true})

var server  = app.listen(9090, function () {
  console.log('Api listening on '+ server.address().port)
})
